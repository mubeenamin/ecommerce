"use client";

import { useOrders } from "@/context/OrderContext";
import styles from "../page.module.css";

export default function OrdersPage() {
    const { orders, updateOrderStatus } = useOrders();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Orders Management</h1>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>#{order.id.slice(-6)}</td>
                            <td>{order.userEmail}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                <span
                                    style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.85rem',
                                        backgroundColor:
                                            order.status === 'completed' ? '#dcfce7' :
                                                order.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                                        color:
                                            order.status === 'completed' ? '#166534' :
                                                order.status === 'cancelled' ? '#991b1b' : '#92400e',
                                    }}
                                >
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </td>
                            <td className={styles.actions}>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
