'use client';

import { Button } from '@/app/shared/ui/Button';
import { Input } from '@/app/shared/ui/shadcn/Input';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      <nav className="mb-8 text-xl">
        <span className="text-gray-500">{t('home')}</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-black">{t('contact')}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                📞
              </div>
              <h3 className="text-lg font-semibold">{t('callToUs')}</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>{t('available247')}</p>
              <p className="font-medium">{t('phone')}</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                ✉️
              </div>
              <h3 className="text-lg font-semibold">{t('writeToUs')}</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>{t('fillForm')}</p>
              <p>{t('customerEmail')}</p>
              <p>{t('supportEmail')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Input
                    type="text"
                    placeholder={t('yourName')}
                    required
                    className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t('yourEmail')}
                    required
                    className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder={t('yourPhone')}
                    required
                    className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder={t('yourMessage')}
                  rows={8}
                  className="w-full resize-none rounded-md border-none bg-gray-50 p-4 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="px-12"
                >
                  {t('sendMessage')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
