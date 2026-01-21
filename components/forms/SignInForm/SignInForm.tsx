"use client";

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
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    console.log(values);
  };

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
              Login
            </Button>
            <div className="flex justify-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
