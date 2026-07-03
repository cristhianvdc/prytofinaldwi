export type Role = 'ADMIN' | 'CLIENT';

export interface AuthResponse {
  token: string;
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minimumStock: number;
  size?: string;
  color?: string;
  variants: ProductVariant[];
  imageUrl?: string;
  active: boolean;
  featured: boolean;
  createdAt: string;
}

export interface ProductVariant {
  id?: number;
  sku?: string;
  size: string;
  color: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  variantId?: number;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  total: number;
  shippingAddress: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export interface DashboardStats {
  products: number;
  clients: number;
  orders: number;
  messages: number;
  revenue: number;
  lowStock: number;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  answered: boolean;
  createdAt: string;
}
