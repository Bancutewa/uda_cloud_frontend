
import axiosInstance from "../config/axiosConfig/axios.config";
import { API } from "../constants/hostAPI/hostAPI";
// cal API
export const createCartItem = async (body_create) => {
    try {
        const response = await axiosInstance.post(`${API.CART_ITEMS}`, body_create);
        return response.data;
    } catch (error) {
        console.error("Error create CART Items data:", error);
        throw error;
    }
};
export const updateCartItem = async (body_change) => {
    try {
        const response = await axiosInstance.put(`${API.CART_ITEMS}/products/change`, body_change);
        return response.data;
    } catch (error) {
        console.error("Error update CART Items data:", error);
        throw error;
    }
};
export const deleteCartItem = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API.CART_ITEMS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error delete CARTS data:", error);
        throw error;
    }
};