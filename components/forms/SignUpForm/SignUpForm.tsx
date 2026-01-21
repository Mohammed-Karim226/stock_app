"use client";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  country: z.string().min(1, { message: "Country is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  investmentGoals: z.string().min(1, { message: "Investment Goals is required." }),
  riskTolerance: z.string().min(1, { message: "Risk Tolerance is required." }),
  preferredIndustries: z.string().min(1, { message: "Prefered Industrys is required." }),
});
const SignUpForm = () => {
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      country: "",
      password: "",
      investmentGoals: "",
      riskTolerance: "",
      preferredIndustries: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center w-[440px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormDescription>Enter your username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRIES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Enter your country.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your account password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investmentGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Goals</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an investment goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INVESTMENT_GOALS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose your investment goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Tolerance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a risk tolerance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RISK_TOLERANCE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your risk tolerance.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredIndustries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Industries</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a preferred industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PREFERRED_INDUSTRIES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose your preferred industry.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <Button
              type="submit"
              className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-[1.03] transition-transform duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
              Sign Up
            </Button>
            <div className="flex justify-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
