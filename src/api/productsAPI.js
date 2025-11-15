
import { deleteObject, ref } from "firebase/storage";
import axiosInstance from "../config/axiosConfig/axios.config";
import { API } from "../constants/hostAPI/hostAPI";
import { storage } from "../config/firebaseconfig/firebase.config";
// cal API
export const fetchProductsApi = async (params) => {
    try {
        const response = await axiosInstance.get(API.PRODUCTS, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        throw error;
    }
};

export const fetchProductAPIByID = async (id) => {
    try {
        const response = await axiosInstance.get(`${API.PRODUCTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        throw error;
    }
};

export const fetchProductsAPIByCategory = async (params, categoryID) => {
    try {
        const response = await axiosInstance.get(`${API.PRODUCTS}/category/${categoryID}`, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Products Category data:", error);
        throw error;
    }
};

// Create category
// category_create => {name: ""}
export const createProductsAPI = async (product_create) => {
    try {
        const response = await axiosInstance.post(API.PRODUCTS, product_create);
        return response.data;

    } catch (error) {
        if ((error.response && error.response.status === 401) || error.response.status === 403) {
            throw new Error("Unauthorized");
        } else if (error.response) {
            throw new Error("Đã có lỗi xảy ra. Vui lòng thử lại.");
        } else {
            throw new Error("Không thể kết nối đến máy chủ.");
        }
    }
};


// Update category
export const updateProductsAPI = async (product_update) => {
    try {
        const response = await axiosInstance.put(`${API.PRODUCTS}/${product_update.id}`, product_update);
        return response.data;
    } catch (error) {
        if ((error.response && error.response.status === 401) || error.response.status === 403) {
            throw new Error("Unauthorized");
        } else if (error.response) {
            throw new Error("Đã có lỗi xảy ra. Vui lòng thử lại.");
        } else {
            throw new Error("Không thể kết nối đến máy chủ.");
        }
    }
};

// Delete category
export const deleteProductAPI = async (productId) => {
    try {
        await axiosInstance.delete(`${API.PRODUCTS}/${productId}`);
        return { message: "Product đã xóa thành công." };
    } catch (error) {
        console.log(error.response.status);
        if ((error.response && error.response.status === 401) || error.response.status === 403) {
            throw new Error("Unauthorized");
        } else if (error.response) {
            throw new Error("Đã có lỗi xảy ra. Vui lòng thử lại.");
        } else {
            throw new Error("Không thể kết nối đến máy chủ.");
        }
    }
};

