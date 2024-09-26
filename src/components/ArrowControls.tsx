import React from 'react';
import { ReactComponent as LeftArrow } from './../assets/arr.svg';
import { ReactComponent as RightArrow } from './../assets/arr.svg';
import { ReactComponent as LeftArrowMobile } from './../assets/arr_mob.svg';
import { ReactComponent as RightArrowMobile } from './../assets/arr_mob.svg';
import './../styles/ArrowControls.scss';

interface ArrowControlsProps {
  onPrev: () => void;
  onNext: () => void;
  currentCategory: number;
  totalCategories: number;
  isMobile: boolean; // Добавляем isMobile в пропсы
}

const ArrowControls: React.FC<ArrowControlsProps> = ({ onPrev, onNext, currentCategory, totalCategories, isMobile }) => {
  const isPrevDisabled = currentCategory === 0;
  const isNextDisabled = currentCategory === totalCategories - 1;

  return (
    <div className="arrow-controls">
      <button 
        onClick={onPrev} 
        disabled={isPrevDisabled}
        className={isPrevDisabled ? 'disabled' : ''}
      >
        {isMobile ? <LeftArrowMobile /> : <LeftArrow />}
      </button>
      <button 
        onClick={onNext} 
        disabled={isNextDisabled}
        className={isNextDisabled ? 'disabled' : ''}
      >
        {isMobile ? <RightArrowMobile /> : <RightArrow />}
      </button>
    </div>
  );
};

export default ArrowControls;
