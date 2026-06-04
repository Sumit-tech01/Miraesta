export default function Hero() {
  return (
    <section className="mt-[126px]">
      {/* Background / overlay hero (mobile overlap fix) */}
      <div
        className="relative w-full min-h-[100svh] overflow-hidden bg-white"
        style={{ maxHeight: '700px' }}
      >
        {/* Background media */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
            <div className="relative overflow-hidden">
              <img
                src="/images/blue-street-tee.jpg"
                alt="Miraesta Editorial"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img?.parentElement) img.parentElement.style.background = 'transparent';
                  img.style.display = 'none';
                }}
              />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] tracking-[0.1em] uppercase text-white/80">
                  Miraesta
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden hidden md:block">
              <img
                src="/images/honeycomb-tee.png"
                alt="Miraesta Street Style"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img?.parentElement) img.parentElement.style.background = 'transparent';
                  img.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>


        {/* Text overlay container */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-[60px]">
          <div className="z-10">
            <p
              className="text-[13px] sm:text-[13px] tracking-[0.04em] text-white mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              JUST DROPPED
            </p>

            <h1
              className="z-10 leading-none mb-5 text-white text-[36px] sm:text-[52px] md:text-[68px] lg:text-[88px]"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: '-0.01em' }}
            >
              NEW
              <br />
              STREET
              <br />
              LOOKS
            </h1>

            <p
              className="z-10 text-[13px] sm:text-[15px] md:text-[17px] text-white/80 mb-5 max-w-[320px] leading-[1.5]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We hand-selected the hottest
              <br />
              styles to wear this season.
            </p>

            {/* Buttons container */}
            <div className="z-10 flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 w-full sm:w-auto items-center">
              <button
                onClick={() => {
                  document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="z-10 w-full sm:w-auto px-8 py-3 text-[13px] font-bold tracking-[0.02em] text-black bg-white uppercase hover:underline"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Hero Banner Strip (kept under hero) */}
        <div className="absolute left-0 right-0 bottom-0 z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#e5e5e5] bg-white">
            <button
              onClick={() => {
                document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center py-4 border-b md:border-b-0 md:border-r border-[#e5e5e5] hover:bg-[#fafafa] transition-colors duration-200 text-left w-full"
            >
              <div className="text-center">
                <p className="text-[13px] font-bold tracking-[0.02em] uppercase text-black">Just In</p>
                <p className="text-[11px] text-[#666]">Shop Now</p>
              </div>
            </button>
            <button
              onClick={() => {
                document.getElementById('trending-now')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center py-4 hover:bg-[#fafafa] transition-colors duration-200 text-left w-full"
            >
              <div className="text-center">
                <p className="text-[13px] font-bold tracking-[0.02em] uppercase text-black">Now at Miraesta: Streetwear</p>
                <p className="text-[11px] text-[#666]">Shop Now</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

