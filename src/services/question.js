import Api from './api';

const getQuestion = (userId, holderId, id) => {
    return Api.get(`questions/${id}?caller.id=${userId}&holder.id=${holderId}`, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const createQuestion = (userId, holderId, question) => {
    return Api.post(`questions?caller.id=${userId}&holder.id=${holderId}`, question, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const updateQuestion = (userId, holderId, question) => {
    return Api.put(`questions?caller.id=${userId}&holder.id=${holderId}`, question, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const questionServices = {
    getQuestion,
    createQuestion,
    updateQuestion,
};

export default questionServices;