
import axiosInstance from "../config/axiosConfig/axios.config";
import { API } from "../constants/hostAPI/hostAPI";
// cal API
export const fetchCategoriesApi = async () => {
    try {
        const response = await axiosInstance.get(API.CATEGORY);
        return response.data;
    } catch (error) {
        console.error("Error fetching CATEGORY data:", error);
        throw error;
    }
};

export const fetchCategoryAPIByID = async (id) => {
    try {
        const response = await axiosInstance.get(`${API.CATEGORY}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        throw error;
    }
};


// Create category
// category_create => {name: ""}
export const createCategoryAPI = async (category_create) => {
    const response = await axiosInstance.post(API.PRODUCTS, category_create);
    return response.data;
};


export const updateProductsAPI = async (category_update) => {
    const response = await axiosInstance.put(`${API.PRODUCTS}/${category_update.id}`, category_update);
    return response.data;
};

// Delete category
export const delProductById = async (category_id) => {
    await axiosInstance.delete(`${API.PRODUCTS}/${category_id}`);
};

