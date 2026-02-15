
import React, { useState, useEffect } from 'react';
import { Layers, Box, Sun, Square, Palette, Copy, Check } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Props { type: 'gradient' | 'shadow' | 'glass' | 'border' | 'contrast'; }

const DesignToolSuite: React.FC<Props> = ({ type }) => {
  const [c1, setC1] = useState('#6366f1');
  const [c2, setC2] = useState('#ec4899');
  const [val, setVal] = useState(10);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `Tasarım Aracı | ucretsizaraclar.com.tr`;
  }, [type]);

  const getCode = () => {
    if (type === 'gradient') return `background: linear-gradient(135deg, ${c1}, ${c2});`;
    if (type === 'shadow') return `box-shadow: 0px ${val}px ${val*2}px rgba(0,0,0,0.1);`;
    if (type === 'glass') return `background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(${val}px); border: 1px solid rgba(255, 255, 255, 0.3);`;
    if (type === 'border') return `border-radius: ${val}px;`;
    return '';
  };

  const copy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2 capitalize">{type} Üretici</h1>
        <p className="text-slate-500">Modern arayüzler için CSS kodlarını anında oluşturun.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          {type === 'gradient' && (
            <div className="flex gap-4">
              <input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-full h-16 rounded-xl cursor-pointer" />
              <input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-full h-16 rounded-xl cursor-pointer" />
            </div>
          )}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Değer Ayarı</label>
            <input type="range" min="0" max="100" value={val} onChange={e => setVal(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600" />
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl text-indigo-400 font-mono text-sm relative">
            <button onClick={copy} className="absolute top-2 right-2 text-slate-500 hover:text-white">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            {getCode()}
          </div>
        </div>

        <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl flex items-center justify-center p-12 min-h-[300px]">
          <div 
            style={{
              width: '200px',
              height: '200px',
              transition: 'all 0.3s ease',
              ...(type === 'gradient' && { background: `linear-gradient(135deg, ${c1}, ${c2})` }),
              ...(type === 'shadow' && { background: 'white', boxShadow: `0px ${val}px ${val*2}px rgba(0,0,0,0.1)` }),
              ...(type === 'glass' && { background: 'rgba(255, 255, 255, 0.4)', backdropFilter: `blur(${val}px)`, border: '1px solid white' }),
              ...(type === 'border' && { background: '#6366f1', borderRadius: `${val}px` }),
            }}
          />
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default DesignToolSuite;
