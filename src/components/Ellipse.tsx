import React from 'react';
import './../styles/Ellipse.scss';

interface EllipseProps {
  categories: string[];
  activeCategory: number;
  onSelectCategory: (id: number) => void;
}

const Ellipse: React.FC<EllipseProps> = ({ categories, activeCategory, onSelectCategory }) => {
  const handleCategoryClick = (id: number) => {
    onSelectCategory(id);
  };

  const radius = 265; // Радиус окружности
  const angleStep = (2 * Math.PI) / categories.length; // Угол между точками в зависимости от количества категорий
  const angleShift = -Math.PI / 3; // Сдвиг угла на -60 градусов

  // Вычисляем угол для вращения
  const rotationAngle = -activeCategory * angleStep * (180 / Math.PI); // Угол в градусах

  return (
    <div
      className="ellipse"
      style={{
        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
        transition: 'transform 0.5s ease',
      }}
    >
      {categories.map((category, index) => {
        const angle = index * angleStep + angleShift; // Добавляем сдвиг угла -60 градусов
        const x = radius * Math.cos(angle); // X-координата
        const y = radius * Math.sin(angle); // Y-координата

        return (
          <div
            key={index}
            className={`category-point ${activeCategory === index ? 'active' : ''}`}
            style={{ transform: `translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)` }} // Позиционирование точки + отмена вращения для элементов внутри
            onClick={() => handleCategoryClick(index)}
          >
            <span style={{ transform: `rotate(0deg)` }}>{index + 1}</span> {/* Цифра всегда рендерится */}
            {activeCategory === index && (
              <span className="category-label pt-sans-bold">{category}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Ellipse;
