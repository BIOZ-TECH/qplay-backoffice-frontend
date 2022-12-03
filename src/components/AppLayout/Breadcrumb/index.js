import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./styles.css";

const Breadcrumb = ({ breadcrumb }) => {
  return (
    <div className="breadcrumb">
    { breadcrumb?.length > 0
        && breadcrumb.map((item, index) => (
            <React.Fragment key={`breadcrumb-portion-${index}`}>
                <a className={index === breadcrumb.length - 1 ? 'current' : ''} href={item.route} key={`breadcrumb-item-${index}`}>{item.name}</a>
                { index !== breadcrumb.length - 1 &&
                    <FontAwesomeIcon className="mr-2 ml-2" icon={faChevronRight} key={`breadcrumb-arrow-${index}`}/>
                }
            </React.Fragment>
        ))}
    </div>
  );
};

export default Breadcrumb;
