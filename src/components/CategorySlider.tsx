import React, { useState, useRef } from "react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./../styles/CategorySlider.scss";
import { ReactComponent as LeftArrow } from "./../assets/arr_slider.svg";
import { ReactComponent as RightArrow } from "./../assets/arr_slider.svg";

interface Event {
  year: number;
  description: string;
}

interface CategorySliderProps {
  events: Event[];
  isMobile: boolean;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ events, isMobile }) => {
  const [isBeginning, setIsBeginning] = useState(true); // Для контроля начала слайдера
  const [isEnd, setIsEnd] = useState(false); // Для контроля конца слайдера
  const swiperRef = useRef<SwiperClass | null>(null); // Для хранения ссылки на экземпляр Swiper

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(); // Переключение на предыдущий слайд
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Переключение на следующий слайд
    }
  };

  return (
    <div className="category-slider-container">
      {!isBeginning && ( // Левая стрелка отображается, если мы не на первом слайде
        <button className="slider-arrow left-arrow" onClick={handlePrev}>
          <LeftArrow style={{ transform: "rotate(180deg)" }} />
        </button>
      )}

      <Swiper
        modules={[Navigation]}
        spaceBetween={isMobile ? 20 : 80} // Меняем расстояние между карточками в зависимости от устройства
        slidesPerView={isMobile ? 1.5 : 3} // Показываем 1.5 карточки на мобильных устройствах и 3 на десктопе
        watchSlidesProgress={true} // Отслеживаем прогресс видимости слайдов
        onSwiper={(swiperInstance: SwiperClass) => {
          swiperRef.current = swiperInstance;
        }}
        onSlideChange={(swiper: SwiperClass) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onReachBeginning={() => setIsBeginning(true)} // Корректно обновляем состояние стрелок
        onReachEnd={() => setIsEnd(true)} // Корректно обновляем состояние стрелок
        onFromEdge={() => {
          setIsBeginning(false);
          setIsEnd(false);
        }}
        onProgress={(swiper: SwiperClass) => {
          if (isMobile) {
            swiper.slides.forEach((slide: HTMLElement, index: number) => {
              const progress = (swiper.slides[index] as any).progress;
              // Если это последний слайд и он полностью виден, делаем его непрозрачным
              const isLastSlide = index === swiper.slides.length - 1 && swiper.isEnd;
              slide.style.opacity = isLastSlide ? '1' : `${1 - Math.abs(progress) * 0.6}`;
            });
          } else {
            // Возвращаем прозрачность к 1 на десктопе
            swiper.slides.forEach((slide: HTMLElement) => {
              slide.style.opacity = '1';
            });
          }
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className="custom-slide">
            <div className="event-card">
              <h3 className="event-year bebas-neue-regular">{event.year}</h3>
              <p className="event-description">{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isEnd && ( // Правая стрелка отображается, если мы не на последнем слайде
        <button className="slider-arrow right-arrow" onClick={handleNext}>
          <RightArrow />
        </button>
      )}
    </div>
  );
};

export default CategorySlider;
