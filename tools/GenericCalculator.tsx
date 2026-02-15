
import React, { useState, useEffect } from 'react';
import { Calculator, Percent, User, RefreshCw, Copy, Check } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Props { type: 'kdv' | 'percent' | 'bmi' | 'age'; }

const GenericCalculator: React.FC<Props> = ({ type }) => {
  const [val1, setVal1] = useState<string>('');
  const [val2, setVal2] = useState<string>('20');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const titles = { kdv: 'KDV', percent: 'Yüzde', bmi: 'BMI', age: 'Yaş' };
    document.title = `${titles[type]} Hesaplama | ucretsizaraclar.com.tr`;
  }, [type]);

  const calculate = () => {
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    if (isNaN(n1)) return;

    if (type === 'kdv') {
      const kdvAmt = n1 * (n2 / 100);
      setResult({ dahil: n1 + kdvAmt, kdv: kdvAmt, matrah: n1 });
    } else if (type === 'percent') {
      setResult({ res: (n1 * n2) / 100 });
    } else if (type === 'bmi') {
      const heightInM = n2 / 100;
      const bmi = n1 / (heightInM * heightInM);
      let status = "Normal";
      if (bmi < 18.5) status = "Zayıf";
      else if (bmi >= 25 && bmi < 30) status = "Fazla Kilolu";
      else if (bmi >= 30) status = "Obez";
      setResult({ bmi: bmi.toFixed(2), status });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 capitalize">{type} Hesaplama</h1>
        <AdUnit className="h-24 mb-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                {type === 'bmi' ? 'Kilo (kg)' : 'Tutar / Sayı'}
              </label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                {type === 'kdv' ? 'KDV Oranı (%)' : type === 'bmi' ? 'Boy (cm)' : 'Yüzde / Değer'}
              </label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
              />
            </div>
            <button 
              onClick={calculate}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Hesapla
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Calculator size={120} /></div>
          <h3 className="text-lg font-bold mb-6 text-indigo-400 uppercase tracking-widest text-xs">Sonuçlar</h3>
          
          {result ? (
            <div className="space-y-6 relative z-10">
              {type === 'kdv' && (
                <>
                  <div className="text-4xl font-black text-white">{result.dahil.toLocaleString()} TL</div>
                  <div className="text-sm text-slate-400">KDV Tutarı: {result.kdv.toLocaleString()} TL</div>
                </>
              )}
              {type === 'percent' && (
                <div className="text-5xl font-black">{result.res}</div>
              )}
              {type === 'bmi' && (
                <>
                  <div className="text-5xl font-black">{result.bmi}</div>
                  <div className="inline-block px-4 py-1 bg-indigo-600 rounded-full text-xs font-bold uppercase">{result.status}</div>
                </>
              )}
            </div>
          ) : (
            <p className="text-slate-500 italic">Verileri girip hesapla butonuna basın.</p>
          )}
        </div>
      </div>
      
      <div className="mt-12">
        <AdUnit className="h-48" />
      </div>
    </div>
  );
};

export default GenericCalculator;
