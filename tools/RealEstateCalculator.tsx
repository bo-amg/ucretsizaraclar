
import React, { useState, useEffect } from 'react';
import { Home, Calculator, Info, Wallet, PieChart, Landmark, ShieldCheck, Percent, RefreshCw, Scale, Key, AlertTriangle } from 'lucide-react';
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
    const donerSermaye = 2850.00; 

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
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Satış Bedeli (₺)</label>
              <input type="number" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-xl font-black" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <button onClick={calculateTapu} className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100">
              <Calculator size={20} /> Hesapla
            </button>
          </section>

          {/* Yasal Uyarı Kutusu Güncellendi */}
          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Yasal Uyarı</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                <strong>Yasal Uyarı:</strong> Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Bölgesel rayiç farkları, döner sermaye güncellemeleri veya mevzuat değişiklikleri nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
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
