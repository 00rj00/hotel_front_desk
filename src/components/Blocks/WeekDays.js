import React from "react";
import { isSameDay, format } from "date-fns";

const WeekDays = ({ day, currentDate, availableRooms, color }) => {
  console.log(availableRooms);
  
  return (
    <div
      className={`col-span-1 p-2 text-center border-b  ${
        isSameDay(day, currentDate) ? "bg-gray-200" : ""
      }`}
    >
      <div className="font-semibold">{format(day, "dd")}</div>
      <div>{format(day, "EEEE")}</div>
      <div className="flex justify-center items-center">
        <div
          className={`w-7 h-7 flex items-center justify-center font-semibold ${color}`}
        >
          {availableRooms}
        </div>
      </div>
    </div>
  );
}

export default WeekDays;
