import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { TimelineItem } from '../../data/mockTimeLineData';
import { useSwiperArrows } from '../../hooks/useSwiperArrows';
import 'swiper/css';
import 'swiper/css/navigation';
import './DescriptionSwiper.scss';
import { gsap } from 'gsap';

interface DescriptionSwiperProps {
  activeItem: TimelineItem | null;
}

const DescriptionSwiper: React.FC<DescriptionSwiperProps> = ({ activeItem }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperBlockRef = useRef(null);
  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  useEffect(() => {
    if (!swiperBlockRef.current || !activeItem) return;

    const tl = gsap.timeline();
    tl.to(swiperBlockRef.current, {
      opacity: 0,
      duration: 0,
      ease: 'power2.inOut',
    }).to(swiperBlockRef.current, {
      opacity: 1,
      duration: 0.3,
      delay: 1,
      ease: 'power2.inOut',
    });
  }, [activeItem]);

  const { isBeginning, isEnd, showArrows, updateSwiperState, updateArrowsVisibility } = useSwiperArrows({ activeItem, swiperRef });

  if (!activeItem?.description?.length) return null;

  return (
    <div ref={swiperBlockRef} className={`description-swiper ${activeItem ? 'visible' : ''}`}>
      <div className="description-swiper__wrapper">
        <button
          className={`custom-arrow prev ${isBeginning ? 'disabled' : ''} ${!showArrows ? 'hidden' : ''}`}
          onClick={handlePrev}
          disabled={isBeginning}>
          &lt;
        </button>

        <Swiper
          spaceBetween={20}
          slidesPerView={'auto'}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            requestAnimationFrame(updateArrowsVisibility);
          }}
          onSlideChange={updateSwiperState}
          onResize={updateArrowsVisibility}
          onReachEnd={updateSwiperState}
          onReachBeginning={updateSwiperState}
          className="description-swiper__container">
          {activeItem.description.map((item, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div className="description-card">
                <p className="description-card__year">{item.year}</p>
                <p className="description-card__description">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`custom-arrow next ${isEnd ? 'disabled' : ''} ${!showArrows ? 'hidden' : ''}`} onClick={handleNext} disabled={isEnd}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DescriptionSwiper;
