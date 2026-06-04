import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import InfoPage from './pages/InfoPage';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { getProducts } from './services/productService';
import { getCategories } from './services/categoryService';

export default function App() {
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const safeProducts = Array.isArray(allProducts) ? allProducts : [];
        setProducts(safeProducts.slice(0, 12));
        setTrendingProducts(safeProducts.slice(0, 12));
        const allCategories = await getCategories();
        setCategories(allCategories);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <p className="mt-2 text-[#666]">Loading...</p>
            </div>
          </div>
        </AuthProvider>
      </CartProvider>
    );
  }

  if (error) {
    return (
      <CartProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#666]">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-[#333] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </AuthProvider>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home products={products} trendingProducts={trendingProducts} categories={categories} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            <Route path="/shop/:gender" element={<CategoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home products={products} trendingProducts={trendingProducts} categories={categories} />} />
          </Routes>
          <Footer />
          <CartDrawer />
        </div>
      </AuthProvider>
    </CartProvider>
  );
}