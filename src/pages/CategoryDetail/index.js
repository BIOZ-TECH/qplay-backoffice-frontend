import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import categoryServices from "../../services/category";
import Category from "../../entities/Category";

import "./styles.css";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import Questions from "./Questions";

const CategoryDetail = ({ setBreadcrumb, setAction }) => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await categoryServices.getCategory(0, 5, categoryId);
  
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
      setAction({
        name: 'Editar categoría',
        icon: faPencil,
        onActionClick: onEditCategoryClick,
      });
      setBreadcrumb([
        {
          name: 'Categorías',
          route: '/',
        },
        {
          name: `Categoría ${category.position}: ${category.name}`,
        }
      ]);
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
      <h1 className="category-name">{`Categoría ${category.position}: ${category.name}`}</h1>

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