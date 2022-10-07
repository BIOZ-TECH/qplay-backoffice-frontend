import React from "react";

import "./styles.css";

const PageWrapper = ({ children }) => {
  return (
  <div className="page flex flex-col flex-1 overflow-hidden">
    <main className="content">
      <section className="sm:flex-row flex flex-col flex-1">
        <div className="content-box">
          {children}
        </div>
      </section>
    </main>
  </div>
  );
};

export default PageWrapper;