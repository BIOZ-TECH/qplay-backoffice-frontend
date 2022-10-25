import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Navigation from "../Navigation";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import './styles.css';

const BottomSidebarOptions = ({ setIsSidebarOpen }) =>{
  const navigate = useNavigate();
  const location = useLocation();

  return(
      <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            onSelect={() => {
              localStorage.removeItem('ACCESS_TOKEN');
              navigate('/login');
            }}
            items={[
              {
                title: 'Cerrar sesion',
                id: '/logout',
                icon: faRightFromBracket
              },
            ]}
          />
        </div>
  );
};

export default BottomSidebarOptions;
