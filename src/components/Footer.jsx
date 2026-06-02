import { useState } from 'react';

const footerLinks = {
  'Customer Care': ['Contact Us', 'FAQ', 'Shipping & Returns', 'Order Tracking', 'Size Guide'],
  'About': ['Our Story', 'Careers', 'Press', 'Sustainability', 'Affiliates'],
  'Legal': ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Accessibility'],
  'Connect': ['Instagram', 'Pinterest', 'TikTok', 'Twitter', 'Facebook'],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xxxxxxxxxxx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="border-t border-[#e5e5e5]">
      {/* Newsletter */}
      <div className="max-w-[1440px] mx-auto px-5 py-12 text-center">
        <h3 className="text-[14px] font-bold tracking-[0.06em] uppercase text-black mb-2">
          Sign Up for Emails
        </h3>
        <p className="text-[12px] text-[#666] mb-5 max-w-[400px] mx-auto leading-relaxed">
          Subscribe for exclusive access to new arrivals, private sales, and
          curated style guides.
        </p>
        <div className="w-full max-w-[440px] mx-auto">
          {status === 'success' ? (
            <div className="h-[42px] flex items-center justify-center border border-black text-[12px] font-semibold tracking-[0.04em] uppercase text-black">
              ✓ You're subscribed!
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus('idle');
                  }}
                  placeholder="Enter your email"
                  className="flex-1 h-[42px] px-4 border border-[#ccc] text-[12px] outline-none focus:border-black transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="h-[42px] px-6 bg-black text-white text-[12px] font-semibold tracking-[0.04em] uppercase hover:bg-[#333] transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-[11px] mt-2 text-center">
                  Please enter a valid email and try again.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer Links Grid */}
      <div className="border-t border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div>
              <h4 className="text-[14px] font-normal tracking-[0.08em] uppercase text-black mb-4">
                Miraesta
              </h4>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Curated streetwear for the modern generation. Discover bold designs and exclusive collections.
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-bold tracking-[0.06em] uppercase text-black mb-4">
                  {title}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[11px] text-[#666] hover:text-black transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[#999]">
            © 2025 Miraesta. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[10px] font-semibold tracking-[0.06em] uppercase text-[#666] hover:text-black transition-colors">Instagram</a>
            <a href="#" className="text-[10px] font-semibold tracking-[0.06em] uppercase text-[#666] hover:text-black transition-colors">Pinterest</a>
            <a href="#" className="text-[10px] font-semibold tracking-[0.06em] uppercase text-[#666] hover:text-black transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
