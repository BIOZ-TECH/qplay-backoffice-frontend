import React from "react";

import NavigationLayout from "../NavigationLayout";
import BodyWrapper from "./BodyWrapper";
import PageWrapper from "../PageWrapper";

const AppLayout = ({ children, breadcrumb, action }) => {
  return (
    <BodyWrapper>
      <NavigationLayout breadcrumb={breadcrumb} action={action} />
      <PageWrapper>
        {children}
      </PageWrapper>
    </BodyWrapper>
  );
};

export default AppLayout;
