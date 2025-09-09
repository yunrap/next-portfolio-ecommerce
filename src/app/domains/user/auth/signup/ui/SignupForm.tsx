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
import { useTranslations } from 'next-intl';

export default function SignupForm() {
  const t = useTranslations('SignupForm');

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('nameMinLength'),
    }),
    email: z
      .string()
      .min(1, { message: t('emailRequired') })
      .email({ message: t('emailInvalid') }),
    password: z
      .string()
      .min(8, { message: t('passwordMinLength') })
      .regex(/[A-Z]/, {
        message: t('passwordUppercase'),
      })
      .regex(/[a-z]/, {
        message: t('passwordLowercase'),
      })
      .regex(/[0-9]/, { message: t('passwordNumber') })
      .regex(/[^A-Za-z0-9]/, {
        message: t('passwordSpecial'),
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
          {t('title')}
        </h1>
        <p className="text-base">{t('subtitle')}</p>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: t('nameRequired') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="hidden">
                {t('nameLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('namePlaceholder')}
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
          rules={{ required: t('emailRequired') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden" htmlFor="email">
                {t('emailLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('emailPlaceholder')}
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
          rules={{ required: t('passwordRequired') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden" htmlFor="password">
                {t('passwordLabel')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('passwordPlaceholder')}
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
          {t('createAccount')}
        </Button>
        <Button
          type="button"
          className="flex w-full items-center gap-2"
          variant="outline"
        >
          <Image
            src="/icon/Icon-Google.svg"
            alt={t('googleLogin')}
            width={20}
            height={20}
            aria-hidden="true"
          />
          {t('signupWithGoogle')}
        </Button>

        <p className="mt-4 text-center text-sm">
          {t('alreadyHaveAccount')}
          <Link href="/login" className="ml-1 underline">
            {t('login')}
          </Link>
        </p>
      </form>
    </Form>
  );
}
