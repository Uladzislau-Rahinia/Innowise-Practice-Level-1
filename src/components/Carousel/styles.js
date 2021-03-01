import styled from "styled-components";

export const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
`;

export const CarouselContentWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 75%;
  height: 100%;
`;

export const CarouselContent = styled.div`
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

export const CarouselButton = styled.button`
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

export const CarouselButtonLeft = styled(CarouselButton)`
  left: 8px;
`;

export const CarouselButtonRight = styled(CarouselButton)`
  right: 8px;
`;
