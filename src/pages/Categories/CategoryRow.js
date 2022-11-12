import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import ROUTES from "../../resources/routes";
import CATEGORIES_STRINGS from "../../resources/strings/categories";
import Category from "../../entities/Category";

const CategoryRow = (props) => {
  const navigate = useNavigate();

  const { index, style, categories } = props;
  const category = new Category(categories[index]);

  const getItemClass = (index) => {
    switch(index) {
      case 0:
        return 'first';
      case categories.length:
        return 'last';
      default:
        return 'middle';
    }
  }

  const handleCategoryClick = () => {
    navigate(ROUTES.CATEGORY_DETAIL(category.id));
  }

  return (
    <ListItem style={style} className={`category ${getItemClass(index)}`} key={index} component="div" disablePadding>
      <Card className="item cursor-pointer" onClick={handleCategoryClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto', padding: '0 !important' }}>
            <div className="detail">
              <div className="img" style={{ backgroundImage: `url(${category.permalink})` }}></div>
              <div className="data">
                <Typography variant="h5" className='category-item-title' component="div">
                  { `${CATEGORIES_STRINGS.CATEGORY} ${category.position}: ${category.name}` }
                </Typography>
                <Typography color="text.secondary">
                  { `${category.questions.length} ${CATEGORIES_STRINGS.ANSWERS.toLowerCase()}` }
                </Typography>
              </div>
            </div>
          </CardContent>
        </Box>
        
        <CardMedia className='icon ml-auto'>
          <FontAwesomeIcon icon={faChevronRight} />
        </CardMedia>
      </Card>
    </ListItem>
  );
}

export default CategoryRow;