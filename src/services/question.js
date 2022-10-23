import Api from './api';

const getQuestion = (userId, holderId, id) => {
    return Api.get(`questions/${id}?caller.id=${userId}&holder.id=${holderId}`);
}

const createQuestion = (userId, holderId, question) => {
    return Api.post(`questions?caller.id=${userId}&holder.id=${holderId}`, question);
}

const updateQuestion = (userId, holderId, question) => {
    return Api.put(`questions?caller.id=${userId}&holder.id=${holderId}`, question);
}

const questionServices = {
    getQuestion,
    createQuestion,
    updateQuestion,
};

export default questionServices;