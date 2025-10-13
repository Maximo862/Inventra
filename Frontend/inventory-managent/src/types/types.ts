export interface User {
  username?: string;
  email: string;
  password: string;
}

export interface Product {
    readonly id? : number
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
  user_id?: number;
}