import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const MenuList = () => {
  const pages = [
    { name: "Dashboard", icon: <AiOutlineHome /> },
    { name: "Front Desk", icon: <FaRegEdit /> },
    { name: "Guest", icon: <FaRegUser /> },
    { name: "Rooms", icon: <MdOutlineBedroomParent /> },
    { name: "Rate", icon: <GoTag /> },
    { name: "Settings", icon: <IoSettingsOutline /> },
  ];
  return (
    <div className="p-5 w-64 bg-gray-100">
      <h1 className="text-3xl">Hatimi Retreats Logo</h1>
      <ul className="mt-5">
        {pages.map((page, index) => (
          <li key={index} className="mt-5">
            <NavLink
              to={`/${page.name.toLowerCase().replace(" ", "-")}`}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-green-900 rounded px-3 py-1 inline-flex items-center w-full transition duration-250 ease-in-out"
                  : "text-gray-700 rounded px-3 py-1 inline-flex items-center w-full transition duration-250 ease-in-out hover:bg-green-900 hover:text-white"
              }
            >
              {page.icon}
              <span className="ml-2">{page.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
