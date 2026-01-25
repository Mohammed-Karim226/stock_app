"use server";

import { RegisterFormData, LoginFormData } from "@/types";
import { auth } from "../betterAuth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async (data: RegisterFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.username,
      },
    });
    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email: data.email,
          name: data.username,
          country: data.country,
          investmentGoals: data.investmentGoals,
          riskTolerance: data.riskTolerance,
          preferredIndustry: data.preferredIndustries,
        },
      });
    }
    return { success: true, data: response };
  } catch (e: unknown) {
    const error = e as { message: string };
    return { success: false, error: error.message || "Sign up failed" };
  }
};
export const signInWithEmail = async (data: LoginFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return { success: true, data: response };
  } catch (e: unknown) {
    const error = e as { message: string };
    return { success: false, error: error.message || "Sign up failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as { message: string }).message || "Sign out failed",
    };
  }
};
