'use client';

import { Button } from '@/app/shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/shared/ui/shadcn/form';
import { Input } from '@/app/shared/ui/shadcn/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

export default function LoginForm() {
  const formSchema = z.object({
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
      email: '',
      password: '',
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
          Log in to Exclusive
        </h1>
        <p className="text-base">Enter your details below</p>

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
        <div className="flex items-center justify-between">
          <Button type="submit" size={'md'}>
            Log In
          </Button>
          <Link href="#" className="text-secondary-2 mt-4 text-center text-sm">
            Forget Password?
          </Link>
        </div>
      </form>
    </Form>
  );
}
