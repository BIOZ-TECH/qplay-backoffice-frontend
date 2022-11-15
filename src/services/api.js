import axios from 'axios';

const Api = axios.create({
  baseURL: `https://qplay-api-gateway.azurewebsites.net/api/`
});

export default Api;