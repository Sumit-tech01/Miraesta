import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function BestSellers({ products, title = 'BEST SELLERS', onProductClick }) {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const { addItem } = useCart();

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll);
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -300 : 300;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id={title.toLowerCase().replace(/ /g, '-')} className="max-w-[1440px] mx-auto px-5 py-10 relative">
      {/* Title — left aligned, bold uppercase like Revolve */}
      <h2 className="text-[16px] font-bold tracking-[0.06em] uppercase text-black mb-6">
        {title}
      </h2>

      {/* Scrollable container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        {/* Product Cards — responsive grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <a
              href="#"
              key={product.id}
              className="w-full text-center group"
              onClick={(e) => { e.preventDefault(); onProductClick?.(product); }}
            >
              {/* Product Image — white bg like Revolve */}
              <div className="relative bg-[#f5f5f5] aspect-[3/4] overflow-hidden mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover object-top transition-all duration-500 ${
                    product.images && product.images[1] ? 'group-hover:opacity-0' : 'group-hover:scale-[1.03]'
                  }`}
                />
                {product.images && product.images[1] && (
                  <img
                    src={product.images[1]}
                    alt={`${product.name} secondary`}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100"
                  />
                )}
                <button
                  onClick={(e) => { e.preventDefault(); addItem(product); }}
                  className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm text-black text-[11px] font-bold tracking-[0.06em] uppercase py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black hover:text-white"
                >
                  Add to Bag
                </button>
              </div>
              {/* Product Info — centered, Revolve style */}
              <p className="text-[12px] text-black leading-tight mb-0.5 truncate px-1">
                {product.name}
              </p>
              <p className="text-[11px] text-[#999] mb-0.5 italic">
                {product.brand}
              </p>
              <p className="text-[12px] text-black">
                ₹{product.price.toLocaleString()}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
