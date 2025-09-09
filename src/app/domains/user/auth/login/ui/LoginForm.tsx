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
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export default function LoginForm() {
  const t = useTranslations('LoginForm');
  
  const formSchema = z.object({
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
          {t('title')}
        </h1>
        <p className="text-base">{t('subtitle')}</p>

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
        <div className="flex items-center justify-between">
          <Button type="submit" size={'md'}>
            {t('loginButton')}
          </Button>
          <Link href="#" className="text-secondary-2 mt-4 text-center text-sm">
            {t('forgetPassword')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
