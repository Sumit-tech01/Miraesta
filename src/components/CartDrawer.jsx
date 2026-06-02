import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Checkout from './Checkout';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] max-w-[100vw] sm:max-w-[90vw] bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[56px] border-b border-[#e5e5e5] flex-shrink-0">
          <h2 className="text-[14px] font-bold tracking-[0.06em] uppercase">
            Your Bag ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <svg className="w-12 h-12 text-[#ccc] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-[13px] text-[#666] mb-1">Your bag is empty</p>
              <p className="text-[11px] text-[#999]">Add items to get started</p>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[#f0f0f0]">
                  {/* Product Image */}
                  <div className="w-[90px] h-[120px] flex-shrink-0 bg-[#f5f5f5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] text-[#999] uppercase tracking-[0.04em]">
                          {item.brand}
                        </p>
                        <p className="text-[12px] text-black font-medium leading-tight mt-0.5 truncate">
                          {item.name}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 text-[#999] hover:text-black transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-[12px] text-black mt-2">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-0 mt-3 border border-[#e5e5e5] inline-flex">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[13px] hover:bg-[#f5f5f5] transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 h-7 flex items-center justify-center text-[12px] border-x border-[#e5e5e5]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[13px] hover:bg-[#f5f5f5] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — Subtotal + Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#e5e5e5] p-5 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-[#666]">Subtotal</span>
              <span className="text-[14px] font-semibold text-black">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-[#999] mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <button
              onClick={() => {
                if (!user) {
                  alert('Please sign in to checkout');
                  return;
                }
                setIsOpen(false);
                setShowCheckout(true);
              }}
              className="w-full h-[44px] bg-black text-white text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[#333] transition-colors"
            >
              Checkout
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full h-[44px] mt-2 border border-[#e5e5e5] text-black text-[12px] font-bold tracking-[0.06em] uppercase hover:bg-[#f5f5f5] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {showCheckout && (
        <Checkout
          onClose={() => setShowCheckout(false)}
          onSuccess={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
