import React from 'react';
import './CirclePoint.scss';

interface CirclePointProps {
  item: {
    id: number;
    title: string;
  };
  index: number;
  activeIndex: number;
  x: number;
  y: number;
  onClick: (index: number) => void;
}

const CirclePoint: React.FC<CirclePointProps> = ({ item, index, activeIndex, x, y, onClick }) => {
  const isActive = activeIndex === index;

  return (
    <div
      className={`circle-point ${isActive ? 'circle-point--active' : ''}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      onClick={() => onClick(index)}>
      <span className="point-id">{item.id}</span>
      <span className="point-title">{item.title}</span>
    </div>
  );
};

export default CirclePoint;
