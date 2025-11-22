"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function CartPage() {
    const { items, removeFromCart, cartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const { user } = useAuth();
    const router = useRouter();

    const handleCheckout = () => {
        if (!user) {
            router.push("/login?redirect=/cart");
            return;
        }

        placeOrder(user.id, user.email, items, cartTotal);
        clearCart();
        alert("Order placed successfully!");
        router.push("/dashboard/orders"); // Redirect to orders or a thank you page
    };

    if (items.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Your Cart</h1>
                <div className={styles.empty}>
                    <p>Your cart is empty.</p>
                    <Link href="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Cart</h1>

            <div className={styles.list}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.imageWrapper}>
                            <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className={styles.itemDetails}>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <p className={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <div className={styles.actions}>
                            <span className={styles.quantity}>${(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={`${styles.row} ${styles.total}`}>
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                    className={`btn btn-primary ${styles.checkoutBtn}`}
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
