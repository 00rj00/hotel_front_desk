const RoomDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="mt-2 w-full p-4 border-gray-300 outline-none transition duration-500 ease-in-out hover:-translate-y-1"
    >
      <option value="Standard">Standard</option>
      <option value="Deluxe">Deluxe</option>
    </select>
  );
};

export default RoomDropdown;
