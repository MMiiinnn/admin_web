import * as httpRequest from '../api/request';

export const login = async (data = {}) => {
    try {
        const res = await httpRequest.post('auth/admin/login', data);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};

export const logoutRequest = async () => {
    const path = `/auth/logout`
    try {
        const response = await httpRequest.get(path)
        console.log(response.message);
        
    }catch (error) {
        console.log(error);
        
    }
}

export const refreshToken = async (phone) => {
    const body = {
        phone,
    };
    try {
        const res = await httpRequest.post('account/refreshToken', body);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
