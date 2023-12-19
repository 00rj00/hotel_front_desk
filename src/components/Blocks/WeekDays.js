import React from 'react';
import { format } from 'date-fns';
import { isSameDay } from 'date-fns';

const WeekDays = ({ day, currentDate, availableRooms }) => (
  <div
    className={`col-span-1 p-2 text-center border-b ${isSameDay(day, currentDate) ? 'bg-gray-200' : ''}`}
  >
    <div className="font-semibold">{format(day, 'dd')}</div>
    <div>{format(day, 'EEEE')}</div>
    <div className='font-bold'>{availableRooms}</div>
  </div>
);

export default WeekDays;