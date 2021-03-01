import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayConfig from "./dayConfig";
import monthConfig from "./monthConfig";
import Carousel from "../Carousel";
import { format } from "date-fns";

const CalendarContainer = styled.div`
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

const CalendarItem = styled.div`
  width: 50px;
  height: 90px;
  margin: 10px;
  .content {
    height: 70px;
    border: 2px solid ${(props) => (props.isChosen ? "orange" : "lightgray")};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    cursor: pointer;
  }
  .day,
  .month {
    color: ${(props) => (props.isChosen ? "orange" : "gray")};
  }
  .month {
    font-size: 13px;
  }
  ${(props) => (props.isChosen ? "color: orange;" : "")}
`;

const Markers = styled.div`
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
    display: ${(props) => (props.hasFinished ? "block" : "none")};
  }

  .unfinished {
    display: ${(props) => (props.hasUnfinished ? "block" : "none")};
  }
`;

const Calendar = (props) => {
  let calendarItems = [];
  const calendarRef = useRef();
  const [blockWidth, setBlockWidth] = useState(768);
  const [maxElementsShown, setMaxElementsShown] = useState(30);
  useEffect(() => {
    setBlockWidth(calendarRef.current.offsetWidth);
  }, []);
  let show = Math.round(blockWidth / 100);
  console.log("SHOW", show);
  let date = new Date(Date.now());
  console.log(props.chosenDay);
  let isChosen = false;
  for (let i = 0; i < maxElementsShown; i++) {
    let hasFinished = false;
    let hasUnfinished = false;

    if (format(date, "yyyy-MM-dd") === props.chosenDay) isChosen = true;
    else isChosen = false;
    if (props.userData[format(date, "yyyy-MM-dd")]) {
      Object.entries(props.userData[format(date, "yyyy-MM-dd")]).find(
        (value) => {
          if (value[1].status === true) hasFinished = true;
          else if (value[1].status === false) hasUnfinished = true;
        }
      );
    }
    calendarItems.push(
      <CalendarItem
        onClick={props.handleChoosingDay}
        isChosen={isChosen}
        id={format(date, "yyyy-MM-dd")}
      >
        <div className="content">
          <div className="day">{dayConfig[date.getDay()]}</div>
          <div className="month">{monthConfig[date.getMonth()]}</div>
          <div className="date">{date.getDate()}</div>
        </div>
        <Markers hasFinished={hasFinished} hasUnfinished={hasUnfinished}>
          <div className="unfinished"></div>
          <div className="finished"></div>
        </Markers>
      </CalendarItem>
    );
    date.setDate(date.getDate() + 1);
  }
  return (
    <CalendarContainer ref={calendarRef}>
      <span>Calendar</span>
      <Carousel
        maxElementsShown={maxElementsShown}
        setMaxElementsShown={setMaxElementsShown}
        show={show}
      >
        {calendarItems}
      </Carousel>
    </CalendarContainer>
  );
};

export default Calendar;
