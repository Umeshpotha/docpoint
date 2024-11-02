"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { identifier: '', password: '' }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,  // Disable automatic redirection
        identifier: data.identifier,
        password: data.password,
      });
      console.log("Sign-in result: ", result);

      if (result?.error) {
        toast({
          title: "Login Failed",
          description: "Incorrect Username or Password",
          variant: "destructive",
        });
      } else if (result?.ok && result?.url) {
        toast({
          title: "Login Successful",
          description: "Redirecting..."
        });
        router.replace('/dashboard'); // Redirect to the dashboard upon successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-slate-50">
      <div className="relative w-full max-w-md p-8 bg-white text-black rounded-lg shadow-xl z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-sky-400">Sign In</h1>
          <p className="text-black mb-4">Enter your credentials to sign in</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email or Username"
                      {...field}
                      className="bg-white text-black  shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="bg-white text-black shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full bg-sky-400 hover:bg-transparent  text-white shadow-lg hover:border-2 hover:border-sky-500 hover:text-black">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : 'Sign In'}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>Don't have an account?{' '}
            <Link href="/sign-up" className="text-sky-400 hover:text-sky-600">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
