"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import { useCategories } from "@/context/CategoryContext";
import styles from "../../form.module.css";

export default function AddProductPage() {
    const router = useRouter();
    const { addProduct } = useProducts();
    const { categories } = useCategories();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addProduct({
            id: Date.now().toString(),
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image || "https://images.unsplash.com/photo-1550009158-9ebf690be655?w=800&q=80",
        });
        router.push("/dashboard/products");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Add New Product</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.group}>
                    <label className={styles.label} htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={styles.input}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.input}
                    />
                    {preview && (
                        <div style={{ marginTop: '10px' }}>
                            <Image
                                src={preview}
                                alt="Preview"
                                width={200}
                                height={200}
                                style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px' }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.group}>
                    <label className={styles.label} htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.textarea}
                        required
                    />
                </div>

                <div className={styles.actions}>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                    <button type="button" onClick={() => router.back()} className="btn btn-outline">Cancel</button>
                </div>
            </form>
        </div>
    );
}
