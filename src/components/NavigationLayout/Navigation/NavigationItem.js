/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavigationSubItem from './NavigationSubItem'

const NavigationItem = (props) => {
    const { id, title, subItems, setActiveItem, activeItem, icon, onSelect } = props;

            const isActiveItem = () => (
              activeItem.expanded &&
              ((activeItem.id === id) ||
                (subItems &&
                    subItems.some(
                    (subItem) =>
                      subItem.id === activeItem.id
                  )) ||
                false)
            );

            function handleItemExpand() {
                if (activeItem.expanded) {
                  const currentItemIsOpen =
                    id === activeItem.id ||
                    (subItems &&
                      subItems.some(
                        (subItem) => subItem.id === activeItem.id
                      )) ||
                    false;
            
                  setActiveItem({
                    ...props,
                    expanded:
                      subItems && subItems.length > 0
                        ? !currentItemIsOpen
                        : false,
                  });
                } else {
                  setActiveItem({
                    ...props,
                    expanded: !!(subItems && subItems.length > 0),
                  });
                }
              }

              function handleClick(itemId) {
                onSelect?.({itemId});
              }

            return (
              <ul key={id} className="side-navigation-panel-select">
                <li className="side-navigation-panel-select-wrap">
                  <div
                    onClick={() => {
                        handleItemExpand();
                      handleClick(id);
                    }}
                    className={`side-navigation-panel-select-option ${
                        activeItem.id === id
                        ? 'side-navigation-panel-select-option-selected'
                        : ''
                    }`}
                  >
                    <span className="side-navigation-panel-select-option-wrap">
                      <FontAwesomeIcon icon={icon} />

                      <span className="side-navigation-panel-select-option-text">
                        {title}
                      </span>
                    </span>

                    {subItems &&
                      subItems.length > 0 &&
                      (isActiveItem() ? 
                        <FontAwesomeIcon icon="chevron-up" />
                      : <FontAwesomeIcon icon="chevron-down" />)}
                  </div>
                </li>

                {subItems && subItems.length > 0 && isActiveItem() && (
                  <ul className="side-navigation-panel-select-inner">
                    {subItems.map((subItem) => (
                        <NavigationSubItem
                        {...subItem}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        handleClick={handleClick}
                        />
                    ))}
                  </ul>
                )}
              </ul>
            );
          
};

export default NavigationItem;