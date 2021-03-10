import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CarouselWrapper,
  CarouselContainer,
  CarouselContentWrapper,
  CarouselContent,
  CarouselButtonLeft,
  CarouselButtonRight,
} from './styles';

const Carousel = (props) => {
  const {
    children, show, setMaxElementsShown, maxElementsShown,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + show);
    }
    if (currentIndex >= length - show * 2) {
      setMaxElementsShown(maxElementsShown + 30);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - show);
    }
  };

  return (
    <CarouselContainer>
      <CarouselWrapper>
        {currentIndex > 0 && (
          <CarouselButtonLeft onClick={prev}>&lt;</CarouselButtonLeft>
        )}

        <CarouselContentWrapper>
          <CarouselContent
            // style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            show={show}
          >
            {children.filter((value, index) => {
              if (index >= currentIndex && index < currentIndex + show) { return true; }
              return false;
            })}
          </CarouselContent>
        </CarouselContentWrapper>

        {currentIndex < length - show && (
          <CarouselButtonRight onClick={next}>&gt;</CarouselButtonRight>
        )}
      </CarouselWrapper>
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  show: PropTypes.number.isRequired,
  maxElementsShown: PropTypes.number.isRequired,
  setMaxElementsShown: PropTypes.func.isRequired,
};

export default Carousel;
