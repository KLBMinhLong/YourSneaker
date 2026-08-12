import { api } from './axios';
import { ApiResponse } from '../types';
import { OrderResponse } from './ordersApi';

export interface PaymentResponse {
  success: boolean;
  paymentUrl: string;
  message: string;
}

export const paymentApi = {
  createVnPayUrl: async (orderId: string): Promise<PaymentResponse> => {
    const response = await api.post<PaymentResponse>('/payment/create-vnpay-url', { orderId });
    return response.data;
  },

  processVnPayReturn: async (queryString: string): Promise<ApiResponse<OrderResponse>> => {
    const response = await api.get<ApiResponse<OrderResponse>>(`/payment/vnpay-return?${queryString}`);
    return response.data;
  },
};
