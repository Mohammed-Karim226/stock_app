import { getAllUsersForEmails } from "../actions/user.actions";
import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { getNews, NewsArticle } from "../actions/finnhub.actions";
import { AppWindowMac } from "lucide-react";

interface UserEmailRecord {
  _id: string;
  email: string;
  name: string;
}

interface UserNewsSummary {
  user: UserEmailRecord;
  articles: NewsArticle[];
  summary?: string;
}

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `
    - Country: ${event.data.country},
    - Investment Goals: ${event.data.investmentGoals},
    - Risk Tolerance: ${event.data.riskTolerance},
    - Preferred Industry: ${event.data.preferredIndustry},
    `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );
    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Welcome to our platform!";

      const {
        data: { email, name },
      } = event;
      return await sendWelcomeEmail({
        email,
        name,
        intro: introText,
      });
    });
    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  }
);

export const sendDailyEmailSummary = inngest.createFunction(
  { id: "daily-email-summary" },
  [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }],
  async ({ step }) => {
    // STEP 1: get all users
    const users = await step.run("get-all-users", getAllUsersForEmails);
    if (!users.success || !("data" in users) || !users.data.length) {
      return { success: false, message: "No users found" };
    }
    const typedUsers = users.data as UserEmailRecord[];

    // STEP 2: fetch news per user
    const userNewsList = await step.run(
      "fetch-news-per-user",
      async (): Promise<UserNewsSummary[]> => {
        const summaries: UserNewsSummary[] = [];
        for (const user of typedUsers) {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          const articles = await getNews(
            symbols.length > 0 ? symbols : undefined
          );
          summaries.push({ user, articles });
        }
        return summaries;
      }
    );

    // STEP 3: summarise per user with AI
    // ✅ step.ai.infer lives at TOP LEVEL, not inside step.run
    const summarised: UserNewsSummary[] = [];

    for (const { user, articles } of userNewsList) {
      if (articles.length === 0) {
        summarised.push({ user, articles, summary: "" });
        continue;
      }

      const response = await step.ai.infer(`summarise-articles-${user._id}`, {
        model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
        body: {
          contents: [
            {
              role: "user" as const,
              parts: [
                {
                  text: [
                    `Summarise these ${articles.length} news articles for ${user.name} in 3-4 sentences:`,
                    ...articles.map(
                      (a, i) => `${i + 1}. ${a.headline}: ${a.summary}`
                    ),
                  ].join("\n"),
                },
              ],
            },
          ],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const summaryText =
        part && "text" in part ? part.text : "No summary available";

      summarised.push({ user, articles, summary: summaryText });
    }

    // STEP 4: send emails
    await step.run("send-summary-emails", async () => {
      for (const { user, articles, summary } of summarised) {
        console.log(
          `[placeholder] Sending ${articles.length} articles to ${user.email}`,
          summary
        );
      }
    });

    return { success: true, message: "Daily email summary sent successfully" };
  }
);
