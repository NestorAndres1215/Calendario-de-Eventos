import React from 'react';

const Day = ({ day, hasEvent, onClick }) => {
  return (
    <div className={`day ${hasEvent ? 'has-event' : ''}`} onClick={onClick}>
      <span>{day}</span>
    </div>
  );
};

export default Day;
