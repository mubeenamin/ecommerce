"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCategories } from "@/context/CategoryContext";
import { useOrders } from "@/context/OrderContext";
import styles from "./page.module.css";

export default function DashboardOverview() {
    const { products } = useProducts();
    const { categories } = useCategories();
    const { orders } = useOrders();

    const stats = [
        { label: "Total Products", value: products.length, color: "#3b82f6" },
        { label: "Total Categories", value: categories.length, color: "#8b5cf6" },
        { label: "Total Orders", value: orders.length, color: "#10b981" },
        { label: "Revenue", value: `$${orders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}`, color: "#f59e0b" },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
            </div>

            <div className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.card} style={{ borderLeft: `4px solid ${stat.color}` }}>
                        <h3 className={styles.statLabel}>{stat.label}</h3>
                        <p className={styles.statValue}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className={styles.gridTwo}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Recent Orders</h2>
                    {orders.length > 0 ? (
                        <ul className={styles.list}>
                            {orders.slice(0, 5).map(order => (
                                <li key={order.id} className={styles.listItem}>
                                    <span>Order #{order.id.slice(-4)}</span>
                                    <span style={{ fontWeight: '600' }}>${order.total.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: 'var(--foreground-muted)' }}>No recent orders</p>
                    )}
                    <Link href="/dashboard/orders" className={styles.linkAction}>View All Orders &rarr;</Link>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Quick Actions</h2>
                    <div className={styles.quickActions}>
                        <Link href="/dashboard/products/add" className="btn btn-primary" style={{ textAlign: 'center' }}>Add New Product</Link>
                        <Link href="/dashboard/categories" className="btn btn-outline" style={{ textAlign: 'center' }}>Manage Categories</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
