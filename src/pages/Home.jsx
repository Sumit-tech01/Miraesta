import React from 'react';
import Hero from '../components/Hero';
import EditorialGrid from '../components/EditorialGrid';
import BestSellers from '../components/BestSellers';
import CategoryStrip from '../components/CategoryStrip';

/* Editorial section data */
const editorialRow1 = [
  { title: 'The Outerwear Edit', image: '/images/j1.png', brand: 'MIRAESTA' },
  { title: 'Cozy Layering', image: '/images/M2.png', brand: 'MIRAESTA' },
  { title: 'Modern Cargo Shop', image: '/images/M6.png', brand: 'MIRAESTA' },
];

const editorialRow2 = [
  { title: 'Graphic Tee Hub', image: '/images/M10.png', brand: 'MIRAESTA' },
  { title: 'Women\'s Collection', image: '/images/w2.png', brand: 'MIRAESTA' },
  { title: 'New Streetwear', image: '/images/M12.png', brand: 'MIRAESTA' },
];

export default function Home({ products, trendingProducts, categories }) {
  return (
    <>
      <Hero />
      <CategoryStrip categories={categories} />
      <EditorialGrid
        sections={editorialRow1}
        description="Our one-stop destination for every style, trend, occasion you're shopping for + more."
      />
      <section className="bg-black text-white py-20 px-5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video lg:aspect-[4/3] bg-neutral-900 overflow-hidden group">
            <video
              src="/images/Fashion_Video_Creation_From_Videos (1).mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md py-2 px-4 text-xs font-semibold tracking-wider uppercase border border-white/20">
              Live Runway Collection
            </div>
          </div>
          <div className="space-y-6 lg:pl-10">
            <p className="text-[11px] tracking-[0.2em] text-[#999] uppercase font-bold">
              Behind the Scenes
            </p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight uppercase leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
              Miraesta
              <br />
              Lookbook 2026
            </h2>
            <p className="text-sm text-[#ccc] leading-relaxed max-w-[450px]">
              Step behind the camera of our latest campaign shoot. High-contrast tailoring, relaxed silhouettes, and bold streetwear styling that defines the new generation.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="aspect-[3/4] bg-neutral-800 overflow-hidden">
                <img src="/images/w2.png" alt="Look 1" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="aspect-[3/4] bg-neutral-800 overflow-hidden">
                <img src="/images/M3.png" alt="Look 2" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="aspect-[3/4] bg-neutral-800 overflow-hidden">
                <img src="/images/j12.png" alt="Look 3" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <EditorialGrid sections={editorialRow2} />
      <BestSellers products={products} title="Best Sellers" />
      <section className="py-16 bg-white border-t border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative overflow-hidden aspect-[16/9] group bg-neutral-100">
            <img
              src="/images/Black and White Modern Fashion & Clothing  Photo Collage YouTube Thumbnail (6).png"
              alt="Editorial Collage"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-bold tracking-[0.2em] uppercase border-b border-white pb-1">
                Streetwear Archive
              </span>
            </div>
          </div>
          <div className="relative overflow-hidden aspect-[16/9] group bg-neutral-100">
            <img
              src="/images/Black and White Modern Fashion & Clothing  Photo Collage YouTube Thumbnail (9).png"
              alt="Editorial Collage"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-bold tracking-[0.2em] uppercase border-b border-white pb-1">
                Runway Backstage
              </span>
            </div>
          </div>
        </div>
      </section>
      <BestSellers products={trendingProducts} title="Trending Now" />
    </>
  );
}
