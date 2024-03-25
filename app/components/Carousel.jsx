import { movieImagePath } from '@/libs/movieImagePath';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SwiperSlide, Swiper } from 'swiper/react';

const Carousel = ({ data }) => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const arrowDiv =
    'flex h-8 w-8 items-center justify-center bg-white rounded-full';

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    data && (
      <div className="relative">
        <Swiper
          ref={sliderRef}
          breakpoints={{
            // when window width is >= 320px
            400: {
              slidesPerView: 2,
              spaceBetween: 5,
              slidesPerGroup: 2,
            },
            800: {
              slidesPerView: 3,
              spaceBetween: 5,
              slidesPerGroup: 3,
            },
            // when window width is >= 480px
            1000: {
              slidesPerView: 5,
              spaceBetween: 10,
              slidesPerGroup: 5,
            },
            // when window width is >= 640px
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
              slidesPerGroup: 6,
            },
          }}
        >
          {data.map((movie) => (
            <SwiperSlide
              onClick={() => {
                router.push(`/movies/${movie.id}`);
              }}
              key={movie.id}
              className="cursor-pointer overflow-hidden rounded-md border-2 border-transparent
                object-cover object-center transition-colors hover:border-white"
            >
              <img
                className="h-full w-full transition-transform hover:scale-105"
                src={movieImagePath(movie.poster_path)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={handlePrev}
          className="custom-nav-btn absolute left-0 top-0 z-10 h-full w-16 cursor-pointer pl-2"
          style={{
            background:
              'linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent)',
          }}
        >
          <div className={clsx(arrowDiv)}>
            <FaChevronLeft size={15} fill="black" />
          </div>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 z-10 flex h-full w-16 cursor-pointer items-center
            justify-end pr-2"
          style={{
            background:
              'linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent)',
          }}
        >
          <div className={arrowDiv}>
            <FaChevronRight size={15} fill="black" />
          </div>
        </button>
      </div>
    )
  );
};
export default Carousel;
