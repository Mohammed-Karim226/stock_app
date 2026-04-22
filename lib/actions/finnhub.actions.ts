// /lib/actions/finnhub.actions.ts
"use server";

import { formatDate } from "@/lib/utils";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? "";

// ---- Types ----------------------------------------------------------------

interface FinnhubArticle {
  id: number;
  url: string;
  headline: string;
  summary: string;
  source: string;
  datetime: number;
  image: string;
  category: string;
  related: string;
}

export interface NewsArticle {
  id: number;
  url: string;
  headline: string;
  summary: string;
  source: string;
  datetime: number;
  image: string;
  category: string;
  symbol?: string;
}

// ---- Helpers ---------------------------------------------------------------

const isValidArticle = (article: FinnhubArticle): boolean => {
  return (
    !!article.headline &&
    !!article.url &&
    !!article.summary &&
    !!article.datetime
  );
};

const formatArticle = (
  article: FinnhubArticle,
  symbol?: string,
): NewsArticle => ({
  id: article.id,
  url: article.url,
  headline: article.headline,
  summary: article.summary,
  source: article.source,
  datetime: article.datetime,
  image: article.image,
  category: article.category,
  ...(symbol && { symbol }),
});

const fetchJSON = async <T>(
  url: string,
  revalidateSeconds?: number,
): Promise<T> => {
  const res = await fetch(url, {
    ...(revalidateSeconds !== undefined
      ? { cache: "force-cache", next: { revalidate: revalidateSeconds } }
      : { cache: "no-store" }),
  });

  if (!res.ok) {
    throw new Error(`Finnhub request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};

const getDateRange = (daysBack: number): { from: string; to: string } => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - daysBack);

  return {
    from: formatDate(from), // expects a Date, returns "YYYY-MM-DD"
    to: formatDate(to),
  };
};

// ---- Main ------------------------------------------------------------------

export const getNews = async (symbols?: string[]): Promise<NewsArticle[]> => {
  try {
    const { from, to } = getDateRange(5);

    // ── Personalised: symbol-based news ──────────────────────────────────
    if (symbols && symbols.length > 0) {
      const cleanSymbols = symbols.map((s) => s.trim().toUpperCase());
      const collected: NewsArticle[] = [];
      const MAX_ROUNDS = 6;

      for (let round = 0; round < MAX_ROUNDS; round++) {
        const symbol = cleanSymbols[round % cleanSymbols.length];

        const url =
          `${FINNHUB_BASE_URL}/company-news` +
          `?symbol=${symbol}&from=${from}&to=${to}` +
          `&token=${FINNHUB_API_KEY}`;

        const articles = await fetchJSON<FinnhubArticle[]>(url, 300);

        // Pick the first valid article we haven't already collected
        const collectedUrls = new Set(collected.map((a) => a.url));
        const pick = articles.find(
          (a) => isValidArticle(a) && !collectedUrls.has(a.url),
        );

        if (pick) collected.push(formatArticle(pick, symbol));
      }

      if (collected.length > 0) {
        return collected.sort((a, b) => b.datetime - a.datetime);
      }

      // Fallback to general news if all symbol queries returned nothing
    }

    // ── General market news ───────────────────────────────────────────────
    const url = `${FINNHUB_BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`;

    const articles = await fetchJSON<FinnhubArticle[]>(url);

    // Deduplicate by id, url and headline
    const seen = {
      ids: new Set<number>(),
      urls: new Set<string>(),
      headlines: new Set<string>(),
    };

    const deduplicated = articles.filter((article) => {
      if (
        seen.ids.has(article.id) ||
        seen.urls.has(article.url) ||
        seen.headlines.has(article.headline)
      ) {
        return false;
      }
      seen.ids.add(article.id);
      seen.urls.add(article.url);
      seen.headlines.add(article.headline);
      return true;
    });

    return deduplicated
      .filter(isValidArticle)
      .slice(0, 6)
      .map((a) => formatArticle(a));
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw new Error("Failed to fetch news");
  }
};
