import Api from './api';

const getApplicationAppearance = (userId) => {
    return Api.get(`appearance?caller.id=${userId}`);
} 

const updateApplicationAppearance = (appearance, userId) => {
    Api.put(`appearance?caller.id=${userId}`, JSON.parse(JSON.stringify(appearance)));
}

const appearanceServices = {
    getApplicationAppearance,
    updateApplicationAppearance,
};

export default appearanceServices;
