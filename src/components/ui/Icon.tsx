import { ReactNode } from 'react';

interface IconProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Icon({ children, size = 'md', className }: IconProps) {
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  return <span className={`${sizes[size]} ${className}`}>{children}</span>;
}