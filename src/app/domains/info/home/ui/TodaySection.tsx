import { Button } from '@/app/shared/ui/Button';
import ProductCard from '@/app/shared/ui/ProductCard';
import { RoundedIcon } from '@/app/shared/ui/RoundedIcon';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductSwiper from './ProductSwiper';

export default function TodaySection() {
  return (
    <>
      <section aria-labelledby="flash-sales-heading" className="mt-30 ml-10">
        <header className="flex items-center gap-4">
          <div
            className="bg-secondary-2 h-10 w-5 rounded-sm"
            aria-hidden="true"
            role="presentation"
          ></div>
          <p
            className="text-secondary-2 text-base font-bold"
            id="flash-sales-subtitle"
          >
            Today's
          </p>
        </header>
        <div className="mr-10 flex items-center justify-between">
          <h2 id="flash-sales-heading" className="mb-8 pt-6 text-4xl font-bold">
            Flash Sales
          </h2>
          {/* 화살표 */}
          <div className="space-x-2">
            <RoundedIcon aria-label="preview" size="lg" color="gray">
              <ArrowLeftIcon className="h-6 w-6"></ArrowLeftIcon>
            </RoundedIcon>
            <RoundedIcon aria-label="next" size="lg" color="gray">
              <ArrowRightIcon className="h-6 w-6"></ArrowRightIcon>
            </RoundedIcon>
          </div>
        </div>
        <ProductSwiper />
        <div className="mt-15 flex justify-center">
          <Button size="md" variant="primary" className="text-white">
            View All Products
          </Button>
        </div>
      </section>
    </>
  );
}
