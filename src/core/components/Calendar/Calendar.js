import {
  React, useEffect, useMemo, useRef, useState,
} from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import dayConfig from './dayConfig';
import monthConfig from './monthConfig';
import Carousel from '../Carousel';
import { CalendarContainer, CalendarItem, Markers } from './styles';

const Calendar = (props) => {
  const { userData, chosenDay, handleChoosingDay } = props;

  const calendarRef = useRef();
  const [blockWidth, setBlockWidth] = useState(768);
  const [maxElementsShown, setMaxElementsShown] = useState(30);

  useEffect(() => {
    setBlockWidth(calendarRef.current.offsetWidth);
  }, []);

  const show = Math.round(blockWidth / 100);

  const generateCalendarItems = () => {
    const items = new Array(maxElementsShown);
    items.fill(undefined);

    const date = new Date(Date.now());

    let isChosen = false;

    const calendarItems = items.map((item, index) => {
      let hasFinished = false;
      let hasUnfinished = false;

      if (index > 0) {
        date.setDate(date.getDate() + 1);
      }

      if (format(date, 'yyyy-MM-dd') === chosenDay) isChosen = true;
      else isChosen = false;

      if (userData && userData[format(date, 'yyyy-MM-dd')]) {
        Object.entries(userData[format(date, 'yyyy-MM-dd')]).forEach(
          (value) => {
            if (value[1].status === true) hasFinished = true;
            else if (value[1].status === false) hasUnfinished = true;
          },
        );
      }

      return (
        <CalendarItem
          onClick={handleChoosingDay}
          isChosen={isChosen}
          id={format(date, 'yyyy-MM-dd')}
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
    });

    return calendarItems;
  };

  const calendarItems = useMemo(generateCalendarItems, [
    maxElementsShown,
    chosenDay,
    userData,
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

Calendar.propTypes = {
  chosenDay: PropTypes.string.isRequired,
  handleChoosingDay: PropTypes.func.isRequired,

  // eslint-disable-next-line react/require-default-props
  userData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Calendar;
