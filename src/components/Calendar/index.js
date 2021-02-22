import React from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  max-width: 762px;
  width: 90%;
  height: 200px;
  border: 1px solid red;
  margin-bottom:20px;
  margin-top:20px;
`;

const Calendar = () => {
  return <CalendarContainer>Calendar</CalendarContainer>;
};

export default Calendar;
