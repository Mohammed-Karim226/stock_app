import { step } from "inngest";
import { getAllUsersForEmails } from "../actions/user.actions";
import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

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
    // get all users from the database
    const users = await step.run("get-all-users", getAllUsersForEmails);
    if (!users.success) {
      return {
        success: false,
        message: "No users found to send daily summary",
      };
    }
    console.log(users);
  }
  // fetch personalized news for each user
);
