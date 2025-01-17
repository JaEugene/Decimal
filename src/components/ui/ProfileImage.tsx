import { FC } from 'react';
import { cn } from '../../utils/cn';

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProfileImage: FC<ProfileImageProps> = ({
  src,
  alt,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  const svgSizes = {
    sm: 128,
    md: 192,
    lg: 256
  };

  return (
    <div className={cn(
      'relative group',
      'flex items-center justify-center',
      className
    )}>
      {/* Moving dot animation */}
      <div className="absolute inset-0">
        <div className="absolute w-3 h-3 bg-black rounded-full blur-[2px] animate-[moveAround_20s_linear_infinite]" />
      </div>

      {/* Glowing background effect */}
      <div className={cn(
        'absolute',
        sizeClasses[size],
        'bg-black/10',
        'rounded-full blur-lg',
        'transition-opacity duration-300',
        'group-hover:bg-black/20'
      )} />

      {/* Main image container */}
      <div className={cn(
        'relative',
        sizeClasses[size],
        'rounded-full',
        'overflow-hidden',
        'transition-transform duration-300',
        'group-hover:scale-105',
        'shadow-[0_0_30px_rgba(0,0,0,0.2)]',
        'group-hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]'
      )}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />

        {/* Hover overlay */}
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-t from-black/20 to-transparent',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300'
        )} />
      </div>
    </div>
  );
};