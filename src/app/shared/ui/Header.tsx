// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { RoundedIcon } from './RoundedIcon';
import useSidebarStore from '../store/useSidebarStore';
import { useTranslations } from 'next-intl';

export interface HeaderProps {
  user?: unknown;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const t = useTranslations('Header');
  const toggle = useSidebarStore(state => state.toggle);

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('contact'), href: '/contact' },
    { name: t('about'), href: '/about' },
    { name: t('signUp'), href: '/signup' },
  ];

  return (
    <nav
      aria-label="메인 내비게이션"
      className="w-full border-1 border-b-gray-300 bg-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-10 pb-4">
        {/* Logo */}
        <div className="flex">
          <Bars3Icon
            onClick={toggle}
            aria-label={t('menuLabel')}
            className="mr-4 flex h-8 w-8 text-black md:mr-0 md:hidden"
          ></Bars3Icon>
          <Link
            href="/"
            aria-label="Exclusive 메인 페이지로 이동"
            className="text-2xl font-bold text-black"
          >
            Exclusive
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className="hidden space-x-8 md:flex lg:space-x-12 2xl:space-x-14">
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`text-base font-medium text-black outline-none hover:underline focus:underline ${
                  pathname === item.href ? 'underline' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Search & Icons */}
        <div className="relative hidden lg:block">
          <label htmlFor="search-input" className="sr-only">
            {t('searchLabel')}
          </label>
          <input
            id="search-input"
            name="q"
            placeholder={t('searchPlaceholder')}
            className="bg-secondary mx-4 w-full rounded px-6 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:outline-none"
          />
          <button
            type="submit"
            aria-label={t('searchLabel')}
            className="absolute top-1/2 right-0 -translate-y-1/2 text-xl"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-black"></MagnifyingGlassIcon>
          </button>
        </div>
        <div className="flex space-x-4">
          <Link href="/wishlist" aria-label={t('wishlistLabel')}>
            <HeartIcon className="h-7 w-7 text-black" />
          </Link>
          <Link
            href="/cart"
            aria-label={t('cartLabel')}
            className="flex items-center text-2xl focus:outline-none"
          >
            <ShoppingCartIcon className="h-7 w-7 text-black"></ShoppingCartIcon>
          </Link>
        </div>

        {user ? (
          <>
            <Link
              href="/cart"
              aria-label={t('cartLabel')}
              className="flex items-center text-2xl focus:outline-none"
            >
              <RoundedIcon size="md" color="red">
                <UserIcon className="h-5 w-5 text-white"></UserIcon>
              </RoundedIcon>
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}
