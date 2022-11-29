/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState, useEffect} from 'react';

import NavigationItem from './NavigationItem';

const Navigation = ({
  activeItemId,
  onSelect,
  items,
}) => {
  const [activeItem, setActiveItem] = useState({
    expanded: true,
    id: activeItemId,
  });

  useEffect(() => {
    setActiveItem((originalSubNav) => ({
      expanded: originalSubNav.expanded,
      id: activeItemId,
    }));
  }, [activeItemId]);

  return (
    <>
      {items.length > 0 && (
        <nav
          role="navigation"
          aria-label="side-navigation"
          className="side-navigation-panel"
        >
          {items.map((item, index) => (
            <NavigationItem
            key={`menu-item-${index}`}
            {...item}
            onSelect={onSelect}
            activeItem={activeItem}
            setActiveItem={setActiveItem}/>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;