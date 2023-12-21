import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { format, setMonth, setYear } from "date-fns";

const ArrowButton = ({ direction, changeDate }) => (
  <button
    className="hover:bg-gray-200 p-2 rounded mr-4 transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110"
    onClick={() => changeDate(direction)}
  >
    {direction === -1 ? <IoIosArrowBack /> : <IoIosArrowForward />}
  </button>
);

const DateNavigation = ({
  currentDate,
  changeDate,
  changeMonth,
  changeYear,
}) => {
  const commonClasses =
    "ml-4 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110";

  return (
    <div className="flex items-center justify-start mb-4">
      <span className="mr-4 w-32">{format(currentDate, "dd/MM EEEE")}</span>
      <ArrowButton direction={-1} changeDate={changeDate} />
      <ArrowButton direction={1} changeDate={changeDate} />
      <select
        className={commonClasses}
        value={currentDate.getMonth()}
        onChange={changeMonth}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {format(setMonth(new Date(), i), "MMMM")}
          </option>
        ))}
      </select>
      <select
        className={commonClasses}
        value={currentDate.getFullYear()}
        onChange={changeYear}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 2023}>
            {format(setYear(new Date(), i + 2023), "yyyy")}
          </option>
        ))}
      </select>
      <div className="flex items-center ml-4">
        <div className="w-4 h-4 bg-green-400 mr-2"></div>
        <div>Available</div>
      </div>
      <div className="flex items-center ml-4">
        <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
        <div>Filling Fast</div>
      </div>
      <div className="flex items-center ml-4">
        <div className="w-4 h-4 bg-red-400 mr-2"></div>
        <div>Low Availability</div>
      </div>
    </div>
  );
};

export default DateNavigation;
