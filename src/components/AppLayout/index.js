import React from "react";

import NavigationLayout from "../NavigationLayout";
import BodyWrapper from "./BodyWrapper";
import PageWrapper from "../PageWrapper";
import AppSnackBar from "./AppSnackbar";

const AppLayout = ({ children, breadcrumb, action, message }) => {
  return (
    <BodyWrapper>
      <NavigationLayout breadcrumb={breadcrumb} action={action} />
      <PageWrapper>
        {children}
      </PageWrapper>
      <AppSnackBar message={message} />
    </BodyWrapper>
  );
};

export default AppLayout;
