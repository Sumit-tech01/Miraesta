export default function PromoSplit({ sections }) {
  return (
    <div className="py-20 md:py-28">
      <div className="container-site space-y-24 md:space-y-32">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
              index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-[400px] md:h-[600px] object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center max-w-md mx-auto md:mx-0">
              <p className="text-[11px] tracking-widest uppercase text-secondary mb-3">
                {section.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-5 leading-snug">
                {section.title}
              </h2>
              <p className="text-sm text-secondary leading-relaxed mb-8">
                {section.description}
              </p>
              <a href="#" className="btn-outline-dark self-start">
                {section.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
