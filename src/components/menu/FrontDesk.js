import React, { useState, useEffect } from 'react';
import DateNavigation from '../Blocks/DateNavigation';
import RoomDropdown from '../Blocks/RoomDropDown';
import { addDays, format, isSameDay, setMonth, setYear,isWithinInterval, differenceInHours } from 'date-fns';

const FrontDesk = () => {
  const initialDate = new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [rooms, setRooms] = useState([]); 

  const startDate = currentDate.getDay() === 0 ? currentDate : addDays(currentDate, -currentDate.getDay());
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  useEffect(() => {
  const usersData = [
    {
  id: 1,
  name: 'Room 1',
  events: [
    { start: '2023-12-20T05:00:00', end: '2023-12-21T20:00:00', description: 'John Doe' }
  ]
},
{
  id: 2,
  name: 'Room 2',
  events: [
    { start: '2023-12-22T05:00:00', end: '2023-12-23T12:00:00', description: 'Jane Doe' }
  ]
},
{
  id: 3,
  name: 'Room 3',
  events: [
    { start: '2023-12-20T12:00:00', end: '2023-12-22T17:00:00', description: 'Tony' }
  ]
}
  ];

  setRooms(usersData);
}, []);

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
        changeYear={changeYear}/>
      <div className="grid grid-cols-8">  
        <div className="col-span-1 p-2 text-center font-semibold ">Rooms</div>  
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`col-span-1 p-2 text-center   ${isSameDay(day, currentDate) ? 'bg-gray-200' : ''}`}
          >
            <div className="font-bold">{format(day, 'dd')}</div>
            <div>{format(day, 'EEEE')}</div>
          </div>
        ))}
        {rooms.map(room => (
          <React.Fragment key={room.id}>
            <div className="col-span-1 p-2 text-center ">{room.name}</div>
            <div className="col-span-7 p-2 text-center relative">
              {room.events.map((event, index) => {
                const eventStart = new Date(event.start);
                const eventEnd = new Date(event.end);
                const startDayOfWeek = eventStart.getDay();
                const endDayOfWeek = eventEnd.getDay();
                const startPercentage = ((startDayOfWeek * 24 + eventStart.getHours()) * 60 + eventStart.getMinutes()) / (7 * 24 * 60) * 100;
                const endPercentage = ((endDayOfWeek * 24 + eventEnd.getHours()) * 60 + eventEnd.getMinutes()) / (7 * 24 * 60) * 100;
                return (
                  <div key={index} className='bg-blue-400 rounded absolute' style={{ left: `${startPercentage}%`, right: `${100 - endPercentage}%` }}>{ event.description}</div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
      
    </div>
  );
};


export default FrontDesk;