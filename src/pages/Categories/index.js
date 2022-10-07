import React from "react";
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
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const categories = [
  {
    name: "Categoria 1",
  },
  {
    name: "Categoria 2",
  },
  {
    name: "Categoria 3",
  },
  {
    name: "Categoria 4",
  },
  {
    name: "Categoria 5",
  },
  {
    name: "Categoria 6",
  },
  {
    name: "Categoria 7",
  }
];

function getItemClass(index) {
  switch(index) {
    case 0:
      return 'first-category';
    case categories.length:
      return 'last-category';
    default:
      return 'middle-category';
  }
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} className={`category ${getItemClass(index)}`} key={index} component="div" disablePadding>
    <Card className="category-item cursor-pointer">
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h5" className='category-item-title' component="div">
      {categories[index].name}
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

const Categories = () => {
  return (
    <div className="categories">

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
            </div>
  );
}

export default Categories;