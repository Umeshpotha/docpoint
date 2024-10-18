"use client";
import { useDebounceCallback } from 'usehooks-ts';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';
import axios, { AxiosError } from 'axios';
import { apiResponse } from '@/types/apiResponse';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const page = () => {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMessages, setPasswordMessages] = useState('');
  const [meetsRequirements, setMeetsRequirements] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);
  const debouncedPassword = useDebounceCallback((value) => checkPasswordStrength(value), 300);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: '', email: '', password: '' }
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<apiResponse>;
          setUsernameMessage(axiosError.response?.data.message || 'Error Checking Username');
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);
  const checkPasswordStrength = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
  
    // Determine strength
    const strength = [hasUppercase, hasLowercase, hasNumber, hasSymbol].filter(Boolean).length;
  
    if (strength <= 2) setPasswordStrength('Weak');
    else if (strength === 3) setPasswordStrength('Moderate');
    else setPasswordStrength('Strong');
  
    // Check if all requirements are met
    if (hasUppercase && hasLowercase && hasNumber && hasSymbol) {
      setMeetsRequirements(true);
      setPasswordMessages(''); // No message if all conditions are met
    } else {
      setMeetsRequirements(false);
  
      // List missing criteria
      const messages = [];
      if (!hasUppercase) messages.push('Uppercase letter');
      if (!hasLowercase) messages.push('Lowercase letter');
      if (!hasNumber) messages.push('Number');
      if (!hasSymbol) messages.push('Special character');
  
      setPasswordMessages(`Password is missing: ${messages.join(', ')}`);
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response =await axios.post<apiResponse>(`/api/signup`, data);
      toast({
        title: 'Success',
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: 'SignUp Failed',
        description: axiosError.response?.data.message,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-700">
      {/* <BackgroundGradient className="rounded-[22px] max-w-md p-8  bg-gray-900 text-white shadow-xl z-10"> */}
      <div className="relative w-full max-w-md p-8  bg-gray-900 text-white rounded-lg shadow-xl z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-teal-400">Create Your Account</h1>
          <p className="text-gray-300 mb-4">Sign up to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      className="bg-gray-700 text-white placeholder-gray-400 shadow-md"
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p className={`text-sm ${usernameMessage === "Username Available" ? 'text-green-500' : 'text-red-500'}`}>
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="bg-gray-700 text-white placeholder-gray-400 shadow-md"
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
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedPassword(e.target.value);
                      }}
                      className="bg-gray-700 text-white placeholder-gray-400 shadow-md"
                    />
                  </FormControl>
                  <p className={`text-sm ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Moderate' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {passwordStrength ? `Password Strength: ${passwordStrength}` : ''}
                  </p>
                  <p className="text-sm text-yellow-500">
        {passwordMessages} {/* This shows what is missing from the password */}
      </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting||!meetsRequirements} className="w-full bg-teal-400 hover:bg-teal-300 shadow-lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : ('Sign Up')}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>Have an account?{' '}
            <Link href="/sign-in" className="text-teal-400 hover:text-teal-200">Sign in</Link>
          </p>
        </div>
      </div>
      {/* </BackgroundGradient> */}
    </div>
  );
};

export default page;
