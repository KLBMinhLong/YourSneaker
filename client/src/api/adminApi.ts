import { api } from './axios';
import { ApiResponse, Product, CreateProductRequest } from '../types';
import { OrderResponse } from './ordersApi';

export interface TopSellingProduct {
  productId: string;
  productName: string;
  productImageUrl: string;
  price: number;
  totalQuantitySold: number;
  totalRevenue: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: OrderResponse[];
  topSellingProducts: TopSellingProduct[];
}

export const adminApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get<ApiResponse<DashboardStats>>('/admin/dashboard/stats');
    return response.data;
  },

  getAllOrders: async (): Promise<ApiResponse<OrderResponse[]>> => {
    const response = await api.get<ApiResponse<OrderResponse[]>>('/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: number): Promise<ApiResponse<OrderResponse>> => {
    const response = await api.patch<ApiResponse<OrderResponse>>(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  createProduct: async (data: CreateProductRequest): Promise<ApiResponse<Product>> => {
    const response = await api.post<ApiResponse<Product>>('/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: CreateProductRequest): Promise<ApiResponse<Product>> => {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<ApiResponse<boolean>> => {
    const response = await api.delete<ApiResponse<boolean>>(`/products/${id}`);
    return response.data;
  },

  uploadImage: async (file: File): Promise<{ success: boolean; imageUrl: string; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ success: boolean; imageUrl: string; message: string }>('/products/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
