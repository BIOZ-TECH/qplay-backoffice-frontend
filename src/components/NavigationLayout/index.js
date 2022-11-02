import React, { useState } from "react";
import BlurredBackground from "./BlurredBackground";
import Navbar from "./Appbar";
import Sidebar from "./Sidebar";

const NavSidebar = ({ breadcrumb, action}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <BlurredBackground
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />


      <Navbar
      setIsSidebarOpen={setIsSidebarOpen}
      breadcrumb={breadcrumb} action={action}
      />


<Sidebar
setIsSidebarOpen={setIsSidebarOpen}
isSidebarOpen={isSidebarOpen} />


    </>
  );
};

export default NavSidebar;
