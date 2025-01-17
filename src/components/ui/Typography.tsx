import { FC, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';
  children: ReactNode;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({
  variant = 'body',
  children,
  className
}) => {
  const baseStyles = "text-gray-900 font-medium tracking-tight";
  
  const styles = {
    h1: "text-4xl font-bold leading-tight",
    h2: "text-3xl font-bold leading-tight",
    h3: "text-2xl font-bold leading-snug",
    h4: "text-xl font-bold leading-snug",
    body: "text-base leading-relaxed text-gray-700",
    small: "text-sm leading-relaxed text-gray-600"
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={cn(baseStyles, styles[variant], className)}>
      {children}
    </Component>
  );
};