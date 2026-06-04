import { useParams, Link } from 'react-router-dom';

export default function InfoPage() {
  const { slug } = useParams();

  const content = {
    // Customer Care
    'contact': {
      title: 'Customer Care',
      body: (
        <>
          <p className="mb-6">Our dedicated support team is available to assist you with styling advice, sizing queries, and order tracking.</p>
          <p className="mb-2"><span className="font-bold tracking-widest">EMAIL:</span> support@miraesta.com</p>
          <p className="mb-6"><span className="font-bold tracking-widest">WHATSAPP:</span> +91 98765 43210</p>
          <p className="text-gray-500 italic mt-8">Operating Hours: Monday to Saturday, 10:00 AM - 7:00 PM IST.</p>
        </>
      )
    },
    'faq': {
      title: 'Frequently Asked Questions',
      body: (
        <>
          <h3 className="font-bold tracking-widest mt-6 mb-2">DO YOU RESTOCK SOLD OUT ITEMS?</h3>
          <p className="mb-6">We operate on a limited drop model. While core essentials are restocked, seasonal archives rarely return. We highly recommend signing up for restock alerts.</p>
          <h3 className="font-bold tracking-widest mt-6 mb-2">HOW DOES THE SIZING WORK?</h3>
          <p className="mb-6">Our fits vary by collection. Please refer to the specific Size Guide located on every product page for exact garment measurements in centimeters.</p>
        </>
      )
    },
    'shipping-returns': {
      title: 'Shipping, Exchanges and Returns',
      body: (
        <>
          <p className="mb-6">We operate with a commitment to seamless service. Enjoy free standard shipping on all orders over ₹4,000 within India.</p>
          <h3 className="font-bold tracking-widest mt-8 mb-4">SHIPPING TIMELINES</h3>
          <p className="mb-6">Orders are processed within 1-2 business days. Standard delivery requires 3-5 business days depending on your pincode.</p>
          <h3 className="font-bold tracking-widest mt-8 mb-4">7-DAY RETURNS</h3>
          <p className="mb-6">We offer a complimentary 7-day return and exchange policy. Garments must be returned in their original, unworn condition with all tags attached.</p>
        </>
      )
    },
    'order-tracking': {
      title: 'Order Tracking',
      body: <p>Once your order has been dispatched from our facility, you will receive an email and WhatsApp notification containing your airway bill (AWB) number and a direct tracking link. Tracking links typically activate within 24 hours of dispatch.</p>
    },
    'size-guide': {
      title: 'Comprehensive Size Guide',
      body: <p>At Miraesta, silhouette is everything. Because our garments range from slim-tailored to intentionally oversized, we do not use a generic size chart. Please click the "SIZE GUIDE" button on any specific product page to view the exact chest, length, and shoulder measurements in centimeters for that piece.</p>
    },

    // About
    'our-story': {
      title: 'About Miraesta',
      body: (
        <>
          <p className="mb-6">Miraesta was born from a singular vision: to strip away the excess and focus entirely on form, fabric, and silhouette.</p>
          <p className="mb-6">We believe that true luxury is found in the meticulous details and the perfection of the basics. Every piece in our collection is engineered with precision, using heavyweight, premium textiles to create garments that hold structure.</p>
          <p className="mb-6">We do not mass produce. We operate on a strict drop model to ensure quality remains uncompromising.</p>
        </>
      )
    },
    'careers': {
      title: 'Careers at Miraesta',
      body: <p>We are always looking for visionary talent in design, e-commerce, and logistics. If you are driven by detail and aesthetics, we want to hear from you. Please send your resume and portfolio to careers@miraesta.com.</p>
    },
    'press': {
      title: 'Press & Media',
      body: <p>For press inquiries, editorial garment pulls, brand partnerships, and media kits, please contact our PR team directly at press@miraesta.com.</p>
    },
    'sustainability': {
      title: 'Sustainability & Ethics',
      body: <p>We firmly reject the fast-fashion cycle. By operating on a limited-quantity drop model, we aggressively eliminate overproduction and deadstock waste. Our fabrics are sourced with longevity in mind, ensuring your pieces last years, not weeks.</p>
    },
    'affiliates': {
      title: 'Affiliate Program',
      body: <p>The Miraesta Affiliate Program is currently invite-only. We partner with creators and tastemakers who naturally align with our minimalist, streetwear-forward aesthetic. If you believe your platform is a match, please reach out via our contact page.</p>
    },

    // Legal
    'terms': {
      title: 'Terms & Conditions',
      body: <p>By accessing and using Miraesta.com, you agree to comply with our terms of service regarding purchasing, intellectual property, and user conduct. We reserve the right to refuse service, terminate accounts, or cancel orders flagged by our fraud protection systems at our sole discretion.</p>
    },
    'privacy': {
      title: 'Privacy Policy',
      body: <p>We respect your privacy implicitly. Your data is encrypted using industry-standard protocols and is strictly used for order fulfillment and personalized styling recommendations. Miraesta will never sell your personal information to third-party data brokers.</p>
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      body: <p>Miraesta uses essential cookies to ensure the website functions securely (such as maintaining your shopping bag). We also use non-essential analytics cookies to understand how users interact with our platform, allowing us to continuously refine the digital experience.</p>
    },
    'accessibility': {
      title: 'Accessibility Statement',
      body: <p>Miraesta is committed to making our website accessible and user-friendly to everyone. If you are having difficulty viewing or navigating the content on this website, or notice any feature that you believe is not fully accessible, please email our team at support@miraesta.com.</p>
    }
  };

  const pageData = content[slug] || { title: 'Page Not Found', body: <p>The information you are looking for does not exist or has been moved.</p> };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[70vh] font-sans text-black bg-white pt-40">
      <Link to="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black mb-12 inline-block border-b border-transparent hover:border-black transition-all">← Back to Store</Link>
      <h1 className="text-2xl tracking-[0.15em] uppercase font-semibold mb-12 border-b-[1px] border-solid border-gray-200 pb-6">{pageData.title}</h1>
      <div className="text-sm tracking-wide leading-loose text-gray-700">
        {pageData.body}
      </div>
    </div>
  );
}
