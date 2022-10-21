import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./styles.css";

const Breadcrumb = ({ breadcrumb }) => {
  return (
    <div className="breadcrumb">
    { breadcrumb?.length > 0
        && breadcrumb.map((item, index) => (
            <>
                <a className={index === breadcrumb.length - 1 ? 'current' : ''} href={item.route}>{item.name}</a>
                { index !== breadcrumb.length - 1 &&
                    <FontAwesomeIcon className="mr-2 ml-2" icon={faChevronRight} />
                }
            </>
        ))}
    </div>
  );
};

export default Breadcrumb;
