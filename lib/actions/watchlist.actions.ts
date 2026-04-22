"use server";

import { connectToDatabase } from "@/database/mongoose";
import Watchlist from "@/database/models/watchlist.model";

export const getWatchlistSymbolsByEmail = async (
  email: string
): Promise<string[]> => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      return [];
    }

    // Find user by email (Better Auth stores users in "user" collection)
    const user = await db
      .collection("user")
      .findOne({ email }, { projection: { _id: 1, id: 1 } });

    if (!user) {
      return [];
    }

    const userId = user.id || user._id?.toString();

    const watchlistItems = await Watchlist.find(
      { userId },
      { symbol: 1, _id: 0 }
    ).lean();

    return watchlistItems.map((item) => item.symbol);
  } catch (error: unknown) {
    const err = error as { message: string; code?: string };
    throw new Error(
      `Failed to fetch watchlist symbols: ${err.message} (code: ${
        err.code || "N/A"
      })`
    );
  }
};
