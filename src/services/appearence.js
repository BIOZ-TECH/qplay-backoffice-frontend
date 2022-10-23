import Api from './api';

const getApplicationAppearance = (userId, holderId) => {
    return Api.get(`appearance?caller.id=${userId}&holder.id=${holderId}`);
} 

const updateApplicationAppearance = (appearance, userId, holderId) => {
    return Api.put(`appearance?caller.id=${userId}&holder.id=${holderId}`, JSON.parse(JSON.stringify(appearance)));
}

const appearanceServices = {
    getApplicationAppearance,
    updateApplicationAppearance,
};

export default appearanceServices;
