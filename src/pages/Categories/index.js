import React, { useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";

import "./styles.css";

import ListItem from '@mui/material/ListItem';
import { FixedSizeList } from 'react-window';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faChevronRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import categoryServices from "../../services/category";
import Category from "../../entities/Category";
import { useNavigate } from "react-router-dom";

const Categories = ({ setBreadcrumb, setAction }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setBreadcrumb([
      {
        name: 'Categorías',
      }
    ]);
    setAction({
      name: 'Nueva categoría',
      icon: faAdd,
      onActionClick: onNewCategoryClick,
    });
    async function fetchCategories() {
      const response = await categoryServices.getCategories(0, 3);
  
      setCategories(response.data);
    };
  
    fetchCategories();
  }, []);

const getItemClass = (index) => {
  switch(index) {
    case 0:
      return 'first-category';
    case categories.length:
      return 'last-category';
    default:
      return 'middle-category';
  }
}

const renderRow = (props) => {
  const { index, style } = props;
  const category = new Category(categories[index]);

  return (
    <ListItem style={style} className={`category ${getItemClass(index)}`} key={index} component="div" disablePadding>
    <Card className="category-item cursor-pointer" onClick={() => navigate(`/category/${category.id}`)}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h5" className='category-item-title' component="div">
      Categoría {category.position}: {category.name}
      </Typography>
      <Typography color="text.secondary">
        0/x
      </Typography>
          </CardContent>
          </Box>

    <CardMedia className='category-icon ml-auto'>
    <FontAwesomeIcon className="icon" icon={faChevronRight} />
    </CardMedia>
  </Card>
    </ListItem>
  );
}

const onNewCategoryClick = () => {
  navigate('/category/new');
}

  return (
    <>

    <div className="categories">
      {
        categories && categories.length > 0
        && (
          <AutoSizer>
          {({ height, width }) => (
      
                    <FixedSizeList
                    height={height}
                    width={width}
                    itemSize={height/5}
                    itemCount={categories.length}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                  
                  )}
                  </AutoSizer>
        )
      }
            </div>
            </>
  );
}

export default Categories;