import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-8 border-t-[1px] border-solid border-gray-200 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 flex flex-col">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-black">MIRAESTA</h3>
            <p className="text-sm text-gray-500 leading-relaxed pr-4">
              Curated streetwear for the modern generation. Discover bold designs and exclusive collections.
            </p>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-black">Customer Care</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/info/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/info/faq" className="hover:text-black transition-colors">FAQ</Link></li>
              <li><Link to="/info/shipping-returns" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/info/order-tracking" className="hover:text-black transition-colors">Order Tracking</Link></li>
              <li><Link to="/info/size-guide" className="hover:text-black transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-black">About</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/info/our-story" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/info/careers" className="hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/info/press" className="hover:text-black transition-colors">Press</Link></li>
              <li><Link to="/info/sustainability" className="hover:text-black transition-colors">Sustainability</Link></li>
              <li><Link to="/info/affiliates" className="hover:text-black transition-colors">Affiliates</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-black">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/info/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/info/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/info/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link></li>
              <li><Link to="/info/accessibility" className="hover:text-black transition-colors">Accessibility</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase mb-6 text-black">Connect</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Pinterest</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">TikTok</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Facebook</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t-[1px] border-solid border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Miraesta. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-semibold tracking-[0.15em] text-gray-500">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">INSTAGRAM</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">PINTEREST</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">TIKTOK</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
