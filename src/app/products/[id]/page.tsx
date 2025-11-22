"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import styles from "./page.module.css";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";

export default function ProductPage() {
    const params = useParams();
    const { products } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            // useParams can return string or string[], ensure we get a single string ID
            const productId = Array.isArray(params.id) ? params.id[0] : params.id;
            const found = products.find((p) => p.id === productId);
            setProduct(found || null);
            setLoading(false);
        }
    }, [params.id, products]);

    if (loading) return <div className={styles.container}>Loading...</div>;
    if (!product) return <div className={styles.container}>Product not found</div>;

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    priority
                />
            </div>
            <div className={styles.details}>
                <div>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.title}>{product.name}</h1>
                </div>
                <div className={styles.price}>${product.price.toFixed(2)}</div>
                <p className={styles.description}>{product.description}</p>

                <AddToCartButton product={product} />

                <div className={styles.meta}>
                    <p>Free shipping on all orders</p>
                    <p>30-day money-back guarantee</p>
                </div>
            </div>
        </div>
    );
}
