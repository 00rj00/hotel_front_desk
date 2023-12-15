import React, { useState } from 'react';
import DateNavigation from '../Blocks/DateNavigation';
import { addDays, format, isSameDay, setMonth, setYear } from 'date-fns';

const FrontDesk = () => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);

  const startDate = currentDate.getDay() === 0 ? currentDate : addDays(currentDate, -currentDate.getDay());
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const changeDate = (days) => {
    setCurrentDate((prevDate) => {
      const newDate = addDays(prevDate, days);
      setMonth(newDate, newDate.getMonth());
      setYear(newDate, newDate.getFullYear());
      return newDate;
    });
  };

  const changeMonth = (event) => {
    setCurrentDate((prevDate) => setMonth(prevDate, event.target.value));
  };

  const changeYear = (event) => {
    setCurrentDate((prevDate) => setYear(prevDate, event.target.value));
  };

  return (
    <div className="flex-grow bg-white p-5 rounded shadow">
      <h2 className="text-2xl mb-5">Front Desk</h2>
      <DateNavigation
        currentDate={currentDate}
        changeDate={changeDate}
        changeMonth={changeMonth}
        changeYear={changeYear} />
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`col-span-1 p-2 border border-gray-300 text-center ${isSameDay(day, currentDate) ? 'bg-gray-200' : ''}`}
          >
            <div className="font-bold">{format(day, 'dd')}</div>
            <div>{format(day, 'EEEE')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontDesk;
