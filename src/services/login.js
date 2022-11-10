import Api from './api';

const logIn = (email, password) => {
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
    logIn,
};

export default userServices;