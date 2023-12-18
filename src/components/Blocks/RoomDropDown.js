const RoomDropdown = ({ roomType, rooms, isOpen, onToggle, onSelect }) => {
  return (
    <div onClick={onToggle} className="cursor-pointer">
      <div className="font-bold py-2">{roomType}</div>
      {isOpen && (
        <div className="rounded mt-2 bg-white">
          {rooms.map((room, index) => (
            <div key={index} className="p-2  border-t last:border-b-0" onClick={() => onSelect(room.id)}>
              {room}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomDropdown;