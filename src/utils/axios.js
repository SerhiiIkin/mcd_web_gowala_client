import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_SERVER,
});

export const axiosGetProducts = async () => {
    try {
        const { data } = await axiosInstance.get("products");
        return data.data;
    } catch (error) {
        console.log("Error fetching products:", error);
        toast.error("Error fetching products");
    }
};

export const axiosGetProduct = async (id) => {
    try {
        const { data } = await axiosInstance.get(`product/${id}`);
        return data.data;
    } catch (error) {
        console.log("Error fetching product:", error);
        toast.error("Error fetching product");
    }
}


export const axiosRemoveProduct = async (id) => {
    try {
        const { data } = await axiosInstance.delete(`product/${id}`);
        return data;
    } catch (error) {
        console.log("Error removing product:", error);
        toast.error("Error removing product");
    }
};

export const axiosAddProduct = async (formData) => {
    try {
        const { data } = await axiosInstance.post("product", formData);
        return data;
    } catch (error) {
        console.log("Error adding product:", error);
        toast.error("Error adding product");
    }
};

export const axiosUpdateProduct = async (formData) => {
    try {
        const { data } = await axiosInstance.put(`product`, formData);
        return data;
    } catch (error) {
        console.log("Error updating product:", error);
        toast.error("Error updating product");
    }
};

export const axiosGetEmployees = async () => {
    try {
        const { data } = await axiosInstance.get("employees");
        return data.data;
    } catch (error) {
        console.log("Error fetching employees:", error);
        toast.error("Error fetching employees");
    }
};

export const axiosSubscribe = async (email) => {
    try {
        const { data } = await axiosInstance.post("subscription", { email });
        return data;
    } catch (error) {
        console.log("Error subscribing:", error);
        toast.error(error.response.data.message);
    }
};

export const axiosGetArticles = async () => {
    try {
        const { data } = await axiosInstance.get("articles");
        return data.data;
    } catch (error) {
        console.log("Error fetching articles:", error);
        toast.error("Error fetching articles");
    }
};

export const axiosSendMessage = async (message) => {
    try {
        const { data } = await axiosInstance.post("message", message);
        return data;
    } catch (error) {
        console.log("Error sending message:", error);
        toast.error("Error sending message");
    }
};

export const axiosAddOrder = async (order) => {
    try {
        const { data } = await axiosInstance.post("order", order);
        return data;
    } catch (error) {
        console.log("Error adding order:", error);
        toast.error("Error adding order");
    }
};
