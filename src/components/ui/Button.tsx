import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-button transition-all duration-300 font-medium text-sm sm:text-base ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-indigo-500 to-mauve-500 text-white px-4 sm:px-5 py-2 hover:from-indigo-600 hover:to-mauve-600'
          : variant === 'secondary'
          ? 'bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-glass text-slate-800 dark:text-slate-100 px-4 sm:px-5 py-2 hover:bg-slate-100/90 dark:hover:bg-slate-700/90'
          : 'p-2 sm:p-3 hover:bg-slate-100/90 dark:hover:bg-slate-700/90 rounded-full'
      } ${className}`}
    >
      {children}
    </button>
  );
}