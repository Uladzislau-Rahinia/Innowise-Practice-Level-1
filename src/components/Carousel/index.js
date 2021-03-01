import { React, useState, useEffect } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const CarouselContentWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 75%;
  height: 100%;
`;

const CarouselContent = styled.div.attrs((props) => ({
  show: props.show,
}))`
  display: flex;
  justify-content: flex-start;
  transition: all 250ms linear;
  width: 100%;
  -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border: none;
  background-color: Transparent;
  cursor: pointer;
  color: gray;
  font-size: 30px;
  outline: none;
`;

const CarouselButtonLeft = styled(CarouselButton)`
  left: 8px;
`;

const CarouselButtonRight = styled(CarouselButton)`
  right: 8px;
`;

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
