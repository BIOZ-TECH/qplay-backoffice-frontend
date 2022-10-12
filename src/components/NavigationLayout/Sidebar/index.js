import React from "react";
import BottomSidebarOptions from "./BottomSidebarOptions";

import './styles.css';
import TopSidebarOptions from "./TopSidebarOptions";

const Sidebar = ({isSidebarOpen, setIsSidebarOpen}) => {

  return (
      <div
        className={`sidebar fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in translate-x-full"
        }`}
      >
        {/* Sidebar title*/}
        <div className="sidebar-title flex items-center justify-center text-center py-6">
          <img className="menu-logo mx-2 text-2xl" src="logo.png"/>
        </div>

        <TopSidebarOptions
        setIsSidebarOpen={setIsSidebarOpen}
        />

        <BottomSidebarOptions
        setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
  );
};

export default Sidebar;
