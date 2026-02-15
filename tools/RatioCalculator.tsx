
import React, { useState, useEffect } from 'react';
import { Divide, RefreshCw, Calculator } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const RatioCalculator: React.FC = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    document.title = "Oran Orantı Hesaplayıcı | ucretsizaraclar.com.tr";
  }, []);

  const calculate = () => {
    setError('');
    const vals = [a, b, c, d];
    const filledCount = vals.filter(v => v !== '').length;

    if (filledCount !== 3) {
      setError('Lütfen hesaplamak için tam olarak 3 alanı doldurun.');
      return;
    }

    const nA = parseFloat(a);
    const nB = parseFloat(b);
    const nC = parseFloat(c);
    const nD = parseFloat(d);

    if (a === '') setA(((nB * nC) / nD).toString());
    else if (b === '') setB(((nA * nD) / nC).toString());
    else if (c === '') setC(((nA * nD) / nB).toString());
    else if (d === '') setD(((nB * nC) / nA).toString());
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
          <Divide size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Oran Orantı</h1>
        <p className="text-slate-500">Üç değeri girin, dördüncü bilinmeyeni anında bulun.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-6">
            <div className="space-y-4">
              <input 
                type="number" 
                placeholder="A" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none text-2xl font-bold text-center"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
              <div className="w-full h-1 bg-slate-200 rounded-full"></div>
              <input 
                type="number" 
                placeholder="B" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none text-2xl font-bold text-center"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <span className="text-6xl font-black text-slate-200">=</span>
          </div>
          <div className="md:hidden flex justify-center py-4">
            <span className="text-6xl font-black text-slate-200">=</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <input 
                type="number" 
                placeholder="C" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none text-2xl font-bold text-center"
                value={c}
                onChange={(e) => setC(e.target.value)}
              />
              <div className="w-full h-1 bg-slate-200 rounded-full"></div>
              <input 
                type="number" 
                placeholder="D" 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none text-2xl font-bold text-center"
                value={d}
                onChange={(e) => setD(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="mt-12 flex gap-4">
          <button 
            onClick={calculate}
            className="flex-grow py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <Calculator size={24} /> Hesapla
          </button>
          <button 
            onClick={clear}
            className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>

      <div className="mt-12">
        <AdUnit className="h-32" />
      </div>
    </div>
  );
};

export default RatioCalculator;
