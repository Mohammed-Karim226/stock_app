"use server";

import { connectToDatabase } from "@/database/mongoose";

export const getAllUsersForEmails = async () => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection failed");
    }
    const users = await db
      .collection("user")
      .find(
        {
          email: { $exists: true, $ne: null },
          name: { $exists: true, $ne: null },
        },
        { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
      )
      .toArray();
    const filterdUsers = users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        _id: user.id || user._id?.toString() || "",
        email: user.email,
        name: user.name,
      }));
    return { success: true, data: filterdUsers };
  } catch (error) {
    return {
      success: false,
      error: (error as { message: string }).message || "Email fetching failed",
    };
  }
};
