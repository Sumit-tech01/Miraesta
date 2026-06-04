import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SizeGuideModal from '../components/SizeGuideModal';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Force browser to the top of the page on route change
    window.scrollTo(0, 0);
    
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setMainImage(data.image || data.imageUrl);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center tracking-widest text-xs uppercase">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center tracking-widest text-xs uppercase">Product Not Found</div>;

  // Fallback for multi-angle images if backend only provides one string currently
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || product.imageUrl, product.image || product.imageUrl, product.image || product.imageUrl]; 

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem = {
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      size: selectedSize,
      quantity: 1
    };

    const existingCart = JSON.parse(localStorage.getItem('miraesta_cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('miraesta_cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('openCart'));

    // Premium UI Feedback: Trigger success state instead of an alert
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Resets back to "ADD TO BAG" after 2 seconds
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-24 font-sans text-black bg-white pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Multi-Angle Image Gallery */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-4 md:gap-6 lg:h-[85vh] lg:sticky lg:top-24">
          {/* Vertical Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto w-full md:w-24 shrink-0 no-scrollbar">
            {galleryImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${product.name} angle ${idx + 1}`} 
                onClick={() => setMainImage(img)}
                className={`w-20 h-28 md:w-full md:h-32 object-cover cursor-pointer transition-opacity duration-300 hover:opacity-100 ${mainImage === img ? 'opacity-100 border-[1px] border-solid border-black' : 'opacity-60 border-[1px] border-solid border-transparent'}`}
              />
            ))}
          </div>
          
          {/* Main Large Image */}
          <div className="flex-1 w-full bg-gray-50 h-full relative">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-cover absolute inset-0" 
            />
          </div>
        </div>
        
        {/* Right: Product Details & Size Engine */}
        <div className="lg:col-span-4 flex flex-col pt-2 lg:pt-10">
          <h1 className="text-xl lg:text-2xl tracking-[0.1em] uppercase font-semibold mb-4 text-black">{product.name}</h1>
          <p className="text-sm tracking-widest mb-8 text-gray-900">₹ {product.price}</p>
          
          <div className="border-t-[1px] border-b-[1px] border-solid border-gray-200 py-6 mb-8">
             <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category || 'CLOTHING'} | {product.fitType || 'STANDARD FIT'}</p>
          </div>

          {/* Sizing Engine */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-black">Select Size</span>
              <button onClick={() => setIsSizeGuideOpen(true)} className="text-xs uppercase tracking-widest text-gray-500 underline underline-offset-4 hover:text-black transition-colors">
                Size Guide
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs tracking-widest uppercase transition-all duration-300 border-[1px] border-solid ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 bg-transparent text-black hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-[10px] text-red-500 mt-2 uppercase tracking-wide">* Please select a size</p>}
          </div>

          {/* Bulletproof Add to Bag Button */}
          <button 
            disabled={!selectedSize || isAdded}
            onClick={handleAddToCart}
            className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border-[1px] border-solid mb-12 ${
              !selectedSize 
                ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
                : isAdded
                ? 'bg-white border-black text-black cursor-default' 
                : 'bg-black border-black text-white hover:bg-gray-900 cursor-pointer'
            }`}
          >
            {isAdded ? 'Added ✓' : selectedSize ? 'Add to Bag' : 'Select a Size'}
          </button>

          {/* Composition & Care */}
          <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
            <p className="uppercase tracking-widest font-semibold text-black mb-2">Composition, Care & Origin</p>
            <p className="tracking-wide leading-loose">{product.description || 'Premium heavyweight fabric engineered for structure and comfort. Machine wash cold, hang dry to preserve the fit.'}</p>
          </div>
        </div>
      </div>
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} category={product.category} fitType={product.fitType} />
    </div>
  );
}
