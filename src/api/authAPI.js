import axiosInstance from "../config/axiosConfig/axios.config";
import { API } from "../constants/hostAPI/hostAPI";

export const loginAPI = async (username, password) => {
    try {
        const res = await axiosInstance.post(`${API.AUTH}/login`, { username, password });
        console.log("123");
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const regisAPI = async (register_body) => {
    try {
        const res = await axiosInstance.post(`${API.AUTH}/register`, register_body);
        console.log("scc");
        return res.data;
    } catch (error) {
        console.log('err');
        throw error;
    }
};