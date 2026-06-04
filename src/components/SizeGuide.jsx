import { useState } from 'react';

const sizeData = {
  tops: {
    label: 'Tops & Tees',
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Shoulder (in)', 'Sleeve (in)'],
    rows: [
      ['S', '38–40', '27', '17', '8'],
      ['M', '40–42', '28', '18', '8.5'],
      ['L', '42–44', '29', '19', '9'],
      ['XL', '44–46', '30', '20', '9.5'],
      ['XXL', '46–48', '31', '21', '10'],
    ],
  },
  sweatshirts: {
    label: 'Sweatshirts & Pullovers',
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Shoulder (in)', 'Sleeve (in)'],
    rows: [
      ['S', '40–42', '26', '18', '24'],
      ['M', '42–44', '27', '19', '25'],
      ['L', '44–46', '28', '20', '26'],
      ['XL', '46–48', '29', '21', '27'],
      ['XXL', '48–50', '30', '22', '28'],
    ],
  },
  bottoms: {
    label: 'Bottoms & Pants',
    headers: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Rise (in)'],
    rows: [
      ['S / 28', '28–30', '38', '30', '10'],
      ['M / 30', '30–32', '40', '31', '10.5'],
      ['L / 32', '32–34', '42', '32', '11'],
      ['XL / 34', '34–36', '44', '32', '11.5'],
      ['XXL / 36', '36–38', '46', '33', '12'],
    ],
  },
};

const conversionData = {
  headers: ['Miraesta', 'US', 'UK', 'EU', 'JP'],
  rows: [
    ['S', 'S / 4–6', '8–10', '36–38', 'M'],
    ['M', 'M / 8–10', '12–14', '40–42', 'L'],
    ['L', 'L / 12–14', '16–18', '44–46', 'LL'],
    ['XL', 'XL / 16', '20', '48', '3L'],
    ['XXL', 'XXL / 18', '22', '50', '4L'],
  ],
};

const measureGuide = [
  { id: 'chest', label: 'Chest', desc: 'Measure around the fullest part of your chest, keeping the tape horizontal.' },
  { id: 'waist', label: 'Waist', desc: 'Measure around the narrowest part of your natural waist, usually just above the belly button.' },
  { id: 'hip', label: 'Hip', desc: 'Measure around the fullest part of your hips, about 8 inches below your waist.' },
  { id: 'shoulder', label: 'Shoulder', desc: 'Measure from the edge of one shoulder to the other, across the back.' },
  { id: 'inseam', label: 'Inseam', desc: 'Measure from the crotch seam to the bottom hem of the leg.' },
  { id: 'length', label: 'Length', desc: 'Measure from the high point of the shoulder down to the bottom hem.' },
];

const TopDiagram = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full text-black stroke-current fill-none">
    {/* T-shirt outline */}
    <path d="M60 40 Q100 30 140 40 L160 60 L140 80 L140 180 L60 180 L60 80 L40 60 L60 40" strokeWidth="1.5" />
    {/* Chest line */}
    <path d="M60 90 L140 90" strokeWidth="1" strokeDasharray="4 2" />
    <text x="100" y="85" fontSize="10" className="fill-black stroke-none text-center" textAnchor="middle">CHEST</text>
    {/* Length line */}
    <path d="M75 40 L75 180" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M72 40 L78 40 M72 180 L78 180" strokeWidth="1" />
    <text x="50" y="110" fontSize="10" className="fill-black stroke-none text-center" transform="rotate(-90, 50, 110)" textAnchor="middle">LENGTH</text>
    {/* Shoulder line */}
    <path d="M60 40 L140 40" strokeWidth="1" strokeDasharray="4 2" />
    <text x="100" y="35" fontSize="10" className="fill-black stroke-none text-center" textAnchor="middle">SHOULDER</text>
  </svg>
);

const BottomDiagram = () => (
  <svg viewBox="0 0 200 220" className="w-full h-full text-black stroke-current fill-none">
    {/* Pants outline */}
    <path d="M60 40 L140 40 L148 100 L120 180 L100 110 L80 180 L52 100 L60 40" strokeWidth="1.5" />
    {/* Waist line */}
    <path d="M60 45 L140 45" strokeWidth="1" strokeDasharray="4 2" />
    <text x="100" y="35" fontSize="10" className="fill-black stroke-none text-center" textAnchor="middle">WAIST</text>
    {/* Hip line */}
    <path d="M55 85 L145 85" strokeWidth="1" strokeDasharray="4 2" />
    <text x="100" y="80" fontSize="10" className="fill-black stroke-none text-center" textAnchor="middle">HIP</text>
    {/* Inseam line */}
    <path d="M100 110 L80 180" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M98 111 L102 109 M78 181 L82 179" strokeWidth="1" />
    <text x="80" y="145" fontSize="10" className="fill-black stroke-none text-center" transform="rotate(74, 80, 145)" textAnchor="middle">INSEAM</text>
  </svg>
);

export default function SizeGuide({ isOpen, onClose, category }) {
  const [activeCategory, setActiveCategory] = useState(category || 'tops');
  const [activeView, setActiveView] = useState('chart');

  if (!isOpen) return null;

  const currentData = sizeData[activeCategory];
  const isBottom = activeCategory === 'bottoms';

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white w-full max-w-[680px] max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] flex-shrink-0">
            <h2 className="text-[16px] font-bold tracking-[0.04em] uppercase text-black">Size Guide</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-[#e5e5e5] px-6 flex-shrink-0">
            {Object.entries(sizeData).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`py-3 px-4 text-[12px] tracking-[0.04em] uppercase transition-colors relative ${
                  activeCategory === key
                    ? 'text-black font-bold'
                    : 'text-[#999] hover:text-black'
                }`}
              >
                {val.label}
                {activeCategory === key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                )}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-4 px-6 pt-4 flex-shrink-0">
            {[
              { id: 'chart', label: 'Size Chart' },
              { id: 'conversion', label: 'International Conversion' },
              { id: 'measure', label: 'How to Measure' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id)}
                className={`text-[12px] pb-2 transition-colors ${
                  activeView === v.id
                    ? 'text-black font-semibold border-b-2 border-black'
                    : 'text-[#999] hover:text-black'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Size Chart */}
            {activeView === 'chart' && currentData && (
              <div>
                <p className="text-[11px] text-[#999] mb-4">
                  All measurements are in inches. For the best fit, measure yourself and compare with the chart below.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        {currentData.headers.map((h) => (
                          <th key={h} className="text-[11px] font-bold tracking-[0.04em] uppercase text-black py-2.5 px-3 bg-[#f8f8f8] border border-[#e5e5e5]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={`text-[12px] py-2.5 px-3 border border-[#e5e5e5] ${
                                j === 0 ? 'font-semibold text-black' : 'text-[#666]'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Fit Tip */}
                <div className="mt-5 p-4 bg-[#f8f8f8] border border-[#e5e5e5]">
                  <p className="text-[11px] font-bold tracking-[0.04em] uppercase text-black mb-1">💡 Fit Tip</p>
                  <p className="text-[12px] text-[#666] leading-relaxed">
                    {isBottom 
                      ? "Our denim and bottoms are designed to sit comfortably at the waist. If you are between sizes, we recommend sizing up for a better fit across the hips."
                      : "Our oversized tees are designed with a relaxed fit. If you prefer a more fitted look, we recommend sizing down. For sweatshirts, order your regular size for the intended oversized silhouette."}
                  </p>
                </div>
              </div>
            )}

            {/* International Conversion */}
            {activeView === 'conversion' && (
              <div>
                <p className="text-[11px] text-[#999] mb-4">
                  Use this chart to find your size across international sizing standards.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        {conversionData.headers.map((h) => (
                          <th key={h} className="text-[11px] font-bold tracking-[0.04em] uppercase text-black py-2.5 px-3 bg-[#f8f8f8] border border-[#e5e5e5]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {conversionData.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={`text-[12px] py-2.5 px-3 border border-[#e5e5e5] ${
                                j === 0 ? 'font-semibold text-black' : 'text-[#666]'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* How to Measure */}
            {activeView === 'measure' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-5">
                  <p className="text-[11px] text-[#999] mb-2">
                    Use a flexible measuring tape and follow the instructions below for accurate measurements.
                  </p>
                  {(isBottom 
                    ? measureGuide.filter(i => ['waist', 'hip', 'inseam'].includes(i.id))
                    : measureGuide.filter(i => ['chest', 'length', 'shoulder'].includes(i.id))
                  ).map((item, i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-[#f0f0f0] last:border-0">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-black mb-0.5">{item.label}</p>
                        <p className="text-[11px] text-[#666] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}

                  {/* General Tips */}
                  <div className="p-4 bg-[#f8f8f8] border border-[#e5e5e5] mt-4">
                    <p className="text-[11px] font-bold tracking-[0.04em] uppercase text-black mb-2">General Tips</p>
                    <ul className="text-[11px] text-[#666] leading-relaxed space-y-1 list-disc list-inside">
                      <li>Measure over light clothing</li>
                      <li>Keep the tape snug but not tight</li>
                      <li>When between sizes, size up</li>
                    </ul>
                  </div>
                </div>

                {/* Diagram Visualization */}
                <div className="bg-[#fcfcfc] border border-[#e5e5e5] rounded-lg p-6 flex flex-col items-center">
                  <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#999] mb-4">Measurement Points</p>
                  <div className="w-full max-w-[240px] aspect-square">
                    {isBottom ? <BottomDiagram /> : <TopDiagram />}
                  </div>
                  <p className="text-[10px] text-[#aaa] mt-4 text-center">
                    Visual representation of key measurement points for {isBottom ? 'bottoms' : 'tops'}.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#e5e5e5] px-6 py-3 flex-shrink-0 bg-[#fafafa]">
            <p className="text-[10px] text-[#999] text-center">
              Need more help? <a href="#" className="text-black underline underline-offset-2">Contact our style advisors</a> for personalized sizing assistance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
