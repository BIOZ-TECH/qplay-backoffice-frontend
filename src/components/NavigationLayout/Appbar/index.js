import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import "./styles.css";

const Navbar = ({setIsSidebarOpen}) => (
    <div className="app-navbar flex px-4 py-3">
        <button
          className="btn-menu py-1 px-3"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <FontAwesomeIcon className="icon" icon={faBars} />
        </button>
        <img className="app-name px-4" src="logo.png" />
        <button
          className="absolute right-0 py-1 px-3 mr-3"
          type="button"
        >
          <FontAwesomeIcon className="icon bell" icon={faBell} />
        </button>
    </div>
  );

export default Navbar;
