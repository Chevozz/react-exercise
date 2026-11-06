
import React, { createContext, useContext } from "react";

import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import apiClient from "./apiClient";

// Membuat Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    // Mengakses React Query
    const queryClient = useQueryClient();

    // =====================================
    // 1. GET ALL PRODUCTS (READ)
    // =====================================

    const {
        data: products = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ["products"],

        queryFn: async () => {
            const res = await apiClient.get("/products");

            return res.data.data;
        }
    });


    // =====================================
    // 2. GET PRODUCT BY ID (SHOW)
    // =====================================

    const getProductById = async (id) => {
        const res = await apiClient.get(`/products/${id}`);

        return res.data.data;
    };


    // =====================================
    // 3. ADD PRODUCT (CREATE)
    // =====================================

    const addProduct = async (formData) => {
        const response = await apiClient.post(
            "/products",
            formData
        );

        // Refresh data produk
        await queryClient.invalidateQueries({
            queryKey: ["products"]
        });

        return response;
    };


    // =====================================
    // 4. UPDATE PRODUCT (UPDATE)
    // =====================================

    const updateProduct = async (id, formData) => {
        const response = await apiClient.post(
            `/products/${id}?_method=PUT`,
            formData
        );

        // Refresh data produk
        await queryClient.invalidateQueries({
            queryKey: ["products"]
        });

        return response;
    };


    // =====================================
    // 5. DELETE PRODUCT (DELETE)
    // =====================================

    const deleteProduct = useMutation({
        mutationFn: async (id) => {
            return await apiClient.delete(`/products/${id}`);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
        }
    });


    // =====================================
    // 6. GET ALL CATEGORIES
    // =====================================

    const getCategories = async () => {
        const res = await apiClient.get("/categories");

        return res.data;
    };


    // =====================================
    // 7. EXPORT DATA DAN FUNGSI
    // =====================================

    return (
        <ProductContext.Provider
            value={{
                products,
                isLoading,
                isError,

                getProductById,
                addProduct,
                updateProduct,
                deleteProduct,
                getCategories
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};


// Hook untuk menggunakan ProductContext
export const useProducts = () => useContext(ProductContext);
