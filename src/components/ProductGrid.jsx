import ProductCard from './ProductCard';

export default function ProductGrid({ products, title = 'New Arrivals', subtitle }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            {subtitle && (
              <p className="text-[11px] tracking-widest uppercase text-secondary mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">
              {title}
            </h2>
          </div>
          <a
            href="#"
            className="text-xs tracking-wider uppercase text-primary hover:text-secondary transition-colors duration-200 border-b border-primary hover:border-secondary pb-0.5"
          >
            View All
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
