import { React, useState, useEffect } from "react";
import {
  CarouselWrapper,
  CarouselContainer,
  CarouselContentWrapper,
  CarouselContent,
  CarouselButtonLeft,
  CarouselButtonRight,
} from "./styles";

const Carousel = (props) => {
  const { children, show, setMaxElementsShown, maxElementsShown } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + show);
    }
    if (currentIndex < length - show * 2) {
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
            show={props.show}
          >
            {children.map((value, index) => {
              if (index >= currentIndex && index < currentIndex + show)
                return value;
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

export default Carousel;
