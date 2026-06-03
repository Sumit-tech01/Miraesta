import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartDrawer from './CartDrawer'; // Ensure this path matches your structure

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const items = JSON.parse(localStorage.getItem('miraesta_cart') || '[]');
      setCartCount(items.reduce((total, item) => total + item.quantity, 0));
    };
    
    // Load initial count and listen for changes
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Listen for the command to slide the drawer open
    const openCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', openCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('openCart', openCart);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white font-sans text-black flex flex-col">
        {/* Top Utility Row */}
        <div className="flex justify-end items-center px-4 md:px-8 py-2 text-[10px] uppercase tracking-widest text-gray-500 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-4">
            <span>EN</span>
            <span>₹INR</span>
            <Link to="/info/faq" className="hover:text-black transition-colors">Need Help?</Link>
            <Link to="/login" className="font-bold text-black hover:text-gray-600 transition-colors">Sign In</Link>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="flex justify-between items-center px-4 md:px-8 py-6 border-b-[1px] border-solid border-gray-200">
          
          {/* Left Links */}
          <div className="flex gap-6 text-[10px] md:text-xs uppercase tracking-[0.15em] flex-1">
            <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-black border-b-[1px] border-black pb-1" : "text-gray-400 hover:text-black transition-colors pb-1"}>Home</NavLink>
            <NavLink to="/shop/womens" className={({ isActive }) => isActive ? "font-bold text-black border-b-[1px] border-black pb-1" : "text-gray-400 hover:text-black transition-colors pb-1"}>Womens</NavLink>
            <NavLink to="/shop/mens" className={({ isActive }) => isActive ? "font-bold text-black border-b-[1px] border-black pb-1" : "text-gray-400 hover:text-black transition-colors pb-1"}>Mens</NavLink>
          </div>

          {/* Center Logo */}
          <div className="flex-1 text-center">
            <Link to="/" className="text-xl md:text-2xl font-medium tracking-[0.2em] uppercase">MIRAESTA</Link>
          </div>

          {/* Right Icons & Search */}
          <div className="flex gap-4 md:gap-6 items-center justify-end flex-1">
            
            {/* Minimalist Search Input */}
            <div className="hidden md:flex items-center border-b-[1px] border-solid border-gray-300 pb-1 w-32 lg:w-48">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full text-[10px] uppercase tracking-widest bg-transparent outline-none border-none placeholder-gray-400 text-black focus:ring-0"
              />
              <button className="text-gray-400 hover:text-black transition-colors ml-2 outline-none focus:outline-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>

            {/* Wishlist */}
            <button className="text-black hover:text-gray-500 transition-colors outline-none focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
            
            {/* Wired Bag Icon */}
            <button onClick={() => setIsCartOpen(true)} className="text-black relative hover:text-gray-500 transition-colors outline-none focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Secondary Navigation Row */}
        <div className="hidden md:flex justify-center items-center py-4 border-b-[1px] border-solid border-gray-200 gap-8 text-[10px] uppercase font-bold tracking-[0.15em] text-[#111111]">
          <Link to="/shop/mens" className="hover:text-gray-500 transition-colors">New Today</Link>
          <Link to="/shop/womens" className="hover:text-gray-500 transition-colors">Clothing</Link>
          <Link to="/shop/womens" className="hover:text-gray-500 transition-colors">Dresses</Link>
          <Link to="/shop/mens" className="hover:text-gray-500 transition-colors">Shoes</Link>
          <Link to="/shop/womens" className="hover:text-gray-500 transition-colors">Accessories</Link>
          <Link to="/shop/mens" className="hover:text-gray-500 transition-colors">Designers</Link>
          <Link to="/shop/mens" className="text-red-600 hover:text-red-400 transition-colors">Sale</Link>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
