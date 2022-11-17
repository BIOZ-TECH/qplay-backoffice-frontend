import React, { useEffect } from "react";

import NavigationLayout from "../NavigationLayout";
import BodyWrapper from "./BodyWrapper";
import PageWrapper from "../PageWrapper";
import AppSnackBar from "./AppSnackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

const AppLayout = ({ children, breadcrumb, action, message }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <BodyWrapper>
      {pathname !== "/login" && pathname !== '/error-401' && <NavigationLayout breadcrumb={breadcrumb} action={action} />}
      <PageWrapper pathname={pathname}>
        {children}
        <button className="download-apk" onClick={() => { navigate('/download-app'); }}>
          <FontAwesomeIcon icon={faDownload} />
          <span class="button-text">Descargar aplicación</span>
          </button>
      </PageWrapper>
      <AppSnackBar message={message} />
    </BodyWrapper>
  );
};

export default AppLayout;
