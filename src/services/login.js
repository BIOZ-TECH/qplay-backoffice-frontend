import Api from './api';

const login = (email, password) => {
    return Api.post(`authentication`,
    {
        email,
        password,
    },
    {
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const userServices = {
    login,
};

export default userServices;