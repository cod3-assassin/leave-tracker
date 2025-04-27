import React from 'react';
import { ScrollableCard } from './ScrollableCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-4 top-16 sm:right-8 sm:top-20 bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-4 shadow-md transition-all duration-300 w-[90vw] sm:w-80 max-h-[80vh] overflow-hidden z-50"
      >
        {/* Optional: small pointer triangle on desktop */}
        <div className="hidden sm:block absolute -top-2 right-6 w-4 h-4 bg-white/20 backdrop-blur-[16px] transform rotate-45 shadow-md" />

        {/* Close Button (optional if you want) */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <ScrollableCard className="w-full" maxHeight="max-h-[320px] sm:max-h-[400px]">
          {children}
        </ScrollableCard>

      </div>
    </div>
  );
};
