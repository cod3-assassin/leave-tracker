import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-end z-50 sm:pt-16">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-[90vw] sm:max-w-sm relative mr-2 sm:mr-4 mt-2 sm:mt-0 overflow-x-hidden">
        {/* Pointer triangle */}
        <div className="absolute top-4 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white sm:top-6 sm:-right-3 sm:border-t-10 sm:border-b-10 sm:border-l-10 rotate-45" />
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
};