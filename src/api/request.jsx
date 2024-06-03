import axios from "axios";
import { Modal, notification } from 'antd';
import Cookies from 'js-cookie';

export const httpRequest = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const isLogin = async () => {
    const path = "/auth/profile"
    try {
        const response = await httpRequest.get(path)
        return response.data;
    }catch (error) {
        console.log(error);
    }
}

export const loginRequest = async (body) => {
    try {
        const res = await httpRequest.post("/auth/admin/login", body);
        // const token = res.data.token;
        // localStorage.setItem("token", token);

        console.log(res.message);
        return res;
    } catch (error) {
        console.log(error);
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

export const getStaff = async () => {
    const path = `/staff`
    try {
        const response = await httpRequest.get(path)
        console.log(response.message);
    }catch (error) {
        console.log(error);   
    }
}

export const get = async (path, config = {}) => {
    try {
        const response = await httpRequest.get(path, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: error.response ? error.response.data.message : 'Lỗi kết nối',
                placement: 'bottomLeft',
                type: 'error',
            });
        }
    }
};
export const post = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.post(path, body, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: error.response ? error.response.data.message : 'Lỗi kết nối',
                placement: 'bottomLeft',
                type: 'error',
            });
        }
    }
};
export const del = async (path, config = {}) => {
    try {
        const response = await httpRequest.delete(path, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: error.response ? error.response.data.message : 'Lỗi kết nối',
                placement: 'bottomLeft',
                type: 'error',
            });
        }
    }
};
export const put = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.put(path, body, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: error.response ? error.response.data.message : 'Lỗi kết nối',
                placement: 'bottomLeft',
                type: 'error',
            });
        }
    }
};
export const patch = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.patch(path, body, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: error.response ? error.response.data.message : 'Lỗi kết nối',
                placement: 'bottomLeft',
                type: 'error',
            });
        }
    }
};