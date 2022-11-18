import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const PageWrapper = ({ children, pathname }) => {
  const navigate = useNavigate();

  return (
  <div className={`flex flex-col flex-1 overflow-hidden page-${pathname !== '/login' && pathname !== '/error-401' ? "auth" : "login"}`}>
    <main className="content">
      <section className="sm:flex-row flex flex-col flex-1">
        <div className={`content-box ${pathname !== '/login' && pathname !== '/error-401' ? "auth" : "login"}`}>
          {children}
          {pathname !== "/login" && pathname !== '/error-401' && pathname !== '/error-404'
          && pathname !== '/error-500' && pathname !== '/download-app' && <button className="download-apk" onClick={() => { navigate('/download-app'); }}>
          <FontAwesomeIcon icon={faDownload} />
          <span class="button-text"><FontAwesomeIcon icon={faDownload} />Descargar aplicación</span>
          </button>}
        </div>
      </section>
    </main>
  </div>
  );
};

export default PageWrapper;