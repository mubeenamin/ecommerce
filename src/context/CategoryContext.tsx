"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Category } from "@/types";

interface CategoryContextType {
    categories: Category[];
    addCategory: (name: string) => void;
    deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const initialCategories: Category[] = [
    { id: "1", name: "Formal" },
    { id: "2", name: "Casual Chic" },
    { id: "3", name: "Party Wear" },
    { id: "4", name: "Summer Collection" },
    { id: "5", name: "Workwear" },
    { id: "6", name: "Luxury" },
];

export function CategoryProvider({ children }: { children: ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("categories");
        if (saved) {
            setCategories(JSON.parse(saved));
        } else {
            setCategories(initialCategories);
        }
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            localStorage.setItem("categories", JSON.stringify(categories));
        }
    }, [categories]);

    const addCategory = (name: string) => {
        const newCategory: Category = {
            id: Date.now().toString(),
            name,
        };
        setCategories((prev) => [...prev, newCategory]);
    };

    const deleteCategory = (id: string) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error("useCategories must be used within a CategoryProvider");
    }
    return context;
}
