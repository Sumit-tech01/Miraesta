export default function SizeGuideModal({ isOpen, onClose, category, fitType }) {
  if (!isOpen) return null;

  const normalizedCategory = (category || '').toUpperCase();
  const isBottom = normalizedCategory.includes('PANT') || normalizedCategory.includes('JEAN') || normalizedCategory.includes('BOTTOM');

  // Authentic Indian Market Sizing (cm)
  const topsData = [
    { size: 'S', chest: 96, length: 68, shoulder: 44 },
    { size: 'M', chest: 102, length: 70, shoulder: 46 },
    { size: 'L', chest: 108, length: 72, shoulder: 48 },
    { size: 'XL', chest: 114, length: 74, shoulder: 50 },
    { size: 'XXL', chest: 120, length: 76, shoulder: 52 },
  ];

  const bottomsData = [
    { size: 'S', waist: 76, hip: 96, inseam: 74 },
    { size: 'M', waist: 81, hip: 101, inseam: 76 },
    { size: 'L', waist: 86, hip: 106, inseam: 78 },
    { size: 'XL', waist: 91, hip: 111, inseam: 80 },
    { size: 'XXL', waist: 96, hip: 116, inseam: 82 },
  ];

  const chartData = isBottom ? bottomsData : topsData;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right font-sans text-[#111111]">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-sm font-bold tracking-[0.15em] uppercase">Size Guide</h2>
          <button onClick={onClose} className="text-xs tracking-widest uppercase hover:text-gray-500 transition-colors">
            Close ✕
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-2">{category || 'CLOTHING'}</h3>
            <p className="text-xs text-gray-500 tracking-wide leading-relaxed">
              Measurements are in centimeters (cm). This garment features a <span className="font-semibold text-black">{fitType || 'STANDARD FIT'}</span>. 
              {fitType?.toUpperCase().includes('OVERSIZED') && " We recommend taking your normal size for an intended baggy look, or size down for a standard fit."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs tracking-widest">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-4 font-semibold uppercase">Size</th>
                  {isBottom ? (
                    <>
                      <th className="py-4 font-semibold uppercase text-gray-500">Waist</th>
                      <th className="py-4 font-semibold uppercase text-gray-500">Hip</th>
                      <th className="py-4 font-semibold uppercase text-gray-500">Inseam</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 font-semibold uppercase text-gray-500">Chest</th>
                      <th className="py-4 font-semibold uppercase text-gray-500">Length</th>
                      <th className="py-4 font-semibold uppercase text-gray-500">Shoulder</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {chartData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold">{row.size}</td>
                    <td className="py-4 text-gray-600">{isBottom ? row.waist : row.chest}</td>
                    <td className="py-4 text-gray-600">{isBottom ? row.hip : row.length}</td>
                    <td className="py-4 text-gray-600">{isBottom ? row.inseam : row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
