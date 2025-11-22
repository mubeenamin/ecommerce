"use client";

import Link from "next/link";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import ProductSlider from "@/components/ProductSlider";
import CategoryCard from "@/components/CategoryCard";
import { useProducts } from "@/context/ProductContext";

const categories = [
  { name: "Formal Wear", image: "https://images.unsplash.com/photo-1594938298603-c8148c472f81?w=800&q=80", href: "/category/formal" },
  { name: "Casual Chic", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80", href: "/category/casual-chic" },
  { name: "Party Wear", image: "https://images.unsplash.com/photo-1550614000-4b9519e0031a?w=800&q=80", href: "/category/party-wear" },
  { name: "Summer Collection", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", href: "/category/summer-collection" },
];

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);
  const sliderProducts = products.slice(0, 5);

  return (
    <div className={styles.page}>
      <ProductSlider products={sliderProducts} />

      <section className={`${styles.section} container`}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.grid}>
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      <section className={`${styles.section} container`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Featured Products</h2>
          <Link href="/products" className="btn btn-outline">View All</Link>
        </div>
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
