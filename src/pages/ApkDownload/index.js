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
        { appearance && categories && <div className="phone">
          <CategoriesScreenPreview {...appearance} categories={categories}/>
          </div>}
        <h1>Descarga tu aplicación</h1>
        <p>Descarga, comparte y desafía el ingenio con tu aplicación de preguntas y respuestas</p>
    </div>
  );
}

export default ApkDownload;