import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Navigation from "../Navigation";
import { faGrip, faPaintbrush } from '@fortawesome/free-solid-svg-icons'
import './styles.css';

const TopSidebarOptions = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
        <Navigation
            activeItemId={location.pathname}
            onSelect={({itemId}) => {
              navigate(itemId);
              setIsSidebarOpen(false);
            }}
            items={[
              {
                title: 'Categorías',
                id: '/',
                icon: faGrip,
              },
              {
                title: 'Apariencia',
                id: '/appearance',
                icon: faPaintbrush
              },
            ]}
        />
  );
};

export default TopSidebarOptions;
