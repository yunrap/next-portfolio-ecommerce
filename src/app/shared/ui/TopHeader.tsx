import React from 'react';
import LanguageSelector from './LanguageSelector';

export interface TopHeaderProps {
  /** 헤더 표시 여부 */
  isVisible?: boolean;
}

export default function TopHeader({
  isVisible = true
}: TopHeaderProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-black text-white py-1.5 sm:py-2 md:py-3 px-2 sm:px-4 text-xs md:text-sm relative min-h-9 sm:min-h-10 md:h-12">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* 왼쪽 공간 */}
        <div className="w-16 sm:w-20 md:w-24"></div>
        
        {/* 메시지 영역 - 중앙 정렬 */}
        <div className="flex-1 flex flex-col sm:flex-row gap-0.5 sm:gap-1 md:gap-2 items-center justify-center text-center">
          <p className="text-xs sm:text-sm md:text-base leading-tight">
            여름 수영복 특가 할인 및 무료 특급 배송 - 50% 할인!
          </p>
          <span className="font-semibold text-xs sm:text-sm md:text-base leading-tight underline cursor-pointer hover:opacity-80 whitespace-nowrap">
            지금 쇼핑
          </span>
        </div>

        {/* 언어 선택기 - 고정 크기 */}
        <div className="w-16 sm:w-20 md:w-24 flex justify-end">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}