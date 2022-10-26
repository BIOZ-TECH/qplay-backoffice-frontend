import Api from './api';

const login = (email, password) => {
    return Api.post(`authentication`,
    {
        email,
        password,
    });
}

const userServices = {
    login,
};

export default userServices;