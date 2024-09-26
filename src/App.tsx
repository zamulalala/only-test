import React, { useEffect, useState } from "react";
import Ellipse from "./components/Ellipse";
import CategorySlider from "./components/CategorySlider";
import YearDisplay from "./components/YearDisplay";
import CategoryCounter from "./components/CategoryCounter";
import ArrowControls from "./components/ArrowControls";
import Breadcrumbs from "./components/Breadcrumbs";
import { fetchHistoricalData } from "./utils/api";
import "./styles/App.scss";

interface Event {
  year: number;
  description: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  // Следим за изменениями ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchHistoricalData().then((data: any) => {
      setData(data);
    });
  }, []);

  const handleNextCategory = () => {
    if (activeCategory < data.length - 1) {
      setActiveCategory((prev) => prev + 1);
    }
  };

  const handlePrevCategory = () => {
    if (activeCategory > 0) {
      setActiveCategory((prev) => prev - 1);
    }
  };

  const activeData = data[activeCategory];

  return (
    <div className="container">
      <h1 className="pt-sans-bold">Исторические даты</h1>
      <div className="decorative-stroke"></div>

      <Ellipse
        categories={data.map((category) => category.category)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {activeData && (
        <>
          {/* Десктопная версия */}
          {!isMobile && (
            <>
              <YearDisplay
                startYear={activeData.events[0].year}
                endYear={activeData.events[activeData.events.length - 1].year}
              />
              <div className="controls-container-desktop">
                <CategoryCounter
                  currentCategory={activeCategory}
                  totalCategories={data.length}
                />
                <ArrowControls
                  onPrev={handlePrevCategory}
                  onNext={handleNextCategory}
                  currentCategory={activeCategory}
                  totalCategories={data.length}
                  isMobile={isMobile}
                />
              </div>
              <CategorySlider events={activeData.events} isMobile={isMobile} />
            </>
          )}

          {/* Мобильная версия */}
          {isMobile && (
            <>
              <YearDisplay
                startYear={activeData.events[0].year}
                endYear={activeData.events[activeData.events.length - 1].year}
              />
              <div className="mobile-divider"></div>
              <CategorySlider events={activeData.events} isMobile={isMobile} />
              <div className="controls-container-mobile">
                <div className="controls-container">
                  <CategoryCounter
                    currentCategory={activeCategory}
                    totalCategories={data.length}
                  />
                  <ArrowControls
                    onPrev={handlePrevCategory}
                    onNext={handleNextCategory}
                    currentCategory={activeCategory}
                    totalCategories={data.length}
                    isMobile={isMobile}
                  />
                </div>
                <div className="breadcrumbs-container">
                  <Breadcrumbs
                    categories={data.map((category) => category.category)}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
