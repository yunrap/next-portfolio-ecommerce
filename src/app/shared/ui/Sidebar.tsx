'use client';

import { useRouter } from 'next/navigation';
import useSidebarStore from '../store/useSidebarStore';

import { useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const t = useTranslations('BannerSection');

  const categories = [
    {
      name: t('womansFashion'),
      key: 'womansFashion',
      englishName: "Woman's Fashion",
    },
    {
      name: t('mensFashion'),
      key: 'mensFashion',
      englishName: "Men's Fashion",
    },
    { name: t('electronics'), key: 'electronics', englishName: 'Electronics' },
    {
      name: t('homeLifestyle'),
      key: 'homeLifestyle',
      englishName: 'Home & Lifestyle',
    },
    { name: t('medicine'), key: 'medicine', englishName: 'Medicine' },
    {
      name: t('sportsOutdoor'),
      key: 'sportsOutdoor',
      englishName: 'Sports & Outdoor',
    },
    { name: t('babysToys'), key: 'babysToys', englishName: "Baby's & Toys" },
    {
      name: t('groceriesPets'),
      key: 'groceriesPets',
      englishName: 'Groceries & Pets',
    },
    {
      name: t('healthBeauty'),
      key: 'healthBeauty',
      englishName: 'Health & Beauty',
    },
  ];
  const { isOpen, close } = useSidebarStore();
  const router = useRouter();

  const handleClick = (category: {
    name: string;
    key: string;
    englishName: string;
  }) => {
    close();
    router.push(
      `/product?category=${encodeURIComponent(category.englishName)}`,
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
    >
      <button
        onClick={close}
        className="m-4 self-end p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label={t('closeSidebar')}
      >
        <XMarkIcon className="h-6 w-6" />
        <XMarkIcon className="h-6 w-6" />
      </button>
      {/* 사이드바 내용 */}
      <nav className="flex flex-col items-center py-10">
        <ul className="justify-center space-y-5">
          {categories.map(category => (
            <li
              key={category.key}
              className="flex w-full items-center justify-between text-base whitespace-nowrap transition-all duration-200 hover:font-semibold hover:text-black"
              onClick={() => handleClick(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
