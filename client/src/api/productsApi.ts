import { api } from './axios';
import { ApiResponse, PagedResult, Product, Category } from '../types';

export const productsApi = {
  getProducts: async (params?: {
    search?: string;
    categoryId?: string;
    brand?: string;
    sortBy?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PagedResult<Product>>> => {
    const response = await api.get<ApiResponse<PagedResult<Product>>>('/products', { params });
    return response.data;
  },

  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>('/products/featured');
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response = await api.get<ApiResponse<Product>>(`/products/slug/${slug}`);
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  },
};
