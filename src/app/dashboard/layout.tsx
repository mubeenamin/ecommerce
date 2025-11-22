"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Wait a bit for auth state to initialize if needed, 
        // but since we use localStorage, it should be fast.
        // In a real app, we'd have a loading state.
        const checkAuth = () => {
            const savedUser = localStorage.getItem("currentUser");
            if (!savedUser) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [router]);

    if (!isAuthenticated) {
        return null; // Or a loading spinner
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", paddingTop: "80px" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "2rem", backgroundColor: "var(--background)" }}>
                {children}
            </main>
        </div>
    );
}
