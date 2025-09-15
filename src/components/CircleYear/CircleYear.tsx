import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './CircleYear.scss';

interface CircleYearProps {
  startYear: number;
  endYear: number;
}

const CircleYear = ({ startYear, endYear }: CircleYearProps) => {
  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const [prevValues, setPrevValues] = useState({ start: startYear, end: endYear });

  useEffect(() => {
    if (startYearRef.current && prevValues.start !== startYear) {
      startYearRef.current.innerText = prevValues.start.toString();

      gsap.to(startYearRef.current, {
        duration: 1.5,
        innerText: startYear,
        ease: 'power2.out',
        snap: { innerText: 1 },
      });
    }

    if (endYearRef.current && prevValues.end !== endYear) {
      endYearRef.current.innerText = prevValues.end.toString();

      gsap.to(endYearRef.current, {
        duration: 1.5,
        innerText: endYear,
        ease: 'power2.out',
        snap: { innerText: 1 },
      });
    }
    setPrevValues({ start: startYear, end: endYear });
  }, [startYear, endYear, prevValues.start, prevValues.end]);

  return (
    <div className="circle-date">
      <div ref={startYearRef} className="circle-date--start">
        {startYear}
      </div>
      <div ref={endYearRef} className="circle-date--end">
        {endYear}
      </div>
    </div>
  );
};

export default CircleYear;
