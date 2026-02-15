
import React, { useState } from 'react';
import { Palette, Copy, Check, RotateCcw } from 'lucide-react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState<string | null>(null);

  const presets = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
    '#f59e0b', '#10b981', '#06b6d4', '#3b82f6',
    '#1f2937', '#64748b', '#94a3b8', '#cbd5e1'
  ];

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-violet-50 text-violet-600 rounded-2xl mb-4">
          <Palette size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Renk Paleti Araçları</h1>
        <p className="text-slate-500">Mükemmel renkleri bulun ve kodlarını kopyalayın.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative group">
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className="w-48 h-48 rounded-3xl cursor-pointer border-none p-0 appearance-none bg-transparent overflow-hidden"
            />
            <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-white shadow-inner" />
          </div>

          <div className="flex-grow space-y-4 w-full">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">HEX</label>
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="font-mono text-lg font-bold text-slate-700">{color.toUpperCase()}</span>
                <button onClick={() => handleCopy(color)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  {copied === color ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">RGB</label>
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="font-mono text-lg font-bold text-slate-700">{hexToRgb(color)}</span>
                <button onClick={() => handleCopy(hexToRgb(color))} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  {copied === hexToRgb(color) ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-bold text-slate-700 mb-4">Hazır Renkler</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setColor(p)}
                className={`aspect-square rounded-xl shadow-sm hover:scale-110 transition-transform ${color === p ? 'ring-4 ring-indigo-100 border-2 border-indigo-600' : 'border border-slate-100'}`}
                style={{ backgroundColor: p }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
