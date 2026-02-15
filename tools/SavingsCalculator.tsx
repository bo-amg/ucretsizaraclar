
import React, { useState, useEffect } from 'react';
import { Coins, Calculator, Info, Wallet, PieChart, Calendar, ArrowRight, TrendingUp, ShieldCheck, Percent, RefreshCw, Banknote, Landmark } from 'lucide-react';
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

    // Gün cinsinden vade hesaplama
    let days = t;
    if (termType === 'month') days = t * 30;
    if (termType === 'year') days = t * 365;

    // Brüt Faiz Formülü: (Ana Para * Faiz Oranı * Gün) / 36500
    const grossInterest = (P * r * days) / 36500;

    // 2026 Stopaj (Vergi) Oranları Tahmini
    // 0-6 ay (180 gün): %10
    // 6-12 ay (360 gün): %7.5
    // 1+ yıl: %5
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
        {/* Giriş Alanı */}
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
                  <Percent size={16} className="text-emerald-600" /> Yıllık Faiz Oranı (%)
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

          <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200">
            <h4 className="text-xs font-black text-slate-800 mb-2 flex items-center gap-2 uppercase tracking-widest"><Info size={14} /> Stopaj Hakkında</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              Mevduat kazançları üzerinden vadeye göre değişen oranlarda stopaj (gelir vergisi) kesilir. Bu hesaplama, kazancınızın banka hesabınıza geçecek olan <strong>net</strong> tutarını gösterir.
            </p>
          </div>
        </div>

        {/* Sonuç Alanı */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><TrendingUp size={200} /></div>
                
                <div className="relative z-10">
                  <header className="mb-8 pb-6 border-b border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{(result.days || 0)} Günlük Yatırım Analizi</span>
                      <h3 className="text-2xl font-black">Getiri Özeti</h3>
                    </div>
                  </header>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-emerald-300 font-bold uppercase mb-1">Net Faiz Getirisi</div>
                      <div className="text-3xl font-black text-emerald-400">{(result.netInterest || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Vade Sonu Toplam</div>
                      <div className="text-3xl font-black">{(result.totalAmount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-2">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="opacity-60 italic">Brüt Faiz Getirisi</span>
                      <span className="font-bold">{(result.grossInterest || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="opacity-60 italic">Stopaj Kesintisi (%{(result.taxRate || 0)})</span>
                      <span className="font-bold text-rose-400">-{(result.taxAmount || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-black text-slate-900 flex items-center gap-2">
                   <Landmark size={20} className="text-emerald-600" /> Yatırım Verimliliği
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${((result.netInterest || 0) / (result.grossInterest || 1)) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-black text-slate-600">%{(((result.netInterest || 0) / (result.grossInterest || 1)) * 100).toFixed(1)} Verimlilik</span>
                </div>
                <p className="text-xs text-slate-400">Brüt kazancınızın vergi sonrası cebinize kalan kısmını temsil eder.</p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                 <RefreshCw size={48} className="text-emerald-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Hesaplamaya Başlayın</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Tutar ve faiz oranını girerek birikimlerinizin vadesine göre ne kadar kazandıracağını hemen öğrenin.
               </p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <ShieldCheck size={32} className="text-emerald-600" /> Mevduat Yatırım Rehberi 2026
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Stopaj Avantajı</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Vade süresi uzadıkça ödeyeceğiniz stopaj vergisi düşer. 1 yılı aşan mevduatlarda vergi yükü en düşük seviyededir (%5). Bu durum uzun vadeli yatırımı daha cazip kılar.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Bileşik Faiz Etkisi</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kazandığınız faizi ana paraya ekleyerek tekrar yatırırsanız, bir sonraki dönemde "faizin de faizini" alırsınız. Bu strateji uzun vadede birikimlerinizi katlayarak büyütür.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Valör Kaybı</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Parayı yatırdığınız gün genellikle faiz işlemeye başlamaz (Valör +1). Hesaplamalarımızda banka standartları gereği 365 gün baz alınmıştır.
            </p>
          </div>
        </div>
      </section>

      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default SavingsCalculator;
