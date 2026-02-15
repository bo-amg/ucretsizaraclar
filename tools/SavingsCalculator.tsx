
import React, { useState, useEffect } from 'react';
import { Coins, Calculator, Info, Wallet, PieChart, Calendar, ArrowRight, TrendingUp, ShieldCheck, Percent, RefreshCw, Banknote, Landmark, AlertTriangle } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const SavingsCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Mevduat Faizi Hesaplama 2026 | Net Getiri ve Stopaj Hesapla";
  }, []);

  const [amount, setAmount] = useState<string>('100000');
  const [interest, setInterest] = useState<string>('45');
  const [term, setTerm] = useState<string>('32');
  const [termType, setTermType] = useState<'day' | 'month' | 'year'>('day');
  const [result, setResult] = useState<any>(null);

  const calculateSavings = () => {
    const P = parseFloat(amount);
    const r = parseFloat(interest);
    const t = parseInt(term);

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0) return;

    let days = t;
    if (termType === 'month') days = t * 30;
    if (termType === 'year') days = t * 365;

    const grossInterest = (P * r * days) / 36500;

    let taxRate = 0.10;
    if (days > 180 && days <= 360) taxRate = 0.075;
    if (days > 360) taxRate = 0.05;

    const taxAmount = grossInterest * taxRate;
    const netInterest = grossInterest - taxAmount;
    const totalAmount = P + netInterest;

    setResult({
      grossInterest,
      taxAmount,
      netInterest,
      totalAmount,
      taxRate: taxRate * 100,
      days
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-3xl mb-4 border border-emerald-100 shadow-sm">
          <Coins size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Mevduat Faizi <span className="text-emerald-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Birikimlerinizin net getirisini 2026 stopaj oranları ile anında hesaplayın.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Wallet size={16} className="text-emerald-600" /> Yatırılacak Tutar (₺)
              </label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar size={16} className="text-emerald-600" /> Vade Süresi
                </label>
                <div className="flex gap-2">
                  <input 
                    type="number"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-bold"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <select 
                    className="p-4 bg-slate-100 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer text-xs"
                    value={termType}
                    onChange={(e) => setTermType(e.target.value as any)}
                  >
                    <option value="day">Gün</option>
                    <option value="month">Ay</option>
                    <option value="year">Yıl</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Percent size={16} className="text-emerald-600" /> Faiz Oranı (%)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-bold"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={calculateSavings}
              className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-[0.98]"
            >
              <Calculator size={20} /> Getiriyi Hesapla
            </button>
          </section>

          {/* Yasal Uyarı Kutusu Güncellendi */}
          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Yasal Uyarı</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                <strong>Yasal Uyarı:</strong> Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Banka faiz güncellemeleri veya mevzuat değişiklikleri nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><TrendingUp size={200} /></div>
                
                <div className="relative z-10 text-center">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-2">Net Faiz Getirisi</span>
                  <div className="text-5xl font-black text-emerald-400 mb-6">{(result.netInterest || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Vade Sonu Toplam</div>
                  <div className="text-2xl font-black">{(result.totalAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                 <RefreshCw size={48} className="text-emerald-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Hesaplamaya Başlayın</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Tutar ve faiz oranını girerek birikimlerinizin ne kadar kazandıracağını hemen öğrenin.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default SavingsCalculator;
