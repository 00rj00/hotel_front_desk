import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { RiNotification2Line } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

const Header = () => {
    return (
        <div className="h-16 bg-white flex items-center justify-between px-5 shadow">
          <div className="relative mx-5 w-1/2">
            <input className="border rounded-md px-3 py-2 pl-10 w-full" placeholder="Search for rooms, guests..." />
            <GoSearch className="absolute left-0 top-0 ml-3 mt-3 text-gray-400" />
          </div>
          <div>
            <button className="mr-4" title='Notification'><RiNotification2Line /></button>
            <button title='admin'><FaRegUser /></button>
          </div>
        </div>
    );
};

export default Header;
