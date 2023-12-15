import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './menu/Dashboard';
import FrontDesk from './menu/FrontDesk';
import Header from './Blocks/Header';
import MenuList from './Blocks/MenuList';

const Navigation = () => {

  return (
    <div className="flex h-screen bg-gray-200">
      <MenuList />
      <div className="flex flex-col flex-1">
        <Header />
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