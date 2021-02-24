import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayConfig from "./dayConfig";
import Carousel from "../Carousel";
import { format } from "date-fns";

const CalendarContainer = styled.div`
  max-width: 768px;
  width: 100%;
  height: 200px;
  border: 1px solid red;
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

const CalendarItem = styled.div`
  width: 50px;
  height: 70px;
  border: 2px solid ${props=>props.isChosen? "orange" : "gray"};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  .day {
    color: ${props=>props.isChosen? "orange" : "gray"};
  }
  ${props=>props.isChosen? "color: orange;" : ""}
`;

const Calendar = (props) => {
  let calendarItems = [];
  const calendarRef = useRef();
  const [blockWidth, setBlockWidth] = useState(768);
  useEffect(() => {
    setBlockWidth(calendarRef.current.offsetWidth);
  }, []);
  let show = Math.round(blockWidth / 100);
  console.log("SHOW", show);
  let date = new Date(Date.now());
  console.log(props.chosenDay);
  let isChosen = false;
  for (let i = 0; i < 30; i++) {
    if(format(date, "yyyy-MM-dd") === props.chosenDay) isChosen = true;
    else isChosen = false;
    calendarItems.push(
      <CalendarItem onClick={props.handleChoosingDay} isChosen={isChosen} id={format(date, "yyyy-MM-dd")}>
        <span className="day">{dayConfig[date.getDay()]}</span>
        <span className="date">{date.getDate()}</span>
      </CalendarItem>
    );
    date.setDate(date.getDate() + 1);
  }
  return (
    <CalendarContainer ref={calendarRef}>
      <span>Calendar</span>
      <Carousel show={show}>{calendarItems}</Carousel>
    </CalendarContainer>
  );
};

export default Calendar;
