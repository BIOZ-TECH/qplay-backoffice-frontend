import Api from './api';
import { getUserIdentifiers } from '../helpers/user';

const getApplicationAppearance = () => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.get(`appearance?holder.id=${holderId}`, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
} 

const updateApplicationAppearance = (appearance) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.put(`appearance?holder.id=${holderId}`, JSON.parse(JSON.stringify(appearance)), {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const appearanceServices = {
    getApplicationAppearance,
    updateApplicationAppearance,
};

export default appearanceServices;
