import http from "@/core/axios/http";

interface MoonPayCallbackData {
  status: string;
  contractId: string;
  engagementId: string;
  walletAddress: string;
  transactionId: string;
}

export const verifyMoonPayPayment = async (transactionId: string) => {
  try {
    const response = await http.get(`/api/verify-moonpay-txn?transactionId=${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying MoonPay payment:", error);
    throw error;
  }
};

export const processPaymentCallback = async (data: MoonPayCallbackData) => {
  try {
    const response = await http.post('/api/moonpay-callback', data);
    return response.data;
  } catch (error) {
    console.error("Error processing MoonPay callback:", error);
    throw error;
  }
};