import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#"
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-2">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
            product.images && product.images[1] ? (isHovered ? 'opacity-0' : 'opacity-100') : (isHovered ? 'scale-105' : 'scale-100')
          }`}
        />
        {product.images && product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        )}
        {/* Quick Add */}
        <div className={`absolute bottom-0 left-0 w-full transition-all duration-250 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button className="w-full bg-white/95 backdrop-blur-sm text-primary text-xs tracking-wider uppercase py-3 hover:bg-black hover:text-white transition-colors duration-200">
            Quick Add
          </button>
        </div>
        {/* Wishlist Icon */}
        <button
          className={`absolute top-3 right-3 p-1.5 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Add to wishlist"
        >
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-0.5">
        <p className="text-[11px] tracking-wider uppercase text-secondary font-medium">
          {product.brand}
        </p>
        <h3 className="text-[13px] tracking-normal text-primary font-medium leading-snug truncate">
          {product.name}
        </h3>
        <p className="text-xs text-secondary">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </a>
  );
}
