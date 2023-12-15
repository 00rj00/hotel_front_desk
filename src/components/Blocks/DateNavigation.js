import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { format, setMonth, setYear } from 'date-fns';

const DateNavigation = ({ currentDate, changeDate, changeMonth, changeYear }) => {
  return (
    <div className="flex items-center justify-start mb-4">
      <span className="mr-4 w-32">{format(currentDate, 'dd/MM EEEE')}</span>
      <button className="hover:bg-gray-200 p-2 rounded mr-4" onClick={() => changeDate(-1)}>
        <IoIosArrowBack />
      </button>
      <button className="hover:bg-gray-200 p-2 rounded mr-4" onClick={() => changeDate(1)}>
        <IoIosArrowForward />
      </button>
      <select className="ml-4" value={currentDate.getMonth()} onChange={changeMonth}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {format(setMonth(new Date(), i), 'MMMM')}
          </option>
        ))}
      </select>
      <select className="ml-4" value={currentDate.getFullYear()} onChange={changeYear}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 2023}>
            {format(setYear(new Date(), i + 2023), 'yyyy')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateNavigation;