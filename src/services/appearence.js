import Api from './api';

const getApplicationAppearance = (userId, holderId) => {
    return Api.get(`appearance?caller.id=${userId}&holder.id=${holderId}`, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
        }
    });
} 

const updateApplicationAppearance = (appearance, userId, holderId) => {
    return Api.put(`appearance?caller.id=${userId}&holder.id=${holderId}`, JSON.parse(JSON.stringify(appearance)), {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
        }
    });
}

const appearanceServices = {
    getApplicationAppearance,
    updateApplicationAppearance,
};

export default appearanceServices;
