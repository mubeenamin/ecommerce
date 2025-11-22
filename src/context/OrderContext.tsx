"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order, CartItem } from "@/types";

interface OrderContextType {
    orders: Order[];
    placeOrder: (userId: string, userEmail: string, items: CartItem[], total: number) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("orders");
        if (saved) {
            setOrders(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            localStorage.setItem("orders", JSON.stringify(orders));
        }
    }, [orders]);

    const placeOrder = (userId: string, userEmail: string, items: CartItem[], total: number) => {
        const newOrder: Order = {
            id: Date.now().toString(),
            userId,
            userEmail,
            items,
            total,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        setOrders((prev) => [newOrder, ...prev]);
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
}
