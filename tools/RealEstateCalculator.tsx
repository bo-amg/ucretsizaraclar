
import React, { useState, useEffect } from 'react';
import { Home, Calculator, Info, Wallet, PieChart, Landmark, ShieldCheck, Percent, RefreshCw, Scale, Key } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const RealEstateCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Tapu Harcı ve Emlak Hesaplama 2026 | ucretsizaraclar.com.tr";
  }, []);

  const [price, setPrice] = useState('2500000');
  const [result, setResult] = useState<any>(null);

  const calculateTapu = () => {
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) return;

    const aliciHarci = p * 0.02;
    const saticiHarci = p * 0.02;
    const donerSermaye = 2850.00; // 2026 Tahmini

    setResult({
      aliciHarci,
      saticiHarci,
      donerSermaye,
      toplamHarc: aliciHarci + saticiHarci + donerSermaye
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-orange-50 text-orange-600 rounded-3xl mb-4 border border-orange-100 shadow-sm">
          <Key size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Tapu Harcı <span className="text-orange-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Gayrimenkul alım-satım işlemlerindeki vergi ve harç yükünü anında öğrenin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Satış Bedeli (₺)</label>
              <input type="number" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-xl font-black" value={price} onChange={e => setPrice(e.target.value)} />
              <p className="text-[10px] text-slate-400">Belediye rayiç bedelinden düşük gösterilmemelidir.</p>
            </div>
            <button onClick={calculateTapu} className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100">
              <Calculator size={20} /> Masrafları Hesapla
            </button>
          </section>
        </div>

        <div className="lg:col-span-7">
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <div className="text-[10px] text-orange-300 font-bold uppercase mb-1">Alıcı Payı (%2)</div>
                    <div className="text-3xl font-black">{result.aliciHarci.toLocaleString()} ₺</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <div className="text-[10px] text-orange-300 font-bold uppercase mb-1">Satıcı Payı (%2)</div>
                    <div className="text-3xl font-black">{result.saticiHarci.toLocaleString()} ₺</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mb-8">
                  <span className="opacity-60 italic">Döner Sermaye Hizmet Bedeli</span>
                  <span className="font-bold text-orange-400">+{result.donerSermaye.toLocaleString()} ₺</span>
                </div>
                <div className="bg-orange-600 p-8 rounded-[2rem] text-center shadow-xl">
                  <span className="text-[10px] font-black text-orange-100 uppercase tracking-widest block mb-1">TOPLAM ÖDENECEK HARÇ</span>
                  <div className="text-5xl font-black">{result.toplamHarc.toLocaleString()} ₺</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32" />
    </div>
  );
};

export default RealEstateCalculator;
