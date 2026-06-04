export default function CategoryStrip({ categories }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <h2 className="text-center text-3xl md:text-4xl font-extralight tracking-tight mb-12">
          Shop By Category
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-surface">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xs tracking-wider uppercase text-primary group-hover:text-secondary transition-colors duration-200">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
