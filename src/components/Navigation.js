import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Dashboard from './menu/Dashboard';
import FrontDesk from './menu/FrontDesk';
import { AiOutlineHome } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5"; 
import { RiNotification2Line } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

const Navigation = () => {
  const pages = [
  { name: 'Dashboard', icon: <AiOutlineHome /> },
  { name: 'Front Desk', icon: <FaRegEdit /> },
  { name: 'Guest', icon: <FaRegUser /> },
  { name: 'Rooms', icon: <MdOutlineBedroomParent /> },
  { name: 'Rate', icon: <GoTag /> },
  { name: 'Settings', icon: <IoSettingsOutline /> },
  ];

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="p-5 w-64 bg-gray-100">
        <h1 className="text-3xl">Hatimi Retreats Logo</h1>
        <ul className="mt-5">
          {pages.map((page, index) => (
            <li key={index} className="mt-5">
              <Link
                to={`/${page.name.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:bg-green-900 hover:text-white rounded px-3 py-1 inline-flex items-center w-full"
              >{page.icon}
                <span className='ml-2'>{page.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1">
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
        <div className="overflow-auto p-5">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/front-desk" element={<FrontDesk />} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navigation;