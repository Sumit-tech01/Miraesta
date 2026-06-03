import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Function to pull the latest cart from local storage
  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem('miraesta_cart') || '[]');
    setCartItems(items);
  };

  useEffect(() => {
    loadCart(); // Load on mount
    
    // Listen for the custom event we dispatch from ProductDetail.jsx
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const handleRemove = (id, size) => {
    const updatedCart = cartItems.filter(item => !(item.id === id && item.size === size));
    localStorage.setItem('miraesta_cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated')); // Tell the rest of the app
  };

  const handleCheckout = () => {
    onClose();
    navigate('/login'); // Forces unauthenticated users to our new Auth page
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans text-black">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-[1px] border-solid border-gray-200">
          <h2 className="text-sm font-bold tracking-[0.15em] uppercase">Your Bag ({cartItems.length})</h2>
          <button onClick={onClose} className="text-xl hover:text-gray-500 transition-colors">✕</button>
        </div>
        
        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <p className="text-xs uppercase tracking-widest">Your bag is empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-24 h-32 bg-gray-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow pt-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-bold uppercase tracking-widest leading-relaxed pr-4">{item.name}</h3>
                      <p className="text-xs tracking-wider font-medium whitespace-nowrap">₹ {item.price}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Size: {item.size}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    <button 
                      onClick={() => handleRemove(item.id, item.size)}
                      className="text-[10px] uppercase tracking-widest text-gray-400 underline underline-offset-4 hover:text-red-500 transition-colors mt-auto w-max"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t-[1px] border-solid border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">Subtotal</span>
              <span className="text-sm font-bold tracking-wider">₹ {total}</span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full py-4 text-xs font-bold tracking-[0.2em] uppercase bg-black text-white hover:bg-gray-900 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
