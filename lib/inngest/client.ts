import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Stock Trading Platform",
  ai: { gemini: { key: process.env.GEMINI_API_KEY! } },
});
