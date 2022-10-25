import React from "react";

import "./styles.css";

const PageWrapper = ({ children, pathname }) => {
  return (
  <div className={`flex flex-col flex-1 overflow-hidden page-${pathname !== '/login' && pathname !== '/error-401' ? "auth" : "login"}`}>
    <main className="content">
      <section className="sm:flex-row flex flex-col flex-1">
        <div className={`content-box ${pathname !== '/login' && pathname !== '/error-401' ? "auth" : "login"}`}>
          {children}
        </div>
      </section>
    </main>
  </div>
  );
};

export default PageWrapper;