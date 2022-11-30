import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, TextField, Tooltip } from "@mui/material";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import ImageUploader from "../../components/ImageUploader";
import Category from "../../entities/Category";
import CategoryValidator from "../../validators/entity/CategoryValidator";
import categoryServices from "../../services/category";

const CategoryForm = ({ setBreadcrumb, setAction, setMessage}) => {
  const { id: categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [oldCategory, setOldCategory] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
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
        try {
          const response = await categoryServices.getCategory(categoryId);
    
          switch(response.status) {
            case 200:
              categoryData = response.data;

              setOldCategory(categoryData);
              initializeView(categoryData);
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
    setErrorMessages({ ...errorMessages, permalink: null });
  }

  const onDescriptionCategoryChange = (e) => {
    setInputValues({ ...inputValues, descriptionInput: e.target.value });
    setErrorMessages({ ...errorMessages, description: null });
  }

  const onNameCategoryChange = (e) => {
    setInputValues({ ...inputValues, nameInput: e.target.value });
    setErrorMessages({ ...errorMessages, name: null });
  }

  const onOrderCategoryChange = (e) => {
    setInputValues({ ...inputValues, orderInput: parseInt(e.target.value) });
    setErrorMessages({ ...errorMessages, position: null });
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

    const categoryValidator = new CategoryValidator(newCategory);

    const newMessages = categoryValidator.validate();
    setErrorMessages(newMessages);

    if (Object.keys(newMessages).length === 0) {
      if (categoryId) {
        await categoryServices.updateCategory(newCategory)
        .then((res) => {
          switch(res.status) {
            case 200:
              setMessage({
                severity: 'success',
                text: 'La categoría ha sido actualizado correctamente'
              });
              navigate('/categories');    
              break;
            default:
              navigate('/error-500');
          }
        })
        .catch((e) => {
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
        });
      } else {
        await categoryServices.createCategory(newCategory)
        .then((res) => {
          switch(res.status) {
            case 200:
              setMessage({
                severity: 'success',
                text: 'La categoría ha sido creada correctamente'
              });
              navigate('/categories');
    
              break;
            default:
              navigate('/error-500');
          }
        })
        .catch((e) => {
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
        });
      }
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
                
                <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                open={!!errorMessages.permalink}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={errorMessages.permalink}
                arrow
              >

                <ImageUploader  selectedFile={category?.permalink} setSelectedFile={onCategoryImageChange} dialogType='de la categoría'/>

              </Tooltip>
                </div>
      </div>

      <div className="category-data-container">
      <div className="category-input">
        <TextField id="category-name-input" label="Nombre de la categoría" variant="outlined" fullWidth
          error={!!errorMessages.name}
          onChange={onNameCategoryChange}
          value={nameInput}
          helperText={errorMessages.name}
          />
      </div>

      <div className="category-input">
      <TextField id="category-order-input" label="Orden en la lista de categoría" variant="outlined" fullWidth
            type='number'
          onChange={onOrderCategoryChange}
          value={orderInput}
          error={!!errorMessages.position}
          helperText={errorMessages.position}
          />
      </div>
      <div className="category-input">
      <TextField id="category-description-input" label="Descripción (opcional)" variant="outlined" fullWidth
          onChange={onDescriptionCategoryChange}
          multiline
          value={descriptionInput}
          error={!!errorMessages.description}
          helperText={errorMessages.description}
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