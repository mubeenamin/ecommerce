"use client";

import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";

export default function ProductsPage() {
    const { products } = useProducts();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>All Products</h1>
                <p className={styles.subtitle}>Explore our complete collection of premium gear.</p>
            </div>
            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
