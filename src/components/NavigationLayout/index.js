import React, { useState } from "react";
import BlurredBackground from "./BlurredBackground";
import Navbar from "./Appbar";
import Sidebar from "./Sidebar";

const NavSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <BlurredBackground
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />


      <Navbar
      setIsSidebarOpen={setIsSidebarOpen}
      />

      {/*<div className="absolute right-0">
        <a href="https://github.com/abhijithvijayan/react-minimal-side-navigation">
          View on GitHub
        </a>
  </div>*/}



<Sidebar
setIsSidebarOpen={setIsSidebarOpen}
isSidebarOpen={isSidebarOpen} />


    </>
  );
};

export default NavSidebar;
