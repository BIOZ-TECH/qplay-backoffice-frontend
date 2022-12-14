import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import CATEGORY_DETAIL_STRINGS from "../../resources/strings/category-detail";
import Questions from "./Questions";
import Category from "../../entities/Category";
import categoryServices from "../../services/category";

const CategoryDetail = (props) => {
  const navigate = useNavigate();

  const { setAppBarContent } = props;
  const { id: categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await categoryServices.getCategory(categoryId);
  
        switch(response.status) {
          case 200:
            setCategory(new Category(response.data));
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

    fetchCategory();
  }, []);

  useEffect(() => {
    if (category) {
      const action = {
        name: CATEGORY_DETAIL_STRINGS.EDIT_CATEGORY,
        icon: faPencil,
        onActionClick: onEditCategoryClick,
      };
      const breacrumb = [
        ...CATEGORY_DETAIL_STRINGS.BREADCRUMB,
        {
          name: `${ CATEGORY_DETAIL_STRINGS.CATEGORY } ${ category.position }: ${ category.name }`,
        }
      ];
      setAppBarContent(breacrumb, action);
    }
  }, [category]);

  const onEditCategoryClick = () => {
    navigate(`/category/edit/${categoryId}`)
  }

  return (
    <Card className="category-container p-0">
      { category
      && (
        <>
              <div className="primary-info">
      <div className="category-img" style={{ backgroundImage: `url(${category.permalink})` }}></div>
      <h1 className="category-name">{`${ CATEGORY_DETAIL_STRINGS.CATEGORY } ${category.position}: ${category.name}`}</h1>

      </div>
      {category.description && <p className="category-description">{category.description}</p>}
      <div className="divider"></div>
        <Questions questions={category.questions} categoryId={category.id}/>
        </>
      )

      }      
    </Card>
  );
}

export default CategoryDetail;