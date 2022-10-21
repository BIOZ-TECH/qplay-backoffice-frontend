import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Breadcrumb from "../Breadcrumb";

import "./styles.css";

const ActionBar = ({ breadcrumb, action }) => {
  return (
    <div className="action-bar">
        <Breadcrumb breadcrumb={breadcrumb} />
        { action
            && (
            <button className="action-btn" type="button" onClick={action.onActionClick}>
              <FontAwesomeIcon className="mr-2" icon={action.icon} />
                { action.name }
            </button>
          )}
    </div>
  );
};

export default ActionBar;