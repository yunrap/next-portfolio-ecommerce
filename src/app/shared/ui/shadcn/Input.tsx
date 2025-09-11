import * as React from 'react';
import cn from '../../utils/classNames';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, required, ...props }, ref) => {
    const inputId = React.useId();

    if (label) {
      return (
        <div className="flex flex-col gap-1.5">
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-black"
          >
            {label}
            {required && ' *'}
          </label>
          <input
            id={inputId}
            type={type}
            className={cn(
              'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-[50px] w-full rounded-md border bg-neutral-100 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              error && 'border-red-500',
              className,
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="text-[#db4444] text-base leading-6">
              {error}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error && 'border-red-500',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
