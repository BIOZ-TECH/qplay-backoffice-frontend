import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from 'react-window';
import { faAdd } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import CATEGORIES_STRINGS from "../../resources/strings/categories";
import ROUTES from "../../resources/routes";
import CategoryRow from "./CategoryRow";
import categoryServices from "../../services/category";
import { getRedirectBasedOnResponseStatus } from '../../helpers';

const Categories = (props) => {
  const navigate = useNavigate();

  const { setAppBarContent } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    defineAppBar();

    async function fetchCategories() {
      try {
        const response = await categoryServices.getCategories(0, 5);

        if (response?.status !== 200) {   
          throw { response };       
        }

        setCategories(response.data);
      } catch (e) {
        navigate(
          getRedirectBasedOnResponseStatus(e.response),
        );
      }
    };
  
    fetchCategories();
  }, []);

  const defineAppBar = () => {
    const breadcrumb = [
      {
        name: CATEGORIES_STRINGS.CURRENT_BREADCRUMB_LOCATION,
      }
    ];
    const action = {
      name: CATEGORIES_STRINGS.NEW_CATEGORY,
      icon: faAdd,
      onActionClick: handleNewCategoryClick,
    };

    setAppBarContent(breadcrumb, action);
  }

  const renderRow = (props) => (
    <CategoryRow
      {...props}
      categories={categories}
    />
  );

  const handleNewCategoryClick = () => {
    navigate(ROUTES.NEW_CATEGORY);
  }

  return (
    <div className="categories">
      { categories?.length > 0
        && (
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                className="categories-list"
                height={height}
                width={width}
                itemSize={height/5}
                itemCount={categories.length}
                overscanCount={5}
              >
                { renderRow }
              </FixedSizeList>
            )}
          </AutoSizer>
        )
      }
    </div>
  );
}

export default Categories;