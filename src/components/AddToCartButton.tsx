"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`btn btn-primary ${isAdded ? "btn-success" : ""}`}
            style={{ width: "100%", marginTop: "1rem" }}
        >
            {isAdded ? "Added to Cart!" : "Add to Cart"}
        </button>
    );
}
