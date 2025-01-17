import { FC, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => (
  <div className={cn(
    'p-6 transition-all backdrop-blur-md bg-[#4169E1]/10 hover:bg-[#4169E1]/15 border border-[#4169E1]/20 rounded-xl shadow-lg',
    className
  )}>
    {children}
  </div>
);