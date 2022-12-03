import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";
import APK_DOWNLOAD_STRINGS from "../../resources/strings/apk-download";
import CategoriesScreenPreview from "../Appearance/previews/CategoriesScreenPreview";
import appearanceServices from "../../services/appearence";
import categoryServices from "../../services/category";
import { getRedirectBasedOnResponseStatus } from "../../helpers";

const ApkDownload = (props) => {
  const navigate = useNavigate();

  const { setAppBarContent } = props;
  const [appearance, setAppearance] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchAppearance() {

      try {
        setAppBarContent(null, null);

        const appearanceResponse = await appearanceServices.getApplicationAppearance();

        if (appearanceResponse?.status !== 200) {   
          throw { response: appearanceResponse };       
        }

        const categoriesResponse = await categoryServices.getCategories(7);

        if (categoriesResponse?.status !== 200) {   
          throw { response: categoriesResponse };       
        }

        setAppearance(appearanceResponse.data);
        setCategories(categoriesResponse.data);
      } catch (e) {
        navigate(
          getRedirectBasedOnResponseStatus(e.response),
        );
      }
    };

    fetchAppearance();
  }, []);

  const getDownloadText = () => (
    <div className="download-text">
    <h1>{ APK_DOWNLOAD_STRINGS.DOWNLOAD_APPLICATION }</h1>
    <p>{ APK_DOWNLOAD_STRINGS.DOWNLOAD_APPLICATION_AND_CHALLENGE }</p>
    <a className="download-btn" type="button" href={ APK_DOWNLOAD_STRINGS.APK_LINK }>
      <FontAwesomeIcon className="mr-2" icon={faMobileScreen} />
      <div className="download-detail">
        <p className="download">{ APK_DOWNLOAD_STRINGS.DOWNLOAD }</p>
        <p className="android-apk">{ APK_DOWNLOAD_STRINGS.ANDROID_APK }</p>
      </div>
    </a>
  </div>
  );

  return (
    <div className="apk-download-screen">
      <div className="content">
        { appearance && categories ? (
          <>
            <div className="phone-container">
              <CategoriesScreenPreview {...appearance} categories={categories}/>
              <img className="phone" src="/phone.png"/>
            </div>
            { getDownloadText() }
          </>
        ) : (
          <>
          <Skeleton variant="rectangular">
          <div className="phone-container">
          <CategoriesScreenPreview />
              <img className="phone" src="/phone.png"/>
            </div>
          </Skeleton>
          <Skeleton variant="rectangular">
            { getDownloadText() }
          </Skeleton>
          </>
        )}
      </div>
    </div>
  );
}

export default ApkDownload;