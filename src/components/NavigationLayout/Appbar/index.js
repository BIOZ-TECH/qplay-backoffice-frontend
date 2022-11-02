import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ActionBar from '../../../components/AppLayout/ActionBar';
import "./styles.css";

const Navbar = ({ setIsSidebarOpen, breadcrumb, action }) => (
    <div className="app-navbar flex px-4 py-3">
        <button
          className="btn-menu py-1 px-3"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <FontAwesomeIcon className="icon" icon={faBars} />
        </button>
        <img className="app-name px-4" src="/logo.png" />
        <div className="divider" />
        <ActionBar breadcrumb={breadcrumb} action={action} />
    </div>
  );

export default Navbar;
