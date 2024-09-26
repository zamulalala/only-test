// Компонент счетчика категорий

import React from 'react';
import './../styles/CategoryCounter.scss';

interface CategoryCounterProps {
  currentCategory: number;
  totalCategories: number;
}

const CategoryCounter: React.FC<CategoryCounterProps> = ({ currentCategory, totalCategories }) => {
  return (
    <div className="category-counter">
      <span>{`0${currentCategory + 1}`}</span> / <span>{`0${totalCategories}`}</span>
    </div>
  );
};

export default CategoryCounter;
