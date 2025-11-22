"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.heading}>Nexus Store</h3>
                        <p className={styles.text}>Elegant tailoring for the modern woman. Discover your perfect fit with our premium suit collection.</p>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.subheading}>Shop</h4>
                        <ul className={styles.list}>
                            <li><Link href="/products" className={styles.link}>All Collections</Link></li>
                            <li><Link href="/category/formal" className={styles.link}>Formal Wear</Link></li>
                            <li><Link href="/category/casual-chic" className={styles.link}>Casual Chic</Link></li>
                            <li><Link href="/category/party-wear" className={styles.link}>Party Wear</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.subheading}>Support</h4>
                        <ul className={styles.list}>
                            <li><Link href="#" className={styles.link}>Help Center</Link></li>
                            <li><Link href="#" className={styles.link}>Shipping & Returns</Link></li>
                            <li><Link href="#" className={styles.link}>Warranty</Link></li>
                            <li><Link href="#" className={styles.link}>Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.subheading}>Stay Updated</h4>
                        <p className={styles.text}>Subscribe to our newsletter for the latest drops.</p>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" className={styles.input} />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>&copy; {new Date().getFullYear()} Nexus Store. All rights reserved.</p>
                    <div className={styles.socials}>
                        {/* Social icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
