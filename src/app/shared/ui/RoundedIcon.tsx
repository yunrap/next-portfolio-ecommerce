'use client';

import { cva } from 'class-variance-authority';

const circleStyle = cva(
  'inline-flex items-center justify-center rounded-full bg-gray-200',
  {
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-[2.1rem] h-[2.1rem]',
        lg: 'w-11 h-11',
      },
      color: {
        gray: 'bg-secondary text-gray-700',
        black: 'bg-black ',
        red: 'bg-secondary-2 text-white',
        white: 'bg-white',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'gray',
    },
  },
);

interface RoundedIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'gray' | 'black' | 'red' | 'white';
  children: React.ReactNode;
}

export function RoundedIcon({
  size,
  color,
  children,
  className,
  ...props
}: RoundedIconProps) {
  return (
    <span className={circleStyle({ size, color, className })} {...props}>
      {children}
    </span>
  );
}
