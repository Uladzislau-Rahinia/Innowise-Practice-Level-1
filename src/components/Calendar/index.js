import React from "react";
import styled from "styled-components";
import dayConfig from "./dayConfig";

const CalendarContainer = styled.div`
  max-width: 762px;
  width: 90%;
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

const CalendarItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100px;
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

  .day {
    color: grey;
  }
`;

const Calendar = () => {
  let calendarItems = [];
  let date = new Date(Date.now());
  for (let i = 0; i < 10; i++) {
    calendarItems.push(
      <CalendarItem>
        <span className="day">{dayConfig[date.getDay()]}</span>
        <span className="date">{date.getDate()}</span>
      </CalendarItem>
    );
    date.setDate(date.getDate() + 1);
  }
  return (
    <CalendarContainer>
      <span>Calendar</span>
      <CalendarItemContainer>{calendarItems}</CalendarItemContainer>
    </CalendarContainer>
  );
};

export default Calendar;
