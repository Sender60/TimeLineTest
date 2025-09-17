import React from 'react';
import './NavigationButtons.scss';

interface NavigationButtonsProps {
  activeIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
  onPointClick?: (index: number) => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ activeIndex, totalItems, onNext, onPrev, onPointClick }) => {
  const currentNumber = (activeIndex + 1).toString().padStart(2, '0');
  const totalNumber = totalItems.toString().padStart(2, '0');
  const dateText = `${currentNumber}/${totalNumber}`;

  return (
    <div className="navigation-buttons">
      <div className="navigation-buttons__main-controls">
        <span className="navigation-buttons__date">{`${dateText}`}</span>
        <div className="navigation-buttons__controls">
          <button className="navigation-buttons__button navigation-buttons__button--prev" onClick={onPrev} disabled={activeIndex === 0}>
            ←
          </button>
          <button className="navigation-buttons__button navigation-buttons__button--next" onClick={onNext} disabled={activeIndex === totalItems - 1}>
            →
          </button>
        </div>
      </div>

      <div className="navigation-buttons__points">
        {Array.from({ length: totalItems }, (_, index) => (
          <button
            key={index}
            className={`navigation-buttons__point ${index === activeIndex ? 'navigation-buttons__point--active' : ''}`}
            onClick={() => onPointClick && onPointClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationButtons;
