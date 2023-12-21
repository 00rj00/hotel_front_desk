import React, { useState } from "react";
import DateNavigation from "../Blocks/DateNavigation";
import roomsData from "../data/roomsData";
import { IoIosArrowForward } from "react-icons/io";
import {
  addDays,
  setMonth,
  setYear,
  startOfDay,
  isWithinInterval,
  differenceInHours,
  isSameDay,
} from "date-fns";
import WeekDays from "../Blocks/WeekDays";
import EventBlocks from "../Blocks/EventBlocks";

const FrontDesk = () => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedRoomType, setSelectedRoomType] = useState("Standard");

  const startDate =
    currentDate.getDay() === 0
      ? currentDate
      : addDays(currentDate, -currentDate.getDay());
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const changeDate = (days) => {
    setCurrentDate((prevDate) => {
      const newDate = addDays(prevDate, days);
      return newDate;
    });
  };

  const changeMonth = (event) => {
    setCurrentDate((prevDate) => setMonth(prevDate, event.target.value));
  };

  const changeYear = (event) => {
    setCurrentDate((prevDate) => setYear(prevDate, event.target.value));
  };

  const calculateAvailableRooms = (day, roomType) => {
    let availableRoomsCount = 0;

    roomsData
      .filter((room) => room.type === roomType)
      .forEach((roomType) => {
        roomType.rooms.forEach((room) => {
          const isRoomAvailable = room.events.every((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);

            // If the event starts on the current day, the room is considered unavailable
            if (isSameDay(day, eventStart)) {
              return false;
            }

            // If the event ends on the current day and lasts more than 12 hours on that day, the room is considered unavailable
            if (
              isSameDay(day, eventEnd) &&
              differenceInHours(eventEnd, startOfDay(eventEnd)) > 12
            ) {
              return false;
            }

            // If the current day is between the start and end of the event, the room is considered unavailable
            if (isWithinInterval(day, { start: eventStart, end: eventEnd })) {
              return false;
            }

            // If the current day is not within the event interval, the room is considered available
            return true;
          });

          if (isRoomAvailable) {
            availableRoomsCount++;
          }
        });
      });

    return availableRoomsCount;
  };

 const calculateTotalRooms = (roomType) => {
   const roomTypeData = roomsData.find(
     (roomData) => roomData.type === roomType
   );
   return roomTypeData ? roomTypeData.rooms.length : 0;
  };  
  
  const calculateAvailableRoomsColor = (availableRooms, totalRoomsCount) => {
    if (availableRooms <= 0 || availableRooms === 1) {
      return "bg-red-400";
    } else if (availableRooms <= totalRoomsCount - 2) {
      return "bg-yellow-400";
    } else {
      return "bg-green-400";
    }
  };

  return (
    <div className="flex-grow bg-white p-5 rounded shadow">
      <h2 className="text-2xl mb-5">Front Desk</h2>
      <DateNavigation
        currentDate={currentDate}
        changeDate={changeDate}
        changeMonth={changeMonth}
        changeYear={changeYear}
      />
      <div className="grid grid-cols-8 border-b">
        <div className="col-span-1 p-2 text-center font-semibold border-b">
          Rooms
          <div className="mt-2 w-full p-4 border-gray-300 outline-none transition duration-500 ease-in-out hover:-translate-y-1">
            <div className="flex items-center justify-center">
              <IoIosArrowForward className="inline-block mr-2" />
              {selectedRoomType}
            </div>
          </div>
        </div>
        {daysOfWeek.map((day, index) => (
          <WeekDays
            key={index}
            day={day}
            currentDate={currentDate}
            availableRooms={calculateAvailableRooms(day, selectedRoomType)}
            totalRoomsCount={calculateTotalRooms(selectedRoomType)}
            color={calculateAvailableRoomsColor(
              calculateAvailableRooms(day, selectedRoomType),
              calculateTotalRooms(selectedRoomType)
            )}
          />
        ))}
        {roomsData
          .filter((roomType) => roomType.type === selectedRoomType)
          .map((roomType) =>
            roomType.rooms.map((room) => (
              <EventBlocks
                key={room.id}
                room={room}
                currentDate={currentDate}
              />
            ))
          )}
      </div>
      <div className="grid grid-cols-8 border-b mt-5">
        <div
          className="col-span-1 p-2 text-center font-semibold cursor-pointer mr-4 transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={() =>
            setSelectedRoomType(
              selectedRoomType === "Standard" ? "Deluxe" : "Standard"
            )
          }
        >
          <div className="flex items-center justify-center">
            <IoIosArrowForward className="inline-block mr-2" />
            {selectedRoomType === "Standard" ? "Deluxe" : "Standard"}
          </div>
        </div>
        {daysOfWeek.map((day, index) => {
          const availableRooms = calculateAvailableRooms(
            day,
            selectedRoomType === "Standard" ? "Deluxe" : "Standard"
          );
          const color = calculateAvailableRoomsColor(
            availableRooms,
            calculateTotalRooms(selectedRoomType === "Standard" ? "Deluxe" : "Standard")
          );

          return (
            <div
              key={index}
              className={
                "col-span-1 p-2 text-center flex items-center justify-center"
              }
            >
              <div
                className={`w-7 h-7 flex items-center justify-center font-bold ${color}`}
              >
                {availableRooms}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrontDesk;
