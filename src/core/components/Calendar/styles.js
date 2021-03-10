import styled from 'styled-components';

export const CalendarContainer = styled.div`
max-width: 768px;
width: 100%;
height: 200px;
 solid red;
margin-bottom: 20px;
margin-top: 20px;
display: flex;
flex-direction: column;
justify-content: space-evenly;

& > span {
  margin-left: 50px;
  font-size: 20px;
  font-weight: bold;
}
`;

export const CalendarItem = styled.div`
  width: 50px;
  height: 90px;
  margin: 10px;
  .content {
    height: 70px;
    border: 2px solid ${(props) => (props.isChosen ? 'orange' : 'lightgray')};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    cursor: pointer;
  }
  .day,
  .month {
    color: ${(props) => (props.isChosen ? 'orange' : 'gray')};
  }
  .month {
    font-size: 13px;
  }
  ${(props) => (props.isChosen ? 'color: orange;' : '')}
`;

export const Markers = styled.div`
  height: 20px;
  width: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > * {
    width: 10px;
    height: 10px;
    border: 1px solid orange;
    border-radius: 50%;
  }

  .finished {
    background-color: orange;
    display: ${(props) => (props.hasFinished ? 'block' : 'none')};
  }

  .unfinished {
    display: ${(props) => (props.hasUnfinished ? 'block' : 'none')};
  }
`;
