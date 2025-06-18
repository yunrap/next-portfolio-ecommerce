import {
  ArrowLeftStartOnRectangleIcon,
  EyeIcon,
  HeartIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { RoundedIcon } from './RoundedIcon';
import Image from 'next/image';
const star = [1, 2, 3, 4, 5];

export default function ProductCard() {
  return (
    <>
      <div className="bg-secondary aspect relative rounded p-3">
        <span className="bg-secondary-2 h-6 rounded-sm px-3 py-1 text-white">
          -40%
        </span>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <RoundedIcon aria-label="preview" size="lg" color="white">
            <HeartIcon className="h-5 w-5 text-black"></HeartIcon>
          </RoundedIcon>
          <RoundedIcon aria-label="preview" size="lg" color="white">
            <EyeIcon className="h-5 w-5 text-black"></EyeIcon>
          </RoundedIcon>
        </div>
        <div>
          <Image
            src="/image/prd1.png"
            alt="이미지"
            width={200}
            height={200}
            className="mx-auto py-9"
          ></Image>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-medium text-black">
          HAVIT HV-G92 Gamepad
        </h3>
        <span className="text-secondary-2 pr-3 font-medium">$120</span>
        <span className="line-through opacity-50">$160</span>
        <div className="flex gap-1 py-2">
          {star.map(st => {
            return (
              <Image
                key={st}
                src="/image/star.svg"
                alt="이미지"
                width={20}
                height={20}
                className=""
              ></Image>
            );
          })}
        </div>
      </div>
    </>
  );
}
