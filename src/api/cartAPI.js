import axiosInstance from "../config/axiosConfig/axios.config";
import { API } from "../constants/hostAPI/hostAPI";

/**
 * Lấy tất cả giỏ hàng
 */
export const fetchCartsApi = async () => {
  try {
    const response = await axiosInstance.get(API.CARTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching CARTS data:", error);
    throw error;
  }
};

/**
 * Lấy giỏ hàng theo ID user
 */
export const fetchCartByIDApi = async (id) => {
  try {
    const response = await axiosInstance.get(`${API.CARTS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Products data:", error);
    throw error;
  }
};

/**
 * CHECKOUT: gọi backend trừ kho + xoá item trong giỏ
 * KHÔNG GỌI PAYPAL NỮA
 */
export const checkOutCartAPI = async (cartID) => {
  const response = await axiosInstance.post(`${API.CARTS}/${cartID}/checkout`);
  return response.data;
};

