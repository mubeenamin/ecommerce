export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  password?: string; // In a real app, never store plain passwords
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string; // For display purposes
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
