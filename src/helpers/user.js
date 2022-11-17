export const getUserIdentifiers = () => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const holderId = localStorage.getItem('HOLDER');

    return { accessToken, holderId };
}
