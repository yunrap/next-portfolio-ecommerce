'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLocale } from 'next-intl';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find(lang => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language: (typeof languages)[0]) => {
    // 쿠키에 언어 설정 저장
    document.cookie = `locale=${language.code}; path=/; max-age=31536000`; // 1년
    setIsDropdownOpen(false);

    // 페이지 새로고침으로 언어 변경 적용
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-0.5 transition-opacity hover:opacity-80 sm:gap-1 md:gap-1.5"
        aria-label="언어 선택"
      >
        <span className="hidden text-sm sm:inline md:text-lg">
          {currentLanguage.flag}
        </span>
        <span className="text-xs leading-tight whitespace-nowrap sm:text-sm md:text-base">
          {currentLanguage.code === 'ko' ? 'KO' : 'EN'}
        </span>
        <ChevronDownIcon
          className={`h-3 w-3 transition-transform sm:h-4 sm:w-4 md:h-4 md:w-4 ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 z-50 mt-1 min-w-24 rounded-md border border-gray-200 bg-white shadow-lg sm:min-w-28">
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-xs text-black hover:bg-gray-50 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm ${
                currentLanguage.code === language.code
                  ? 'bg-gray-100 font-medium'
                  : ''
              }`}
            >
              <span className="text-sm sm:text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
