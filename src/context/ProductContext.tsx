"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types";
import { products as initialProducts } from "@/lib/products";

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    // Load initial data
    useEffect(() => {
        // Check if we have data in localStorage
        const saved = localStorage.getItem("products_v2");
        if (saved) {
            setProducts(JSON.parse(saved));
        } else {
            setProducts(initialProducts);
        }
    }, []);

    // Save to localStorage whenever products change
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products_v2", JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (product: Product) => {
        setProducts((prev) => [...prev, product]);
    };

    const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
        );
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
