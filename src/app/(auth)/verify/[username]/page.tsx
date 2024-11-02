"use client"
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { signUpSchema } from '@/schemas/signUpSchema';
import { verifySchema } from '@/schemas/verifySchema';
import { apiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Link from 'next/link';


const verifyAccount = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        code: data.code,
      })
      toast({
        title: 'Success',
        description: response.data.message
      })

      router.push(`/sign-in`)
    } catch (error) {
      console.error("Error in sign-up of user", error)
      const axiosError = error as AxiosError<apiResponse>;
      let errorMsg = axiosError.response?.data.message
      toast({
        title: 'SignUp Failed',
        description: errorMsg,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen dark:bg-gray-700 bg-slate-50">
  <div className="relative w-full max-w-md p-8 bg-white text-black dark:bg-gray-900 dark:text-white rounded-lg shadow-xl z-10">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-sky-500 dark:text-teal-400">
        Verify Your Account
      </h1>
      <p className="dark:text-gray-300 text-gray-900 mb-4">
        Enter the Verification Code Sent to Your Email
      </p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl >
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="flex justify-center gap-2 w-full">
                    <InputOTPSlot
                      index={0}
                      className="dark:bg-gray-700 bg-white border border-sky-500 dark:border dark:border-gray-600 rounded-lg p-2 text-center w-12 h-12 text-lg font-medium dark:text-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-teal-400"
                    />
                    <InputOTPSlot
                      index={1}
                      className="dark:bg-gray-700 bg-white border border-sky-500 dark:border dark:border-gray-600 rounded-lg p-2 text-center w-12 h-12 text-lg font-medium dark:text-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-teal-400"
                    />
                    <InputOTPSlot
                      index={2}
                      className="dark:bg-gray-700 bg-white border border-sky-500 dark:border dark:border-gray-600 rounded-lg p-2 text-center w-12 h-12 text-lg font-medium dark:text-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-teal-400"
                    />
                    <InputOTPSlot
                      index={3}
                      className="dark:bg-gray-700 bg-white border border-sky-500 dark:border dark:border-gray-600 rounded-lg p-2 text-center w-12 h-12 text-lg font-medium dark:text-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-teal-400"
                    />
                    <InputOTPSlot
                      index={4}
                      className="dark:bg-gray-700 bg-white border border-sky-500 dark:border dark:border-gray-600 rounded-lg p-2 text-center w-12 h-12 text-lg font-medium dark:text-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-teal-400"
                    />
                    <InputOTPSlot
                      index={5}
                      className="dark:bg-gray-700 bg-white border border-sky-500 dark:border dark:border-gray-600 rounded-lg p-2 text-center w-12 h-12 text-lg font-medium dark:text-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-teal-400"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" dark:bg-teal-400 bg-sky-500 hover:bg-transparent dark:hover:bg-teal-300 dark:text-white py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 dark:focus:ring-teal-400 hover:border-2 hover:border-solid hover:border-sky-500 hover:text-black"
        >
          Submit
        </Button>
      </form>
    </Form>
    
    
  </div>
  
</div>

  
  )
}

export default verifyAccount;
