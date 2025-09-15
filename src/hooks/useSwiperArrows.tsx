import { useState, useEffect, useCallback, RefObject } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { TimelineItem } from '../data/mockTimeLineData';

interface UseSwiperArrowsProps {
  activeItem: TimelineItem | null;
  swiperRef: RefObject<SwiperType | null>;
}

export const useSwiperArrows = ({ activeItem, swiperRef }: UseSwiperArrowsProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const updateArrowsVisibility = useCallback(() => {
    if (!activeItem?.description || !swiperRef.current) return;

    const totalSlides = activeItem.description.length;
    const containerWidth = swiperRef.current.width;
    const firstSlide = swiperRef.current.slides[0];

    if (!firstSlide) return;

    const slideWidth = firstSlide.offsetWidth;
    const spaceBetween = 20;
    const visibleSlides = containerWidth / (slideWidth + spaceBetween);

    setShowArrows(totalSlides > visibleSlides);
    setIsBeginning(swiperRef.current.isBeginning);
    setIsEnd(swiperRef.current.isEnd);
  }, [activeItem, swiperRef]);

  // Функция для обновления состояния начала/конца
  const updateSwiperState = useCallback(
    (swiper: SwiperType) => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      updateArrowsVisibility(); // Добавляем обновление видимости стрелок
    },
    [updateArrowsVisibility],
  );

  useEffect(() => {
    updateArrowsVisibility();

    const handleResize = () => updateArrowsVisibility();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [updateArrowsVisibility]);

  return {
    isBeginning,
    isEnd,
    showArrows,
    updateSwiperState,
    updateArrowsVisibility,
  };
};
