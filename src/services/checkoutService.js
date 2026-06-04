import apiFetch from './api';

// Create Razorpay order + DB order
export const createPaymentOrder = async (orderData) => {
  return apiFetch('/payment/create-order', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
};

// Verify payment after Razorpay callback
export const verifyPayment = async (paymentData) => {
  return apiFetch('/payment/verify', {
    method: 'POST',
    body: JSON.stringify(paymentData)
  });
};

// Mark payment as failed
export const markPaymentFailed = async (orderId) => {
  return apiFetch('/payment/failed', {
    method: 'POST',
    body: JSON.stringify({ orderId })
  });
};
