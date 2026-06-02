import { useState, useEffect, useRef } from 'react';
import SpinWheel from './SpinWheel';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';


const menuItems = [
  {
    label: 'New Today',
    submenu: {
      columns: [
        { title: 'Trending Now', links: ['Best Sellers', 'New Arrivals', 'Back In Stock', 'Coming Soon'] },
        { title: 'Shop By Category', links: ['Oversized Tees', 'Sweatshirts', 'Bottoms', 'Co-Ords'] },
        { title: 'Curated Edits', links: ['Street Style', 'Weekend Vibes', 'Night Out', 'Campus Ready'] },
      ],
    },
  },
  {
    label: 'Clothing',
    submenu: {
      columns: [
        { title: 'All Clothing', links: ['Oversized Tees', 'Graphic Tees', 'Crop Tops', 'Tank Tops'] },
        { title: 'Bottoms', links: ['Cargo Pants', 'Joggers', 'Shorts', 'Jeans'] },
        { title: 'Outerwear', links: ['Pullovers', 'Hoodies', 'Crewnecks', 'Zip-Ups'] },
      ],
    },
  },
  {
    label: 'Dresses',
    submenu: {
      columns: [
        { title: 'All Dresses', links: ['Mini', 'Midi', 'Maxi', 'Bodycon'] },
        { title: 'By Occasion', links: ['Party', 'Casual', 'Date Night', 'Festival'] },
      ],
    },
  },
  {
    label: 'Shoes',
    submenu: {
      columns: [
        { title: 'All Shoes', links: ['Sneakers', 'Boots', 'Sandals', 'Heels'] },
        { title: 'By Brand', links: ['Converse', 'Nike', 'Adidas', 'Vans'] },
      ],
    },
  },
  {
    label: 'Accessories',
    submenu: {
      columns: [
        { title: 'All Accessories', links: ['Chains', 'Rings', 'Caps', 'Socks', 'Bags'] },
        { title: 'Featured', links: ['New Drops', 'Best Sellers', 'Gift Sets'] },
      ],
    },
  },
  { label: 'Designers', submenu: null },
  { label: 'Shops', submenu: null },
  { label: 'Hot List', submenu: null },
  { label: 'Sale', submenu: null },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const { totalItems, setIsOpen } = useCart();
  const { user, login, register, logout, showSpinWheel, setShowSpinWheel } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const timeoutRef = useRef(null);

  const handleSpinClose = () => {
    if (user) {
      localStorage.setItem('miraesta_spun_' + (user._id || user.email), 'true');
    }
    setShowSpinWheel(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 100);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        {/* Row 1: Top utility bar — visible on ALL screens */}
        <div className="border-b border-[#e5e5e5]">
          <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-[32px] min-h-[32px]">
            {/* Left — empty or brand links */}
            <div className="flex items-center gap-2"></div>

            {/* Right — utility links — visible on ALL screens */}
            <div
              className="flex items-center gap-1 text-[10px] sm:text-[11px] text-black overflow-x-auto whitespace-nowrap scrollbar-none"
            >
              <span>🇮🇳</span>
              <span className="mx-1 text-[#ccc]">|</span>
              <span>EN</span>
              <span className="mx-1 text-[#ccc]">|</span>
              <span>₹INR</span>
              <span className="hidden sm:inline ml-2">Need Help?</span>
              <svg
                className="hidden sm:inline w-3 h-3 ml-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              <span className="mx-1 text-[#ccc]">|</span>

              {/* Auth section — always visible */}
              {user ? (
                <div className="flex items-center gap-1 ml-1">
                  <button
                    onClick={() => setShowProfile(true)}
                    className="font-semibold hover:underline text-[10px] sm:text-[11px] max-w-[80px] truncate"
                  >
                    Hi, {user.name?.split(' ')[0] || 'Account'}
                  </button>
                  <span className="text-[#ccc]">|</span>
                  <button
                    onClick={logout}
                    className="font-semibold hover:underline text-[10px] sm:text-[11px]"
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode('login');
                  }}
                  className="ml-1 font-semibold text-[10px] sm:text-[11px] hover:underline"
                >
                  SIGN IN
                </button>
              )}
            </div>
          </div>
        </div>


        {/* Row 2: Logo + category tabs + search/icons — exact Revolve style */}
        <div className="border-b border-[#e5e5e5]">
          <div className="max-w-[1440px] mx-auto px-5 h-[52px] relative 
  flex items-center justify-between">

            {/* LEFT — hamburger on mobile, category tabs on desktop */}
            <div className="flex items-center min-w-[80px]">
              {/* Mobile Hamburger */}
              <button
                className="lg:hidden flex flex-col gap-[5px] p-2 -ml-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-[1.5px] bg-black transition-all 
        duration-250 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-black transition-all 
        duration-250 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-black transition-all 
        duration-250 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </button>

              {/* Desktop category tabs */}
              <div className="hidden lg:flex items-center gap-4">
                <a href="#" className="text-[12px] text-black underline 
        underline-offset-4 decoration-black">Womens</a>
                <a href="#" className="text-[12px] text-[#999] 
        hover:text-black transition-colors">Mens</a>
                <a href="#" className="text-[12px] text-[#999] 
        hover:text-black transition-colors">Beauty</a>
              </div>
            </div>

            {/* CENTER — Logo always centered */}
            <a href="/" className="absolute left-1/2 -translate-x-1/2 
    text-[22px] sm:text-[26px] font-normal tracking-[0.08em] 
    select-none whitespace-nowrap"
    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              MIRAESTA
            </a>

            {/* RIGHT — icons */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-[80px] 
    justify-end">
              {/* Search — desktop only */}
              <div className="hidden md:flex items-center border-b 
      border-[#ccc] pb-0.5">
                <span className="text-[12px] text-[#999] mr-2">Search</span>
                <input type="text" 
        className="w-[80px] lg:w-[100px] text-[12px] 
        outline-none bg-transparent" />
                <svg className="w-4 h-4 text-black" fill="none" 
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" 
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 
          7.5 0 0010.607 10.607z" />
                </svg>
              </div>


              {/* Mobile search icon */}
              <button className="md:hidden" aria-label="Search">
                <svg className="w-5 h-5 text-black" fill="none" 
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" 
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 
          7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Wishlist — hidden on small mobile */}
              <button className="hidden sm:block" aria-label="Wishlist">
                <svg className="w-5 h-5 text-black" fill="none" 
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" 
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
          0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313
          -2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 
          9-12z" />
                </svg>
              </button>

              {/* Bag */}
              <button className="relative" aria-label="Shopping bag" 
      onClick={() => setIsOpen(true)}>
                <svg className="w-5 h-5 text-black" fill="none" 
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" 
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356
          -1.993l1.263 12c.07.665-.45 1.243-1.119 
          1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 
          1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 
          0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 
          0 .375.375 0 01.75 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black 
          text-white text-[9px] w-4 h-4 rounded-full flex 
          items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Navigation — exact Revolve centered nav */}
        <div className="border-b border-[#e5e5e5] bg-white">
          <div className="max-w-[1440px] mx-auto px-5">
            <div className="hidden lg:flex items-center justify-center gap-0 h-[42px]">
              {menuItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="#"
                    className={`inline-block px-[14px] py-3 text-[12.5px] tracking-[0.02em] uppercase font-semibold transition-colors duration-200 ${
                      item.label === 'Sale' ? 'text-black' : 'text-black'
                    } hover:text-[#666]`}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenu !== null && menuItems[activeMenu].submenu && (
          <div
            className="absolute left-0 w-full bg-white border-b border-[#e5e5e5] shadow-sm hidden lg:block"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1440px] mx-auto px-10 py-8">
              <div className="flex gap-16">
                {menuItems[activeMenu].submenu.columns.map((col, i) => (
                  <div key={i} className="min-w-[160px]">
                    <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-black mb-4">
                      {col.title}
                    </h4>
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-[13px] text-[#666] hover:text-black transition-colors duration-200">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-in Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="pt-32 pb-8 px-6 h-full overflow-y-auto">
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <div key={item.label}>
                  <button
                    className="w-full flex items-center justify-between py-3 text-[13px] tracking-[0.04em] uppercase font-semibold text-black hover:text-[#666] transition-colors"
                    onClick={() => setMobileSubmenu(mobileSubmenu === index ? null : index)}
                  >
                    <span>{item.label}</span>
                    {item.submenu && (
                      <svg className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    )}
                  </button>
                  {item.submenu && mobileSubmenu === index && (
                    <div className="pb-3 pl-4">
                      {item.submenu.columns.map((col, ci) => (
                        <div key={ci} className="mb-4">
                          <p className="text-[10px] tracking-[0.08em] uppercase text-[#999] font-bold mb-2">{col.title}</p>
                          {col.links.map((link) => (
                            <a key={link} href="#" className="block py-1.5 text-[13px] text-black hover:text-[#666] transition-colors">
                              {link}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {showSpinWheel && <SpinWheel onClose={handleSpinClose} />}




      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-[400px] mx-4 p-8 relative">
            <button 
              onClick={() => { setShowAuthModal(false); setAuthError(''); }}
              className="absolute top-4 right-4 text-[#999] hover:text-black text-xl"
            >×</button>
            
            <h2 className="text-[18px] font-semibold tracking-wide mb-6 uppercase">
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>


            {authError && (
              <p className="text-red-500 text-[12px] mb-4">{authError}</p>
            )}

            <div className="space-y-4">
              {authMode === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={authForm.name}
                  onChange={e => setAuthForm({...authForm, name: e.target.value})}
                  className="w-full border border-[#e5e5e5] px-4 py-3 text-[13px] outline-none focus:border-black"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={authForm.email}
                onChange={e => setAuthForm({...authForm, email: e.target.value})}
                className="w-full border border-[#e5e5e5] px-4 py-3 text-[13px] outline-none focus:border-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={authForm.password}
                onChange={e => setAuthForm({...authForm, password: e.target.value})}
                className="w-full border border-[#e5e5e5] px-4 py-3 text-[13px] outline-none focus:border-black"
              />

              <button
                onClick={async () => {
                  setAuthError('');
                  setAuthLoading(true);
                  try {
                    if (authMode === 'login') {
                      await login({ email: authForm.email, password: authForm.password });
                    } else {
                      await register({ name: authForm.name, email: authForm.email, password: authForm.password });
                    }
                    setShowAuthModal(false);
                    setAuthForm({ name: '', email: '', password: '' });
                  } catch (err) {
                    setAuthError(err.message || 'Something went wrong');
                  } finally {
                    setAuthLoading(false);
                  }
                }}
                disabled={authLoading}
                className="w-full bg-black text-white py-3 text-[13px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors disabled:opacity-50"
              >
                {authLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              <p className="text-center text-[12px] text-[#666]">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }}
                  className="underline text-black font-semibold"
                >
                  {authMode === 'login' ? 'Register' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  );
}

