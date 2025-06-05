import React from 'react';
import Day from './Day';
import '../styles/calendar.css';

const Calendar = ({ daysInMonth, firstDay, events, onDayClick }) => {
  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="day empty" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const hasEvent = events[d] && events[d].length > 0;
    cells.push(
      <Day key={d} day={d} hasEvent={hasEvent} onClick={() => onDayClick(d)} />
    );
  }

  return <div className="calendar-grid">{cells}</div>;
};

export default Calendar;
