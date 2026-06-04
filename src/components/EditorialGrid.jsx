export default function EditorialGrid({ sections, description }) {
  return (
    <section className="max-w-[1440px] mx-auto px-5">
      {/* Optional description text above */}
      {description && (
        <div className="text-center py-4 border-b border-[#e5e5e5]">
          <p className="text-[12px] text-[#666] leading-relaxed">
            {description}
            {' | '}
            <a href="#" className="text-black font-semibold underline underline-offset-2">SHOP NOW</a>
          </p>
        </div>
      )}

      {/* 3-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px] pt-6 pb-10">
        {sections.map((section, index) => (
          <a href="#" key={index} className="group block">
            {/* Title above image */}
            <h3 className="text-center text-[14px] font-bold tracking-[0.04em] uppercase text-black mb-3">
              {section.title}
            </h3>
            {/* Image */}
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {section.brand && (
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-white/80">
                    {section.brand}
                  </span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
