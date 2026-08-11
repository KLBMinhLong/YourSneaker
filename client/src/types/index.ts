export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'Customer' | 'Admin';
}

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  role: 'Customer' | 'Admin';
  accessToken: string;
  refreshToken: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  brand: string;
  isFeatured: boolean;
  isNewRelease: boolean;
  rating: number;
  reviewCount: number;
  categoryId: string;
  categoryName: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  brand: string;
  categoryId: string;
  isFeatured: boolean;
  isNewRelease: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
