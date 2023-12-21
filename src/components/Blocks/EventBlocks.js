import React from "react";
import { startOfWeek, endOfWeek, isWithinInterval, isAfter, isBefore} from "date-fns";

const EventBlocks = ({ room, currentDate }) => (
  <React.Fragment key={room.id}>
    <div className="col-span-1 p-2 text-center ">{room.name}</div>
    <div className="col-span-7 p-2 text-center relative">
      {room.events
        .filter((event) => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          const startOfWeekDate = startOfWeek(currentDate);
          const endOfWeekDate = endOfWeek(currentDate);
          return (
            isWithinInterval(eventStart, {
              start: startOfWeekDate,
              end: endOfWeekDate,
            }) ||
            isWithinInterval(eventEnd, {
              start: startOfWeekDate,
              end: endOfWeekDate,
            }) ||
            (isBefore(eventStart, endOfWeekDate) &&
              isAfter(eventEnd, startOfWeekDate))
          );
        })
        .map((event, index) => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          const startOfWeekDate = startOfWeek(currentDate);
          const endOfWeekDate = endOfWeek(currentDate);

          const startDayOfWeek = isBefore(eventStart, startOfWeekDate)
            ? 0
            : eventStart.getDay();
          const endDayOfWeek = isAfter(eventEnd, endOfWeekDate)
            ? 6
            : eventEnd.getDay();

          const startPercentage =
            (((startDayOfWeek * 24 + eventStart.getHours()) * 60 +
              eventStart.getMinutes()) /
              (7 * 24 * 60)) *
            100;
          const endPercentage =
            (((endDayOfWeek * 24 + eventEnd.getHours()) * 60 +
              eventEnd.getMinutes()) /
              (7 * 24 * 60)) *
            100;
          return (
            <div
              key={index}
              className="bg-green-200 top-1 bottom-1 rounded absolute flex items-center "
              style={{
                left: `${startPercentage}%`,
                right: `${100 - endPercentage}%`,
              }}
            >
              <div className="ml-3">{event.description}</div>
            </div>
          );
        })}
    </div>
  </React.Fragment>
);

export default EventBlocks;
