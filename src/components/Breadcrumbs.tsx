import React from 'react';
import './../styles/Breadcrumbs.scss';

interface BreadcrumbsProps {
  categories: string[]; // Массив категорий
  activeCategory: number; // Индекс активной категории
  onSelectCategory: (id: number) => void; // Функция для выбора категории
  isMobile: boolean; // Индикация мобильного устройства
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ categories, activeCategory, onSelectCategory, isMobile }) => {
  if (!isMobile) return null; // Показываем компонент только на мобильных устройствах

  return (
    <div className="breadcrumbs">
      {categories.map((_, index) => ( // Используем только индекс, так как точки не зависят от названия
        <span
          key={index}
          className={`breadcrumb ${activeCategory === index ? 'active' : ''}`} // Активная точка
          onClick={() => onSelectCategory(index)} // Переход к выбранной категории
        >
          {/* Точка вместо текста */}
          <span className="dot"></span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
