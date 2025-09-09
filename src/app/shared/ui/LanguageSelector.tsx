'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]); // 한국어 기본값
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 hover:opacity-80 transition-opacity"
        aria-label="언어 선택"
      >
        <span className="hidden sm:inline text-sm md:text-lg">{currentLanguage.flag}</span>
        <span className="text-xs sm:text-sm md:text-base leading-tight whitespace-nowrap">
          {currentLanguage.code === 'ko' ? 'KO' : 'EN'}
        </span>
        <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-24 sm:min-w-28 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1.5 sm:gap-2 text-black ${
                currentLanguage.code === language.code ? 'bg-gray-100 font-medium' : ''
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