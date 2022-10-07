import React from "react";

import NavigationLayout from "../NavigationLayout";
import BodyWrapper from "./BodyWrapper";
import PageWrapper from "../PageWrapper";

const AppLayout = ({ children }) => {
  return (
    <BodyWrapper>
      <NavigationLayout />
      <PageWrapper>
        {children}
      </PageWrapper>
    </BodyWrapper>
  );
};

export default AppLayout;
