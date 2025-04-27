import React, { useRef, useEffect, useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface ScrollableCardProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const ScrollableCard: React.FC<ScrollableCardProps> = ({
  children,
  className = '',
  maxHeight = 'max-h-[240px] sm:max-h-[300px] md:max-h-[400px]',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -50, behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 50, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollContainerRef}
        className={`overflow-y-auto scrollbar-none ${maxHeight}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
      {(canScrollUp || canScrollDown) && (
        <>
          <div className="absolute top-2 right-1">
            <button
              className={`p-1 rounded-lg bg-gray-50 shadow-md transition-all duration-200 ${
                canScrollUp ? 'opacity-100 hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={canScrollUp ? handleScrollUp : undefined}
              disabled={!canScrollUp}
            >
              <FiChevronUp className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="absolute bottom-2 right-1">
            <button
              className={`p-1 rounded-lg bg-gray-50 shadow-md transition-all duration-200 ${
                canScrollDown ? 'opacity-100 hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={canScrollDown ? handleScrollDown : undefined}
              disabled={!canScrollDown}
            >
              <FiChevronDown className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};