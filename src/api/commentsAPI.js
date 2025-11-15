
import axiosInstance from "../config/axiosConfig/axios.config";
import { API } from "../constants/hostAPI/hostAPI";
export const getAllCommentsByProductID = async (productID) => {
    try {
        const response = await axiosInstance.get(`${API.COMMENTS}/product/${productID}`);
        return response.data;
    } catch (error) {
        console.error("Error create Comment data:", error);
        throw error;
    }
};
export const createComment = async (body_create) => {
    try {
        const response = await axiosInstance.post(`${API.COMMENTS}`, body_create);
        return response.data;
    } catch (error) {
        console.error("Error create Comment data:", error);
        throw error;
    }
};
export const updateComment = async (body_change) => {
    try {
        const response = await axiosInstance.put(`${API.COMMENTS}`, body_change);
        return response.data;
    } catch (error) {
        console.error("Error update Comment data:", error);
        throw error;
    }
};
export const deleteComment = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API.COMMENTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error delete Comment data:", error);
        throw error;
    }
};