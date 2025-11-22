"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import styles from "./ProductSlider.module.css";

interface ProductSliderProps {
    products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
    const [current, setCurrent] = useState(0);
    const length = products.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [length]);

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(products) || products.length <= 0) {
        return null;
    }

    return (
        <div className={styles.sliderContainer}>
            <button className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
                &#10094;
            </button>
            <button className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
                &#10095;
            </button>

            {products.map((product, index) => (
                <div
                    className={`${styles.slide} ${index === current ? styles.active : ""}`}
                    key={product.id}
                >
                    {index === current && (
                        <>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className={styles.image}
                                    priority
                                />
                            </div>
                            <div className={styles.content}>
                                <h2 className={styles.title}>{product.name}</h2>
                                <p className={styles.description}>{product.description}</p>
                                <Link href={`/products/${product.id}`} className="btn btn-primary">
                                    View Product
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <div className={styles.controls}>
                {products.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === current ? styles.active : ""}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
}
