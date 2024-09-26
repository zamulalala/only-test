import React, { useEffect, useState } from 'react';
import './../styles/YearDisplay.scss';

interface YearDisplayProps {
  startYear: number;
  endYear: number;
}

const YearDisplay: React.FC<YearDisplayProps> = ({ startYear, endYear }) => {
  const [currentStartYear, setCurrentStartYear] = useState(startYear);
  const [currentEndYear, setCurrentEndYear] = useState(endYear);

  // Функция для вычисления промежуточных значений (до 3 значений)
  const calculateIntermediateYears = (current: number, target: number): number[] => {
    const difference = Math.abs(target - current);
    const years: number[] = [];

    // Если разница меньше или равна 3, используем все доступные года
    if (difference <= 3) {
      if (current < target) {
        for (let i = current + 1; i <= target; i++) {
          years.push(i); // Промежуточные значения для увеличения
        }
      } else {
        for (let i = current - 1; i >= target; i--) {
          years.push(i); // Промежуточные значения для уменьшения
        }
      }
    } else {
      // Если разница больше 3, делим ее на 3 шага
      const step = Math.floor(difference / 3);
      if (current < target) {
        years.push(current + step); // Промежуточный год 1
        years.push(current + 2 * step); // Промежуточный год 2
      } else {
        years.push(current - step); // Промежуточный год 1
        years.push(current - 2 * step); // Промежуточный год 2
      }
      years.push(target); // Конечный год
    }

    return years;
  };

  useEffect(() => {
    // Промежуточные значения для начального и конечного годов
    const startYears = calculateIntermediateYears(currentStartYear, startYear);
    const endYears = calculateIntermediateYears(currentEndYear, endYear);

    const animateYears = (years: number[], setYear: React.Dispatch<React.SetStateAction<number>>) => {
      let index = 0;
      const totalSteps = years.length;

      const interval = setInterval(() => {
        setYear(years[index]);
        index++;

        if (index >= totalSteps) {
          clearInterval(interval); // Останавливаем анимацию
        }
      }, 100); // Начальный интервал для анимации с плавным замедлением
    };

    // Анимация для начального года
    if (currentStartYear !== startYear) {
      animateYears(startYears, setCurrentStartYear);
    }

    // Анимация для конечного года
    if (currentEndYear !== endYear) {
      animateYears(endYears, setCurrentEndYear);
    }
  }, [startYear, endYear, currentStartYear, currentEndYear]);

  return (
    <div className="year-display pt-sans-bold">
      <span className="start-year">{currentStartYear}</span>
      <span className="end-year">{currentEndYear}</span>
    </div>
  );
};

export default YearDisplay;
