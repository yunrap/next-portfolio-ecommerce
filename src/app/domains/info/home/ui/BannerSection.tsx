'use client';
import Link from 'next/link';
import BannerSwiper from './BannerSwiper';
import { useTranslations } from 'next-intl';

export default function BannerSection() {
  const t = useTranslations('BannerSection');
  
  const categories = [
    { name: t('womansFashion'), key: 'womansFashion' },
    { name: t('mensFashion'), key: 'mensFashion' },
    { name: t('electronics'), key: 'electronics' },
    { name: t('homeLifestyle'), key: 'homeLifestyle' },
    { name: t('medicine'), key: 'medicine' },
    { name: t('sportsOutdoor'), key: 'sportsOutdoor' },
    { name: t('babysToys'), key: 'babysToys' },
    { name: t('groceriesPets'), key: 'groceriesPets' },
    { name: t('healthBeauty'), key: 'healthBeauty' },
  ];
  return (
    <div className="mt-4 flex justify-center md:grid md:grid-cols-[20%_80%] lg:mt-10 lg:ml-30">
      <nav aria-label="Category Menu" className="mx-4 hidden px-4 md:block">
        <ul className="flex h-full flex-col justify-evenly">
          {categories.map((category) => (
            <li key={category.key} className="flex text-base text-black">
              <Link
                href={`/product?category=${encodeURIComponent(category.name)}`}
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
