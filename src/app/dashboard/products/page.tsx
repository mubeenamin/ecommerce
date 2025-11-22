"use client";

import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import styles from "../page.module.css";

export default function ProductsPage() {
    const { products, deleteProduct } = useProducts();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Products Management</h1>
                <Link href="/dashboard/products/add" className="btn btn-primary">
                    Add New Product
                </Link>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </div>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td className={styles.actions}>
                                <Link href={`/dashboard/products/edit/${product.id}`} className={styles.editBtn}>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this product?")) {
                                            deleteProduct(product.id);
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
