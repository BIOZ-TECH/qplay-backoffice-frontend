import Api from './api';
import { getUserIdentifiers } from '../helpers/user';

const getQuestion = (id) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.get(`questions/${id}?holder.id=${holderId}`, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const createQuestion = (question) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.post(`questions?holder.id=${holderId}`, question, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const updateQuestion = (question) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.put(`questions?holder.id=${holderId}`, question, {
        headers: {
            'Authorization': accessToken,
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