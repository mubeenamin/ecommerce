"use client";

import { useState } from "react";
import { useCategories } from "@/context/CategoryContext";
import styles from "../page.module.css";

export default function CategoriesPage() {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCategory, setNewCategory] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setNewCategory("");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Categories Management</h1>
            </div>

            <div style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category Name"
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Add Category</button>
                </form>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td className={styles.actions}>
                                <button
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this category?")) {
                                            deleteCategory(category.id);
                                        }
                                    }}
                                    className={styles.deleteBtn}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
