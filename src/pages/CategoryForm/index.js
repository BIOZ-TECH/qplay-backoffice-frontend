import React, { useEffect, useRef, useState } from "react";
import categoryServices from "../../services/category";
import Category from "../../entities/Category";

import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { Card, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const CategoryForm = ({ setBreadcrumb, setAction}) => {
  const { id: categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [oldCategory, setOldCategory] = useState(null);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    imageInput: '',
    nameInput: '',
    descriptionInput: '',
    orderInput: null,
  });
  const {
    imageInput,
    nameInput,
    descriptionInput,
    orderInput,
  } = inputValues;

  useEffect(() => {
    const breadcrumb = [
      {
        name: 'Categorías',
        route: '/',
      },
    ];

    if (categoryId) {
      breadcrumb.push({
        name: 'Categoría 1: Nombre',
        route: `/category/${categoryId}`,
      });
    }
    breadcrumb.push(      {
      name: ( categoryId ? 'Editar categoría' : 'Nueva categoría' ),
    });
    setBreadcrumb(breadcrumb);
    setAction({
      name: `Guardar ${ categoryId? ' cambios' : '' }`,
      icon: faFloppyDisk,
      onActionClick: onSaveCategoryClick,
    });
    async function fetchCategory() {
      let categoryData = {};

      if (categoryId) {
        const response = await categoryServices.getCategory(0, 3, categoryId);
        categoryData = response.data;

        setOldCategory(categoryData);
        initializeView(categoryData);
      }

      setCategory(new Category(categoryData));
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    updateAction();
  }, [inputValues]);

  const initializeView = (data) => {
    setInputValues({
      imageInput: data.permalink,
      nameInput: data.name,
      descriptionInput: data.description,
      orderInput: parseInt(data.position),
    });
  }

  const onCategoryImageChange = (e) => {
    const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
    const inputValue = e.target.value;

    if (urlImageRegex.test(inputValue)) {
      const newCategory = new Category({ ...category, permalink: inputValue });
      setCategory(newCategory);
    }

    setInputValues({ ...inputValues, imageInput: inputValue });
  }

  const onDescriptionCategoryChange = (e) => {
    setInputValues({ ...inputValues, descriptionInput: e.target.value });
  }

  const onNameCategoryChange = (e) => {
    setInputValues({ ...inputValues, nameInput: e.target.value });
  }

  const onOrderCategoryChange = (e) => {
    setInputValues({ ...inputValues, orderInput: e.target.value });
  }

  const updateAction = () => {
    setAction({
      name: `Guardar ${ categoryId? ' cambios' : '' }`,
      icon: faFloppyDisk,
      onActionClick: onSaveCategoryClick,
    });
  }

  const onSaveCategoryClick = async() => {
    const newCategory = new Category({
      id: categoryId || null,
      permalink: category?.permalink || null,
      name: nameInput,
      description: descriptionInput,
      position: orderInput,
    });


    if (categoryId) {
      await categoryServices.updateCategory(0, 3, newCategory)
      .then((res) => {
        if(res.status === 200) {
          navigate('/categories');
        }
      });
    } else {
      await categoryServices.createCategory(0, 3, newCategory)
      .then((res) => {
        if(res.status === 200) {
          navigate('/categories');
        }
      });
    }
  }

  return (
    <>
        <Card className="edit-category-header">
    <div>{categoryId ? 'EDITAR' : 'NUEVA' } CATEGORÍA</div>

    </Card>
    <Card className="edit-category-container p-0">
      { category
      && (
        <>
              <div className="primary-info">
      <div className="category-img" style={{ backgroundImage: `url(${category?.permalink})` }}></div>
      <div className="category-input image">
        <TextField id="category-image-input" label="Enlace de imagen" variant="outlined" fullWidth
        value={imageInput}
        onChange={onCategoryImageChange}
        />
        </div>
      </div>
      <div className="category-input">
        <TextField id="category-name-input" label="Nombre de la categoría" variant="outlined" fullWidth
          onChange={onNameCategoryChange}
          value={nameInput}
          />
      </div>
      <div className="category-input">
      <TextField id="category-order-input" label="Orden en la lista de categoría" variant="outlined" fullWidth
            type='number'
          onChange={onOrderCategoryChange}
          value={orderInput}
          />
      </div>
      <div className="category-input">
      <TextField id="category-description-input" label="Descripción (opcional)s" variant="outlined" fullWidth
          onChange={onDescriptionCategoryChange}
          multiline
          value={descriptionInput}
          />
          </div>
        </>
      )
      }
    </Card>
    </>
  );
}

export default CategoryForm;