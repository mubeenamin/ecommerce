"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock login logic
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find((u: User) => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
            return true;
        }

        // Default admin for testing if no users exist
        if (email === "admin@example.com" && password === "admin123") {
            const adminUser: User = {
                id: "admin-1",
                name: "Admin User",
                email: "admin@example.com",
                role: "admin",
            };
            setUser(adminUser);
            localStorage.setItem("currentUser", JSON.stringify(adminUser));
            return true;
        }

        return false;
    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u: User) => u.email === email)) {
            return false; // User already exists
        }

        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            role: "customer", // Default role
            password,
        };

        // If it's the first user, make them admin (optional, but good for testing)
        // if (users.length === 0) newUser.role = 'admin';

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Auto login after register
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
