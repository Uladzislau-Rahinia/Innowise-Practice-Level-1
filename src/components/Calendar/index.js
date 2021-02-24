import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayConfig from "./dayConfig";
import Carousel from "../Carousel";

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
  border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  .day {
    color: grey;
  }
`;

const Calendar = () => {
  let calendarItems = [];
  const calendarRef = useRef();
  const [blockWidth, setBlockWidth] = useState(768);
  useEffect(() => {
    setBlockWidth(calendarRef.current.offsetWidth);
  }, []);
  let show = Math.round(blockWidth / 100);
  console.log("SHOW", show);
  let date = new Date(Date.now());
  for (let i = 0; i < 30; i++) {
    calendarItems.push(
      <CalendarItem>
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
