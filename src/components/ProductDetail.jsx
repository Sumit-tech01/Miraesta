import { useState } from 'react';
import { useCart } from '../context/CartContext';
import SizeGuide from './SizeGuide';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail({ product, onBack }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCart();

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem({ ...product, size: selectedSize });
  };

  return (
    <>
      <div className="mt-[126px] max-w-[1440px] mx-auto px-5">
        {/* Breadcrumbs */}
        <div className="py-3 border-b border-[#e5e5e5]">
          <p className="text-[12px] text-[#666]">
            <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="text-[#666] hover:text-black transition-colors">
              {product.brand}
            </a>
            <span className="mx-1">/</span>
            <span className="text-black">{product.name}</span>
          </p>
        </div>

        {/* Main PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 pt-4 pb-16 items-start">
          {/* Left: Image Gallery */}
          <div className="relative">
            {/* Desktop Vertical Stack/Grid */}
            <div className="hidden md:grid grid-cols-2 gap-3 pr-8">
              {images.map((img, i) => (
                <div key={i} className={`bg-[#f5f5f5] aspect-[3/4] overflow-hidden relative group ${
                  images.length % 2 !== 0 && i === 0 ? 'col-span-2' : ''
                }`}>
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Swipeable Gallery with Active Preview */}
            <div className="md:hidden">
              <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-3">
                <img
                  src={images[mainImage]}
                  alt={`${product.name} view ${mainImage + 1}`}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                
                {/* Image Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setMainImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#e5e5e5] hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setMainImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#e5e5e5] hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(i)}
                      className={`flex-none w-16 aspect-[3/4] bg-[#f5f5f5] border transition-all ${
                        mainImage === i ? 'border-black' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Heart */}
            <button
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
              aria-label="Add to wishlist"
            >
              <svg className="w-5 h-5 text-[#999] hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          {/* Right: Product Info Panel */}
          <div className="lg:pl-8 pt-6 lg:pt-0 lg:sticky lg:top-[150px]">
            {/* Product Name */}
            <h1 className="text-[22px] font-semibold text-black leading-tight mb-1">
              {product.name}
            </h1>

            {/* Brand */}
            <a href="#" className="text-[13px] text-[#666] hover:text-black transition-colors">
              {product.brand}
            </a>

            {/* Price */}
            <p className="text-[16px] text-black mt-3 mb-5">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Size Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-black">
                  Size:
                </span>
                <div className="flex items-center gap-3 text-[12px]">
                  <button onClick={() => setSizeGuideOpen(true)} className="text-[#666] underline underline-offset-2 hover:text-black transition-colors">Size Guide</button>
                  <a href="#" className="text-[#666] underline underline-offset-2 hover:text-black transition-colors">Can't Find Your Size?</a>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[52px] h-[40px] border text-[13px] transition-all duration-150 ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-[#ccc] text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Predictor */}
            <div className="flex items-center gap-2 py-3 border-t border-b border-[#e5e5e5] mb-4">
              <span className="text-[11px] font-bold tracking-[0.04em] uppercase">👗 Fit Predictor</span>
              <span className="text-[11px] text-[#666]">Calculate your size</span>
            </div>

            {/* Color */}
            <div className="mb-5">
              <span className="text-[13px] font-semibold text-black">Color: </span>
              <span className="text-[13px] text-[#666]">{product.category}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToBag}
                className="flex-1 h-[48px] bg-black text-white text-[13px] font-bold tracking-[0.06em] uppercase hover:bg-[#333] transition-colors"
              >
                Add to Bag
              </button>
              <button className="flex-1 h-[48px] border border-[#ccc] text-black text-[13px] font-bold tracking-[0.06em] uppercase hover:border-black transition-colors">
                Buy Now
              </button>
            </div>

            {/* Add to Lists */}
            <button className="text-[13px] font-semibold text-black mb-5 hover:underline">
              + Add to My Lists
            </button>

            {/* Delivery Info */}
            <div className="border-t border-[#e5e5e5] pt-4 mb-5">
              <p className="text-[12px] text-black mb-1">
                <span className="font-semibold">Estimated Delivery :</span> Apr 17 - Apr 21
              </p>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Free shipping on orders of ₹2999 or more before duties and taxes
              </p>
            </div>

            {/* Description Tabs */}
            <div className="border-t border-[#e5e5e5]">
              <div className="flex gap-6 pt-4 mb-4">
                {['Description', 'Size & Fit', 'About The Brand'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}
                    className={`text-[13px] pb-1 transition-colors ${
                      activeTab === tab.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')
                        ? 'text-black font-semibold border-b-2 border-black'
                        : 'text-[#666] hover:text-black'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="text-[12px] text-[#666] leading-relaxed">
                {activeTab === 'description' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Premium cotton blend</li>
                    <li>Oversized relaxed fit</li>
                    <li>Machine wash cold</li>
                    <li>Imported</li>
                    <li>Miraesta exclusive design</li>
                  </ul>
                )}
                {activeTab === 'size_fit' && (
                  <div>
                    <p className="mb-2">Model is wearing size M</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      <li>Oversized fit — size down for a more fitted look</li>
                      <li>Chest: S 40" / M 42" / L 44" / XL 46"</li>
                      <li>Length: S 28" / M 29" / L 30" / XL 31"</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'about_the_brand' && (
                  <p>
                    Miraesta is a contemporary streetwear brand blending bold graphic design with premium
                    comfort. Each piece is crafted with attention to detail, from hand-finished prints
                    to carefully selected fabrics. Founded with a vision to redefine everyday fashion.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category === 'sweatshirts' ? 'sweatshirts' : product.category === 'bottoms' ? 'bottoms' : 'tops'}
      />
    </>
  );
}
