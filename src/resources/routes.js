/* Navigable pages */
const LOGIN = '';
const CATEGORIES = '/categories';
const CATEGORY_DETAIL = (id) => `/category/${id}`;
const NEW_CATEGORY = '/category/new';

/* Error pages */
const ERROR_401 = '/error-401';
const ERROR_404 = '/error-404';
const ERROR_500 = '/error-500';

const ROUTES = {
    LOGIN,
    CATEGORIES,
    CATEGORY_DETAIL,
    NEW_CATEGORY,
    ERROR_401,
    ERROR_404,
    ERROR_500
};

export default ROUTES;
