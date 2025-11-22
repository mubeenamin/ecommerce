"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    NEXUS
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.link}>
                        Home
                    </Link>
                    <Link href="/products" className={styles.link}>
                        Products
                    </Link>
                    <Link href="/dashboard" className={styles.link}>
                        Dashboard
                    </Link>
                    <Link href="/cart" className={styles.link}>
                        <div className={styles.cartBtn}>
                            Cart
                            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
