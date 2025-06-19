'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/app/shared/ui/shadcn/Input';
import { Button } from '@/app/shared/ui/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/shared/ui/shadcn/form';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupForm() {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        aria-labelledby="signup-title"
        className="m-auto mx-auto w-full space-y-6 px-4 font-medium lg:px-30"
      >
        <h1 id="signup-title" className="text-4xl font-normal">
          Create an account
        </h1>
        <p className="text-base">Enter your details below</p>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="hidden">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  id="name"
                  type="text"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden" htmlFor="email">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  id="email"
                  type="text"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden" htmlFor="password">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  id="password"
                  type="password"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size={'lg'} className="w-full">
          Create Account
        </Button>
        <Button
          type="button"
          className="flex w-full items-center gap-2"
          variant="outline"
        >
          <Image
            src="/icon/Icon-Google.svg"
            alt="google login"
            width={20}
            height={20}
            aria-hidden="true"
          />
          Sign up with Google
        </Button>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/login" className="ml-1 underline">
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
}
