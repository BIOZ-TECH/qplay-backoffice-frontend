import { faM, faMobileAndroid, faMobilePhone, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appearance from "../../entities/Appearance";
import appearanceServices from "../../services/appearence";
import categoryServices from "../../services/category";
import CategoriesScreenPreview from "../Appearance/AppearancePreview/CategoriesScreenPreview";

import "./styles.css";

const ApkDownload = () => {
  const navigate = useNavigate();

  const [appearance, setAppearance] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchAppearance() {

      try {
        const response = await appearanceServices.getApplicationAppearance();
  
        switch(response.status) {
          case 200:
            setAppearance(new Appearance(response.data));

            const responseCategories = await categoryServices.getCategories();

            setCategories(responseCategories.data);
            break;
          default:
            navigate('/error-500');
        }
      } catch (e) {
        switch(e.response.status) {
          case 400:
          case 401:
            navigate('/error-401');
            break;
          case 404:
            navigate('/error-404');
            break;
          default:
            navigate('/error-500');
        }
      }
    };

    fetchAppearance();
  }, []);

  return (
    <div className="apk-download-screen">
      <div className="content">
      { appearance && categories && <div className="phone-container">
          <CategoriesScreenPreview {...appearance} categories={categories}/>
          <img className="phone" src="/phone.png"/>
          </div>}
          <div className="text">
          <h1>Descarga tu aplicación</h1>
        <p>Descargá, compartí y desafía el ingenio con tu aplicación de preguntas y respuestas</p>
        <a className="download-btn" type="button" href="https://onedrive.live.com/download.aspx?authkey=%21AFiFgAS2DPr0cpg&cid=64C1DFBA3E026192&resid=64C1DFBA3E026192%21653&parId=root&action=locate">
              <FontAwesomeIcon className="mr-2" icon={faMobileScreen} />
              <div className="download-detail">
              <p className="download">Descargar</p>
                <p className="android-apk">Android APK</p>
              </div>
            </a>
          </div>
      </div>
    </div>
  );
}

export default ApkDownload;