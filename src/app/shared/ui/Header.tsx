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

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
  { name: 'Sign Up', href: '/signup' },
];

export interface HeaderProps {
  user?: unknown;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="메인 내비게이션"
      className="w-full border-1 border-b-gray-300 bg-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-10 pb-4 lg:px-36">
        {/* Logo */}
        <div className="flex">
          <Bars3Icon
            aria-label="메뉴 상태바 클릭"
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
        <div className="flex items-center space-x-4">
          <form
            action="/search"
            method="get"
            role="search"
            aria-label="사이트 검색"
            className="relative hidden sm:flex"
          >
            <label htmlFor="search-input" className="sr-only">
              검색어 입력
            </label>
            <input
              id="search-input"
              name="q"
              type="search"
              placeholder="What are you looking for?"
              className="bg-secondary rounded px-3 py-2 pr-8 text-sm text-black focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button
              type="submit"
              aria-label="검색"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-xl"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-black"></MagnifyingGlassIcon>
            </button>
          </form>
          {user ? (
            <>
              <Link href="/wishlist" aria-label="위시리스트">
                <HeartIcon className="h-7 w-7 text-black" />
              </Link>
              <Link
                href="/cart"
                aria-label="장바구니"
                className="flex items-center text-2xl focus:ring-2 focus:ring-black focus:outline-none"
              >
                <ShoppingCartIcon className="h-7 w-7 text-black"></ShoppingCartIcon>
              </Link>
              <Link
                href="/cart"
                aria-label="장바구니"
                className="flex items-center text-2xl focus:ring-2 focus:ring-black focus:outline-none"
              >
                <RoundedIcon size="md" color="red">
                  <UserIcon className="h-5 w-5 text-white"></UserIcon>
                </RoundedIcon>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
