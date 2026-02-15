
import React, { useState, useEffect } from 'react';
import { Clock, Calculator, AlertTriangle, Landmark, Receipt, History, Info, TrendingUp, Calendar, Wallet } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const DelayInterestCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Gecikme Zammı Hesaplama 2026 | Vergi ve Kamu Borcu Faizi";
  }, []);

  const [amount, setAmount] = useState<string>('10000');
  const [dueDate, setDueDate] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [interestRate, setInterestRate] = useState<string>('4.5'); // Güncel aylık oran (Mayıs 2024 itibariyle)
  const [result, setResult] = useState<any>(null);

  const calculateDelayInterest = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100;
    const start = new Date(dueDate);
    const end = new Date(paymentDate);

    if (isNaN(principal) || isNaN(rate) || isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return;

    // Farkı milisaniye cinsinden al
    const diffTime = end.getTime() - start.getTime();
    const diffDaysTotal = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Tam ay ve kalan gün hesaplama
    // 6183 sayılı kanun uyarınca: Ay kesirleri için günlük (ay 30 gün kabul edilir)
    const months = Math.floor(diffDaysTotal / 30);
    const remainingDays = diffDaysTotal % 30;

    const interestFromMonths = principal * rate * months;
    const interestFromDays = (principal * rate / 30) * remainingDays;
    
    const totalInterest = interestFromMonths + interestFromDays;
    const totalDebt = principal + totalInterest;

    setResult({
      principal,
      totalInterest,
      totalDebt,
      months,
      remainingDays,
      diffDaysTotal
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-red-50 text-red-600 rounded-3xl mb-4 border border-red-100 shadow-sm">
          <History size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Gecikme Zammı <span className="text-red-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Vergi, trafik cezası ve diğer kamu borçları için <strong>6183 sayılı kanuna</strong> uygun gecikme maliyetini hesaplayın.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Wallet size={16} className="text-red-600" /> Borç Aslı (Anapara - ₺)
              </label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-100 outline-none transition-all text-xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar size={16} /> Vade Tarihi
                </label>
                <input 
                  type="date"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold text-sm"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar size={16} /> Ödeme Tarihi
                </label>
                <input 
                  type="date"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold text-sm"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <TrendingUp size={16} className="text-red-600" /> Aylık Gecikme Oranı (%)
              </label>
              <input 
                type="number"
                step="0.01"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
              <p className="text-[10px] text-slate-400 italic px-1">21 Mayıs 2024'ten itibaren aylık oran %4,50'dir.</p>
            </div>

            <button 
              onClick={calculateDelayInterest}
              className="w-full py-5 bg-red-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-100"
            >
              <Calculator size={20} /> Faizi Hesapla
            </button>
          </section>

          {/* Yasal Uyarı Kutusu Güncellendi */}
          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Önemli Uyarı</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                Hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Vergi dairesi sistemlerindeki kümülatif faiz uygulamaları veya değişen mevzuat nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Receipt size={240} /></div>
                
                <div className="relative z-10">
                  <header className="mb-8 pb-6 border-b border-white/10">
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Hesaplanan Borç Dökümü</span>
                    <h3 className="text-2xl font-black">Gecikme Detayları</h3>
                  </header>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Gecikme Süresi</div>
                      <div className="text-2xl font-black">
                        {result.months} Ay {result.remainingDays} Gün
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Toplam {result.diffDaysTotal} gün gecikme.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-red-400 font-bold uppercase mb-1">Hesaplanan Faiz</div>
                      <div className="text-2xl font-black text-red-400">
                        {result.totalInterest.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-600 p-8 rounded-[2rem] text-center shadow-xl border border-red-500">
                    <span className="text-[10px] font-black text-red-100 uppercase tracking-widest block mb-1">TOPLAM ÖDENECEK TUTAR</span>
                    <div className="text-5xl font-black tabular-nums">
                      {result.totalDebt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </div>
                    <p className="text-[10px] text-red-200 mt-2 font-medium italic">
                      Anapara + Gecikme Zammı Toplamıdır.
                    </p>
                  </div>
                </div>
              </div>

              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Info size={18} className="text-indigo-600" /> Nasıl Hesaplanır?
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  6183 sayılı Kanun'un 51. maddesine göre, gecikme zammı borcun vadesinden itibaren her ay için ayrı ayrı uygulanır. 
                  Ay kesirleri için (tamamlanmamış aylar) gecikme zammı günlük olarak hesaplanır ve bu hesaplamada bir ay 30 gün kabul edilir. 
                  Trafik cezaları ve vergi borçları için standart uygulama budur.
                </p>
              </section>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                 <Clock size={48} className="text-red-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Borç Verilerini Girin</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Vade tarihi ve ödeme tarihini girerek borcunuza ne kadar faiz eklendiğini detaylıca dökün.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default DelayInterestCalculator;
