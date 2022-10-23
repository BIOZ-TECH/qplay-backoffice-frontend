import React, { useEffect, useRef, useState } from "react";
import categoryServices from "../../services/category";
import Category from "../../entities/Category";

import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { Card, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";

const CategoryForm = ({ setBreadcrumb, setAction, setMessage}) => {
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
    const breadcrumb = [
      {
        name: 'Categorías',
        route: '/',
      },
    ];

    if (categoryId && oldCategory) {
      breadcrumb.push({
        name: `Categoría ${oldCategory.position}: ${oldCategory.name}`,
        route: `/category/${categoryId}`,
      });
      breadcrumb.push(      {
        name: ( categoryId ? 'Editar categoría' : 'Nueva categoría' ),
      });
      setBreadcrumb(breadcrumb);
      setAction({
        name: `Guardar ${ categoryId? ' cambios' : '' }`,
        icon: faFloppyDisk,
        onActionClick: onSaveCategoryClick,
      });
    } else if (!categoryId) {
      breadcrumb.push(      {
        name: ( categoryId ? 'Editar categoría' : 'Nueva categoría' ),
      });
      setBreadcrumb(breadcrumb);
      setAction({
        name: `Guardar ${ categoryId? ' cambios' : '' }`,
        icon: faFloppyDisk,
        onActionClick: onSaveCategoryClick,
      });
    }
  }, [category]);

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

  const onCategoryImageChange = (inputValue) => {

      const newCategory = new Category({ ...category, permalink: inputValue });
      setCategory(newCategory);
  

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
          setMessage({
            severity: 'success',
            text: 'La categoría ha sido actualizado correctamente'
          });
          navigate('/categories');
        }
      });
    } else {
      await categoryServices.createCategory(0, 3, newCategory)
      .then((res) => {
        if(res.status === 200) {
          setMessage({
            severity: 'success',
            text: 'La categoría ha sido creada correctamente'
          });
          navigate('/categories');
        }
      });
    }
  }

  return (
    <>
    <Card className="edit-category-container">
      { category
      && (
        <>
              <div className="primary-info">
                <div className="category-image-uploader">
                <ImageUploader  selectedFile={category?.permalink} setSelectedFile={onCategoryImageChange} dialogType='de la categoría'/>
                </div>
      </div>

      <div className="category-data-container">
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
      <TextField id="category-description-input" label="Descripción (opcional)" variant="outlined" fullWidth
          onChange={onDescriptionCategoryChange}
          multiline
          value={descriptionInput}
          />
          </div>
      </div>
        </>
      )
      }
    </Card>
    </>
  );
}

export default CategoryForm;