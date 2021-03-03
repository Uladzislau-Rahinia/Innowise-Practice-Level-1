import { React, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import dayConfig from "./dayConfig";
import monthConfig from "./monthConfig";
import Carousel from "../Carousel";
import { CalendarContainer, CalendarItem, Markers } from "./styles";

const Calendar = (props) => {
  const calendarRef = useRef();
  const [blockWidth, setBlockWidth] = useState(768);
  const [maxElementsShown, setMaxElementsShown] = useState(30);

  useEffect(() => {
    setBlockWidth(calendarRef.current.offsetWidth);
  }, []);

  const show = Math.round(blockWidth / 100);

  const generateCalendarItems = () => {
    const calendarItems = [];
    const date = new Date(Date.now());

    let isChosen = false;

    for (let i = 0; i < maxElementsShown; i++) {
      let hasFinished = false;
      let hasUnfinished = false;

      if (format(date, "yyyy-MM-dd") === props.chosenDay) isChosen = true;
      else isChosen = false;

      if (props.userData && props.userData[format(date, "yyyy-MM-dd")]) {
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
            <div className="unfinished" />
            <div className="finished" />
          </Markers>
        </CalendarItem>
      );

      date.setDate(date.getDate() + 1);
    }

    return calendarItems;
  };

  const calendarItems = useMemo(generateCalendarItems, [
    maxElementsShown,
    props.chosenDay,
    props.userData,
  ]);

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
