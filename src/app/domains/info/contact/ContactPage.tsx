'use client';

import { Button } from '@/app/shared/ui/Button';
import { Input } from '@/app/shared/ui/shadcn/Input';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <span className="text-gray-500">Home</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-black">Contact</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                📞
              </div>
              <h3 className="text-lg font-semibold">Call To Us</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>We are available 24/7, 7 days a week.</p>
              <p className="font-medium">Phone: +8801611112222</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                ✉️
              </div>
              <h3 className="text-lg font-semibold">Write To Us</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
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
                    placeholder="Your Name *"
                    required
                    className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    required
                    className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone *"
                    required
                    className="h-12 border-none bg-gray-50 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
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
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
