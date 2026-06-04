import { useState, useRef, useEffect } from 'react';

const SEGMENTS = [
  { label: '10% OFF', code: 'MIRA10', color: '#000000', type: 'percent' },
  { label: '₹50 OFF', code: 'FLAT50', color: '#222222', type: 'flat' },
  { label: 'Better Luck!', code: null, color: '#444444', type: 'none' },
  { label: '20% OFF', code: 'MIRA20', color: '#000000', type: 'percent' },
  { label: '₹100 OFF', code: 'FLAT100', color: '#222222', type: 'flat' },
  { label: 'Better Luck!', code: null, color: '#666666', type: 'none' },
  { label: '30% OFF', code: 'MIRA30', color: '#000000', type: 'percent' },
  { label: '₹200 OFF', code: 'FLAT200', color: '#222222', type: 'flat' },
];

const TOTAL = SEGMENTS.length;
const ARC = (2 * Math.PI) / TOTAL;

export default function SpinWheel({ onClose }) {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const angleRef = useRef(0);
  const spinRef = useRef(null);

  useEffect(() => {
    drawWheel(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawWheel = (angle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    SEGMENTS.forEach((seg, i) => {
      const start = angle + i * ARC;
      const end = start + ARC;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + ARC / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(seg.label, r - 12, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('SPIN', cx, cy + 4);
  };

  const spin = () => {
    if (spinning || result) return;
    setSpinning(true);

    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 2 * Math.PI;
    const randomAngle = Math.random() * 2 * Math.PI;
    const totalRotation = extraSpins + randomAngle;
    const duration = 4000;
    const start = performance.now();
    const startAngle = angleRef.current;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = startAngle + totalRotation * ease;
      angleRef.current = current;
      drawWheel(current);

      if (progress < 1) {
        spinRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const finalAngle = current % (2 * Math.PI);
        const pointerAngle = (2 * Math.PI - finalAngle) % (2 * Math.PI);
        const index = Math.floor(pointerAngle / ARC) % TOTAL;
        setResult(SEGMENTS[index]);
      }
    };

    spinRef.current = requestAnimationFrame(animate);
  };

  const handleCopy = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 overflow-y-auto p-4">
      <div className="bg-white w-full max-w-[420px] mx-auto my-4 p-8 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#999] hover:text-black text-2xl leading-none"
        >
          ×
        </button>

        <p className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-1">Welcome Gift</p>
        <h2 className="text-[22px] font-semibold uppercase tracking-wide mb-1">Spin & Win</h2>
        <p className="text-[12px] text-[#666] mb-6">Try your luck for an exclusive discount</p>

        {/* Pointer */}
        <div className="relative inline-block">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 w-0 h-0"
            style={{
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '20px solid #000000',
            }}
          />
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            onClick={spin}
            className="cursor-pointer rounded-full"
            style={{ display: 'block' }}
          />
        </div>

        {!result && !spinning && (
          <p className="text-[12px] text-[#999] mt-4">Click the wheel to spin</p>
        )}
        {spinning && (
          <p className="text-[12px] text-[#999] mt-4 animate-pulse">Spinning...</p>
        )}

        {result && (
          <div className="mt-6">
            {result.type === 'none' ? (
              <div>
                <p className="text-[16px] font-semibold text-[#666] mb-2">Better luck next time!</p>
                <button
                  onClick={onClose}
                  className="w-full h-[44px] bg-black text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#333] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div>
                <p className="text-[13px] text-[#666] mb-1">You won</p>
                <p className="text-[28px] font-bold text-black mb-4">{result.label}</p>
                <div className="flex items-center gap-2 border-2 border-dashed border-black p-3 mb-4">
                  <span className="flex-1 text-[18px] font-bold tracking-[0.3em] text-black">
                    {result.code}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-black text-white text-[11px] font-bold uppercase tracking-wide hover:bg-[#333] transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-[11px] text-[#999] mb-4">Use this code at checkout for your discount</p>
                <button
                  onClick={onClose}
                  className="w-full h-[44px] border border-black text-black text-[12px] font-bold tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

