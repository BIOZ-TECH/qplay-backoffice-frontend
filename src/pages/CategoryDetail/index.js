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
    setAction({
      name: 'Editar categoría',
      icon: faPencil,
      onActionClick: onEditCategoryClick,
    });
    async function fetchCategory() {
      const response = await categoryServices.getCategory(0, 3, categoryId);

      setCategory(new Category(response.data));

      setBreadcrumb([
        {
          name: 'Categorías',
          route: '/',
        },
        {
          name: `Categoría ${category.position}: ${category.name}`,
        }
      ]);
    };

    fetchCategory();
  }, []);

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
      <p>{category.description}</p>
      <div className="divider"></div>
        <Questions questions={category.questions} categoryId={category.id}/>
        </>
      )

      }      
    </Card>
  );
}

export default CategoryDetail;