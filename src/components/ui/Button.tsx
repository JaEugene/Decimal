import { FC, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg transition-colors',
        variant === 'primary' 
          ? 'bg-primary text-white hover:bg-primary-hover' 
          : 'bg-gray-700 text-white hover:bg-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};