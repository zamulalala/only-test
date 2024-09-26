// Временная имитация получения данных через API

import data from '../data/db.json';

export const fetchHistoricalData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.timePeriods);
    }, 1000); // Эмуляция задержки запроса
  });
};
