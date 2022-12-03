import React from "react";

import NavigationLayout from "../NavigationLayout";
import BodyWrapper from "./BodyWrapper";
import PageWrapper from "../PageWrapper";
import AppSnackBar from "./AppSnackbar";
import { useLocation } from "react-router-dom";

import "./styles.css";

const AppLayout = ({ children, breadcrumb, action, message }) => {
  const { pathname } = useLocation();

  return (
    <BodyWrapper>
      {pathname !== "/login" && pathname !== '/error-401' && <NavigationLayout breadcrumb={breadcrumb} action={action} />}
      <PageWrapper pathname={pathname}>
        {children}
      </PageWrapper>
      <AppSnackBar message={message} />
    </BodyWrapper>
  );
};

export default AppLayout;
