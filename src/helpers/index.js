import ROUTES from "../resources/routes";

export const getRedirectBasedOnResponseStatus = (response) => {
    switch(response?.status) {
        case 400:
        case 401:
          return ROUTES.ERROR_401;
        case 404:
          return ROUTES.ERROR_404;
        default:
            return ROUTES.ERROR_500;
      }
}

export const setUserInformation = (user) => {
  const { token, holderId } = user; 
  localStorage.setItem('ACCESS_TOKEN', token);
  localStorage.setItem('HOLDER', holderId);
}

export const removeUserInformation = (user) => {
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('HOLDER');
}

export const checkIfEnterIsPressed = (event) => event.code === "Enter" || event.code === "NumpadEnter";

const helpers = {
    checkIfEnterIsPressed,
    getRedirectBasedOnResponseStatus,
    setUserInformation,
    removeUserInformation,
}

export default helpers;