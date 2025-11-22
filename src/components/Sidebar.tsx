"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Products", path: "/dashboard/products", icon: "🛍️" },
        { name: "Categories", path: "/dashboard/categories", icon: "🏷️" },
        { name: "Orders", path: "/dashboard/orders", icon: "📦" },
    ];

    return (
        <aside className={styles.sidebar}>
            <nav>
                <ul className={styles.menu}>
                    {menuItems.map((item) => (
                        <li key={item.path} className={styles.menuItem}>
                            <Link
                                href={item.path}
                                className={`${styles.link} ${pathname === item.path ? styles.active : ""
                                    }`}
                            >
                                <span className={styles.icon}>{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.userInfo}>
                <span className={styles.userEmail}>{user?.email}</span>
                <button onClick={logout} className={styles.logoutBtn}>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
