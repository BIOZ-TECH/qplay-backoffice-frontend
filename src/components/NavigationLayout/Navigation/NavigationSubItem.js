/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavigationSubItem = (props) => {
    const { id, title, icon, setActiveItem, activeItem, handleClick } = props;

    const onSubItemClick = () => {
        setActiveItem({...props});
        handleClick(id);
    };

    return (
        <li
            key={id}
            className="side-navigation-panel-select-inner-wrap"
        >
            <div
                onClick={onSubItemClick}
                className={`side-navigation-panel-select-inner-option ${
                    activeItem.id === id ? 'side-navigation-panel-select-inner-option-selected' : ''
                } `}
            >
                <span className="side-navigation-panel-select-inner-option-wrap">
                <FontAwesomeIcon icon={icon} />
                    <span className="side-navigation-panel-select-inner-option-text">
                        {title}
                    </span>
                </span>
            </div>
         </li>
    );
};

export default NavigationSubItem;