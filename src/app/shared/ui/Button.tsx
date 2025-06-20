import { VariantProps, cva } from 'class-variance-authority';
import cn from '../utils/classNames';

const buttonVariants = cva(
  'inline-flex  items-center justify-center rounded-md text-sm font-medium transition-colors hover:cursor-pointer whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-button2 text-white hover:bg-hover-button',
        secondary: 'bg-button1 text-white hover:bg-green-200',
        outline: 'border border-text2 text-black bg-white hover:bg-gray-100',
        black: 'bg-black text-white hover:bg-gray-900',
      },
      size: {
        sm: 'h-8 px-6 text-xs',
        md: 'h-14 px-12 text-base',
        lg: 'h-14 px-30 text-base',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      isDisabled: false,
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  isDisabled,
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={!!isDisabled}
      className={cn(buttonVariants({ variant, size, isDisabled }), className)}
      {...props}
    />
  );
};
