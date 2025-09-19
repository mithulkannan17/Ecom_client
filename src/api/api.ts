import axios from "axios";
import { getToken } from "@/config/AuthConfig";

const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API,
});

// Attach token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Auth ----
export const AppLogin = (user: any) => axiosInstance.post("/login", user);
export const AppRegister = (user: any) => axiosInstance.post("/register", user);

// ---- Products ----
export const allProducts = () => axiosInstance.get("/products/all");
export const addProduct = (product: any) => axiosInstance.post("/products/add", product);
export const editProduct = (product: any, id: string) =>
  axiosInstance.put(`/products/edit/${id}`, product);
export const deleteProduct = (id: string) => axiosInstance.delete(`/products/delete/${id}`);

// ---- Users ----
export const allUsers = () => axiosInstance.get("/user/getAll");
export const addUser = (user: any) => axiosInstance.post("/user/addUser", user);
export const editUser = (user: any, id: string) =>
  axiosInstance.put(`/user/editUser/${id}`, user);
export const deleteUser = (id: string) => axiosInstance.delete(`/user/delete/${id}`);
export const getUserByID = (id: string) => axiosInstance.get(`/user/get/${id}`);

// ---- Orders ----
export const allOrders = () => axiosInstance.get("/orders/allDetails");
export const addOrder = (order: any) => axiosInstance.post("/orders/save", order);

// adjust this path if backend uses another route like `/orders/edit/:id`
export const updateOrder = (id: string, data: any) =>
  axiosInstance.put(`/orders/update/${id}`, data);
