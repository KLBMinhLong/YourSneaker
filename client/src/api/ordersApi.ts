import { api } from './axios';
import { ApiResponse } from '../types';

export interface CreateOrderItem {
  productId: string;
  selectedSize: string;
  quantity: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: number; // 0 = COD, 1 = VNPay
  items: CreateOrderItem[];
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderResponse {
  id: string;
  orderCode: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  note?: string;
  totalAmount: number;
  status: number; // 0=Pending, 1=Processing, 2=Shipped, 3=Delivered, 4=Cancelled
  paymentMethod: number;
  isPaid: boolean;
  createdAt: string;
  items: OrderItemResponse[];
}

export const ordersApi = {
  createOrder: async (data: CreateOrderRequest): Promise<ApiResponse<OrderResponse>> => {
    const response = await api.post<ApiResponse<OrderResponse>>('/orders', data);
    return response.data;
  },

  getMyOrders: async (): Promise<ApiResponse<OrderResponse[]>> => {
    const response = await api.get<ApiResponse<OrderResponse[]>>('/orders/my-orders');
    return response.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse<OrderResponse>> => {
    const response = await api.get<ApiResponse<OrderResponse>>(`/orders/${id}`);
    return response.data;
  },
};
