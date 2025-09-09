import React from 'react';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';

export interface TopHeaderProps {
  /** 헤더 표시 여부 */
  isVisible?: boolean;
}

export default function TopHeader({ isVisible = true }: TopHeaderProps) {
  const t = useTranslations('TopHeader');

  if (!isVisible) return null;

  return (
    <div className="relative min-h-9 bg-black px-2 py-1.5 text-xs text-white sm:min-h-10 sm:px-4 sm:py-2 md:h-12 md:py-3 md:text-sm">
      <div className="mx-auto flex max-w-7xl items-center">
        {/* 왼쪽 공간 */}
        <div className="w-16 sm:w-20 md:w-24"></div>

        {/* 메시지 영역 - 중앙 정렬 */}
        <div className="flex flex-1 flex-col items-center justify-center gap-0.5 text-center sm:flex-row sm:gap-1 md:gap-2">
          <p className="text-xs leading-tight sm:text-sm md:text-base">
            {t('promotionMessage')}
          </p>
          <span className="cursor-pointer text-xs leading-tight font-semibold whitespace-nowrap underline hover:opacity-80 sm:text-sm md:text-base">
            {t('shopNow')}
          </span>
        </div>

        {/* 언어 선택기 - 고정 크기 */}
        <div className="flex w-16 justify-end sm:w-20 md:w-24">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
