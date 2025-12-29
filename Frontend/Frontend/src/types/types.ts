export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
  role: string;
}

export interface Product {
  readonly id?: number;
  name: string;
  price: number;
  stock: number;
  category_id: number | null;
  user_id?: number;
  suppliers_Id?: number[];
  expiration_date?: string | null;
  alert_threshold?: number | null;
  isActive?: boolean
}

export interface Supplier {
  readonly id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Category {
  readonly id?: number;
  name: string;
}

export interface Order {
  id?: number;
  quantity: number;
  type: "entrada" | "salida";
  total: number
  created_at?: string;
  updated_at?: string;
  product_id: number;
  user_id?: number;
}
