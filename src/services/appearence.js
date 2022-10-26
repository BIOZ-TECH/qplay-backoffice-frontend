import Api from './api';

const getApplicationAppearance = (userId, holderId) => {
    return Api.get(`appearance?caller.id=${userId}&holder.id=${holderId}`, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
} 

const updateApplicationAppearance = (appearance, userId, holderId) => {
    return Api.put(`appearance?caller.id=${userId}&holder.id=${holderId}`, JSON.parse(JSON.stringify(appearance)), {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
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
