import React from 'react';
import { startOfWeek,endOfWeek,isWithinInterval } from 'date-fns';

const EventBlocks = ({ room, currentDate }) => (
  <React.Fragment key={room.id}>
    <div className="col-span-1 p-2 text-center ">{room.name}</div>
    <div className="col-span-7 p-2 text-center relative">
      {room.events.filter(event => {
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);
                    const startOfWeekDate = startOfWeek(currentDate);
                    const endOfWeekDate = endOfWeek(currentDate);
                    return isWithinInterval(eventStart, { start: startOfWeekDate, end: endOfWeekDate }) ||
                        isWithinInterval(eventEnd, { start: startOfWeekDate, end: endOfWeekDate });
                }).map((event, index) => {
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);
                    const startDayOfWeek = eventStart.getDay();
                    const endDayOfWeek = eventEnd.getDay();
                    const startPercentage = ((startDayOfWeek * 24 + eventStart.getHours()) * 60 + eventStart.getMinutes()) / (7 * 24 * 60) * 100;
                    const endPercentage = ((endDayOfWeek * 24 + eventEnd.getHours()) * 60 + eventEnd.getMinutes()) / (7 * 24 * 60) * 100;
                    return (
                    <div key={index} className='bg-blue-400 rounded absolute' style={{ left: `${startPercentage}%`, right: `${100 - endPercentage}%` }}>{event.description}</div>
                    );
                })}
    </div>
  </React.Fragment>
);

export default EventBlocks;