import React, { useEffect, useRef, useState } from 'react';
import { TimelineItem } from '../../data/mockTimeLineData';
import './Circle.scss';
import { gsap } from 'gsap';
import CirclePoint from '../CirclePoint/CirclePoint';
import DescriptionSwiper from '../DescriptionSwiper/DescriptionSwiper';
import CircleYear from '../CircleYear/CircleYear';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

interface CircleProps {
  timelineData: TimelineItem[];
}

export const Circle: React.FC<CircleProps> = ({ timelineData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const angleStep = 360 / timelineData.length;
  const radius = 265;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && !isInitialized) {
      const initialRotation = 300 - activeIndex * angleStep;
      gsap.set('.circle', { rotation: initialRotation });
      gsap.set('.circle-point, .circle-date', { rotation: -initialRotation });
      setIsInitialized(true);
    }
  }, [isMobile, isInitialized, activeIndex, angleStep]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    if (!isMobile) {
      const targetRotation = 300 - index * angleStep;

      gsap.to('.circle', {
        rotation: targetRotation,
        duration: 1,
        ease: 'power2.out',
        transformOrigin: 'center center',
      });
      gsap.to('.circle-point, .circle-date', {
        rotation: -targetRotation,
        duration: 1,
        ease: 'power2.out',
        transformOrigin: 'center center',
      });
    }
  };

  return (
    <div className="circle-timeline">
      {isMobile ? (
        <>
          <CircleYear startYear={timelineData[activeIndex].start} endYear={timelineData[activeIndex].end} />
          <h2 className="circle-title">{timelineData[activeIndex].title}</h2>
          <DescriptionSwiper activeItem={timelineData[activeIndex]} />
          <div className="navigation-wrapper">
            <NavigationButtons
              activeIndex={activeIndex}
              totalItems={timelineData.length}
              onNext={() => handleItemClick(activeIndex + 1)}
              onPrev={() => handleItemClick(activeIndex - 1)}
              onPointClick={handleItemClick}
            />
          </div>
        </>
      ) : (
        <>
          <div className="circle-container" ref={circleRef}>
            <div className="circle">
              <CircleYear startYear={timelineData[activeIndex].start} endYear={timelineData[activeIndex].end} />
              {timelineData.map((item, index) => {
                const angle = index * angleStep;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return <CirclePoint key={item.id} item={item} index={index} activeIndex={activeIndex} x={x} y={y} onClick={handleItemClick} />;
              })}
            </div>
          </div>
          <div className="navigation-wrapper">
            <NavigationButtons
              activeIndex={activeIndex}
              totalItems={timelineData.length}
              onNext={() => handleItemClick(activeIndex + 1)}
              onPrev={() => handleItemClick(activeIndex - 1)}
            />
          </div>
          <DescriptionSwiper activeItem={timelineData[activeIndex]} />
        </>
      )}
    </div>
  );
};

export default Circle;
