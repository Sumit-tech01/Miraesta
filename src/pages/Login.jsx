import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/'); 
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 bg-white font-sans text-black pt-32">
      <div className="flex flex-col md:flex-row relative">
        
        {/* Returning Customer - Log In */}
        <div className="flex-1 md:pr-16 flex flex-col mb-16 md:mb-0">
          <h1 className="text-xl tracking-[0.15em] uppercase font-semibold mb-10 text-black">Log In</h1>
          <form onSubmit={handleLogin} className="flex flex-col space-y-10 flex-grow">
            <div>
              <input 
                type="email" 
                placeholder="EMAIL"
                required
                className="w-full border-b-[1px] border-solid border-gray-300 pb-3 pt-2 text-xs tracking-widest uppercase outline-none focus:border-black focus:border-b-[2px] transition-all bg-transparent placeholder-gray-400"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="PASSWORD"
                required
                className="w-full border-b-[1px] border-solid border-gray-300 pb-3 pt-2 text-xs tracking-widest uppercase outline-none focus:border-black focus:border-b-[2px] transition-all bg-transparent placeholder-gray-400"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            <div className="pt-8 mt-auto">
              <button type="submit" className="w-full bg-black text-white border-[1px] border-solid border-black hover:bg-gray-900 transition-colors duration-300 py-4 text-xs font-bold tracking-[0.15em] uppercase cursor-pointer">
                Log In
              </button>
            </div>
          </form>
        </div>

        {/* Physical Vertical Divider (Forces rendering) */}
        <div className="hidden md:block w-[1px] bg-gray-200 absolute left-1/2 top-0 bottom-0 -translate-x-1/2"></div>

        {/* New Customer - Register */}
        <div className="flex-1 md:pl-16 flex flex-col">
          <h1 className="text-xl tracking-[0.15em] uppercase font-semibold mb-6 text-black">Register</h1>
          <p className="text-xs text-gray-500 mb-10 leading-relaxed tracking-wide pr-4">
            Create an account to track your orders, manage your wishlist, and experience a faster checkout.
          </p>
          <form onSubmit={handleRegister} className="flex flex-col space-y-10 flex-grow">
            <div>
              <input 
                type="text" 
                placeholder="FULL NAME"
                required
                className="w-full border-b-[1px] border-solid border-gray-300 pb-3 pt-2 text-xs tracking-widest uppercase outline-none focus:border-black focus:border-b-[2px] transition-all bg-transparent placeholder-gray-400"
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="EMAIL"
                required
                className="w-full border-b-[1px] border-solid border-gray-300 pb-3 pt-2 text-xs tracking-widest uppercase outline-none focus:border-black focus:border-b-[2px] transition-all bg-transparent placeholder-gray-400"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="PASSWORD"
                required
                className="w-full border-b-[1px] border-solid border-gray-300 pb-3 pt-2 text-xs tracking-widest uppercase outline-none focus:border-black focus:border-b-[2px] transition-all bg-transparent placeholder-gray-400"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              />
            </div>
            <div className="pt-8 mt-auto">
              <button type="submit" className="w-full bg-white text-black border-[1px] border-solid border-black hover:bg-black hover:text-white transition-all duration-300 py-4 text-xs font-bold tracking-[0.15em] uppercase cursor-pointer shadow-none">
                Create Account
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
