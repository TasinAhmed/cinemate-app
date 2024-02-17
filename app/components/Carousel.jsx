import { useEffect, useRef } from 'react';
import _ from 'lodash';

const Carousel = ({ data }) => {
  const width = 185;

  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;
    const resizeObserver = new ResizeObserver(
      _.debounce(() => {
        // Do what you want to do when the size of the element changes
        console.log('resized!', elementRef?.current?.offsetWidth);
      }, 500)
    );
    resizeObserver.observe(elementRef.current);
    return () => {
      resizeObserver.disconnect();
    }; // clean up
  }, []);

  return (
    <div ref={elementRef} className="flex overflow-x-scroll scroll-smooth">
      {data.map(({ id, poster_path: posterPath }) => (
        <div key={id} className={`aspect-[185/278] w-[${width}px]`}>
          <img
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/w185${posterPath}`}
          />
        </div>
      ))}
    </div>
  );
};
export default Carousel;
