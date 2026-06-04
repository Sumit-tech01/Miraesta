import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryPage() {
  const { gender } = useParams(); // 'mens' or 'womens'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Intelligent Frontend Sorting Logic
        const filtered = data.filter(product => {
          const searchStr = (product.name + " " + (product.description || "")).toLowerCase();
          
          if (gender === 'womens') {
            return searchStr.includes('women') || searchStr.includes('crop') || searchStr.includes('dress') || searchStr.includes('skirt') || searchStr.includes('sweatshirt') || searchStr.includes('geometric');
          } else {
            return searchStr.includes('men') || searchStr.includes('cargo') || searchStr.includes('bomber') || searchStr.includes('shearling') || searchStr.includes('jacket') || searchStr.includes('tee');
          }
        });
        
        // Fallback: Ensure page isn't empty if keyword sorting misses
        setProducts(filtered.length > 0 ? filtered : data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [gender]);

  if (loading) return <div className="min-h-screen flex items-center justify-center tracking-widest text-xs uppercase pt-32">Curating Collection...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 font-sans bg-white text-black min-h-screen pt-40">
      <h1 className="text-xl md:text-2xl tracking-[0.2em] uppercase font-semibold mb-12 text-center border-b border-gray-200 pb-8">
        {gender === 'womens' ? "Women's Collection" : "Men's Collection"}
      </h1>
      
      {products.length === 0 ? (
        <p className="text-center text-xs uppercase tracking-widest text-gray-500">No items found in this collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link to={`/product/${product._id || product.id}`} key={product._id || product.id} className="group cursor-pointer block">
              <div className="bg-gray-100 aspect-[3/4] overflow-hidden mb-4 relative">
                <img 
                  src={product.image || product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end p-4">
                   <span className="bg-white text-black px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full text-center">
                     Quick View
                   </span>
                </div>
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-2 truncate">{product.name}</h3>
              <p className="text-[11px] text-gray-500 tracking-wider">₹ {product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
