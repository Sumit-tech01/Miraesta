import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createPaymentOrder, verifyPayment, markPaymentFailed } from '../services/checkoutService';

export default function Checkout({ onClose, onSuccess }) {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState('address'); // address | payment | success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const handleAddressSubmit = () => {
    if (!address.name || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.postalCode) {
      setError('Please fill all required fields');
      return;
    }
    if (address.phone.length !== 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handlePayment = async () => {
    if (!user) {
      setError('Please sign in to continue');
      return;
    }

    // Mock mode when Razorpay keys are missing/placeholder.
    const IS_TEST_MODE = !import.meta.env.VITE_RAZORPAY_KEY_ID ||
      import.meta.env.VITE_RAZORPAY_KEY_ID === 'rzp_test_placeholder';

    setLoading(true);
    setError('');

    try {
      const orderItems = items.map(item => ({
        productId: item.id,
        name: item.name,
        brand: item.brand,
        image: item.image,
        price: item.price,
        quantity: item.qty,
        size: item.size || 'M'
      }));

      const orderData = await createPaymentOrder({
        items: orderItems,
        shippingAddress: address,
        totalAmount: totalPrice
      });

      setOrderId(orderData.orderId);

      if (IS_TEST_MODE) {
        // Simulate successful payment in test mode (no Razorpay modal)
        await verifyPayment({
          razorpay_order_id: orderData.razorpayOrderId || 'test_order_id',
          razorpay_payment_id: 'test_payment_' + Date.now(),
          razorpay_signature: 'test_signature',
          orderId: orderData.orderId
        });
        clearCart();
        setStep('success');
        setLoading(false);
        return;
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Miraesta',
          description: 'Fashion Purchase',
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: address.name,
            contact: address.phone,
            email: user.email || ''
          },
          theme: { color: '#000000' },
          handler: async (response) => {
            try {
              await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderData.orderId
              });
              clearCart();
              setStep('success');
              if (onSuccess) onSuccess();
            } catch (err) {
              setError('Payment verification failed. Contact support.');
            }
          },
          modal: {
            ondismiss: async () => {
              await markPaymentFailed(orderData.orderId);
              setError('Payment cancelled');
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', async (response) => {
          await markPaymentFailed(orderData.orderId);
          setError('Payment failed: ' + response.error.description);
          setLoading(false);
        });
        rzp.open();
      };

    } catch (err) {
      setError(err.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-[440px] mx-4 p-10 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[20px] font-semibold uppercase tracking-wide mb-2">Order Confirmed</h2>
          <p className="text-[13px] text-[#666] mb-8">Thank you for your purchase! You will receive a confirmation soon.</p>
          <button
            onClick={onClose}
            className="w-full h-[44px] bg-black text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#333] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 overflow-y-auto p-4">
      <div className="bg-white w-full max-w-[500px] mx-auto my-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[56px] border-b border-[#e5e5e5]">
          <div className="flex items-center gap-3">
            <span className={`text-[12px] font-bold uppercase tracking-wide ${step === 'address' ? 'text-black' : 'text-[#999]'}`}>
              1. Address
            </span>
            <span className="text-[#ccc]">→</span>
            <span className={`text-[12px] font-bold uppercase tracking-wide ${step === 'payment' ? 'text-black' : 'text-[#999]'}`}>
              2. Payment
            </span>
          </div>
          <button onClick={onClose} className="text-[#999] hover:text-black text-xl">×</button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[12px]">
              {error}
            </div>
          )}

          {/* ADDRESS STEP */}
          {step === 'address' && (
            <div className="space-y-3">
              <h3 className="text-[14px] font-semibold uppercase tracking-wide mb-4">Shipping Address</h3>
              {[
                { key: 'name', label: 'Full Name *', type: 'text' },
                { key: 'phone', label: 'Phone Number * (10 digits)', type: 'tel' },
                { key: 'addressLine1', label: 'Address Line 1 *', type: 'text' },
                { key: 'addressLine2', label: 'Address Line 2 (optional)', type: 'text' },
                { key: 'city', label: 'City *', type: 'text' },
                { key: 'state', label: 'State *', type: 'text' },
                { key: 'postalCode', label: 'Pincode *', type: 'text' },
              ].map(field => (
              <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.label}
                  value={address[field.key]}
                  onChange={e => setAddress({...address, [field.key]: e.target.value})}
                  className="w-full border border-[#e5e5e5] px-4 py-3 text-[13px] outline-none focus:border-black"
                />
              ))}
              <button
                onClick={handleAddressSubmit}
                className="w-full h-[44px] bg-black text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#333] transition-colors mt-2"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* PAYMENT STEP */}
          {step === 'payment' && (
            <div>
              <h3 className="text-[14px] font-semibold uppercase tracking-wide mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6 max-h-[240px] overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-[#f0f0f0]">
                    <img src={item.image} alt={item.name} className="w-[60px] h-[80px] object-cover object-top bg-[#f5f5f5]" />
                    <div className="flex-1">
                      <p className="text-[11px] text-[#999] uppercase">{item.brand}</p>
                      <p className="text-[12px] font-medium">{item.name}</p>
                      <p className="text-[12px] text-[#666] mt-1">Qty: {item.qty}</p>
                    </div>
                    <p className="text-[13px] font-semibold">₹{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e5e5e5] pt-4 mb-6">
                <div className="flex justify-between text-[12px] text-[#666] mb-1">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[12px] text-[#666] mb-1">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-[14px] font-bold mt-2">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-4 mb-4 text-[12px] text-[#666]">
                <p className="font-semibold text-black mb-1">Accepted Payments</p>
                <p>UPI · QR Code · Credit/Debit Card · Net Banking · Wallets</p>
                <p className="mt-1 text-[11px]">Powered by Razorpay — 100% secure</p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full h-[44px] bg-black text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#333] transition-colors disabled:opacity-50"
              >
                {loading ? 'Opening Payment...' : `Pay ₹${totalPrice.toLocaleString()}`}
              </button>
              <button
                onClick={() => setStep('address')}
                className="w-full h-[44px] mt-2 border border-[#e5e5e5] text-black text-[12px] font-bold tracking-wider uppercase hover:bg-[#f5f5f5] transition-colors"
              >
                Back to Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
