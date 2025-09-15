'use client';
import Link from 'next/link';
import BannerSwiper from './BannerSwiper';
import { useTranslations } from 'next-intl';
import { getCategoriesWithTranslation } from '@/app/mocks/data/categories';

export default function BannerSection() {
  const t = useTranslations('BannerSection');
  const categories = getCategoriesWithTranslation(t);

  return (
    <div className="mt-4 flex justify-center md:grid md:grid-cols-[20%_80%] lg:mt-10 lg:ml-30">
      <nav aria-label="Category Menu" className="mx-4 hidden px-4 md:block">
        <ul className="flex h-full flex-col justify-evenly">
          {categories.map(category => (
            <li key={category.key} className="flex text-base text-black">
              <Link
                href={`/product?category=${category.key}`}
                className="flex w-full items-center justify-between whitespace-nowrap transition-all duration-200 hover:font-semibold hover:text-black md:text-lg lg:text-xl"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-full w-full">
        <BannerSwiper />
      </div>
    </div>
  );
}
