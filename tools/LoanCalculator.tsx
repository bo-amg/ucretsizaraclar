
import React, { useState, useEffect } from 'react';
import { Landmark, Calculator, Info, Wallet, PieChart, Calendar, ArrowRight, FileText, ChevronRight, TrendingUp, ShieldCheck, Percent, Home, Car, ShoppingBag, Banknote, RefreshCw } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface LoanType {
  id: string;
  name: string;
  icon: React.ReactNode;
  defaultInterest: string;
  defaultTerm: string;
  maxTerm: number;
  kkdf: number;
  bsmv: number;
  description: string;
}

const loanTypes: LoanType[] = [
  { 
    id: 'personal', 
    name: 'İhtiyaç Kredisi', 
    icon: <ShoppingBag size={20} />, 
    defaultInterest: '3.89', 
    defaultTerm: '12', 
    maxTerm: 36,
    kkdf: 0.15,
    bsmv: 0.15,
    description: 'Bireysel harcamalarınız için. %15 KKDF ve %15 BSMV uygulanır.'
  },
  { 
    id: 'housing', 
    name: 'Konut Kredisi', 
    icon: <Home size={20} />, 
    defaultInterest: '2.99', 
    defaultTerm: '120', 
    maxTerm: 120,
    kkdf: 0,
    bsmv: 0,
    description: 'Ev alımı için. BSMV ve KKDF vergilerinden muaftır.'
  },
  { 
    id: 'vehicle', 
    name: 'Taşıt Kredisi', 
    icon: <Car size={20} />, 
    defaultInterest: '3.50', 
    defaultTerm: '36', 
    maxTerm: 48,
    kkdf: 0.15,
    bsmv: 0.05,
    description: 'Araç alımı için. %15 KKDF ve %5 BSMV uygulanır.'
  }
];

const LoanCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Kredi Hesaplama 2026 | Kredi Maliyeti ve Ödeme Planı";
  }, []);

  const [selectedType, setSelectedType] = useState<string>('personal');
  const [amount, setAmount] = useState<string>('50000');
  const [interest, setInterest] = useState<string>('3.89');
  const [interestType, setInterestType] = useState<'monthly' | 'yearly'>('monthly');
  const [term, setTerm] = useState<string>('12');
  const [result, setResult] = useState<any>(null);

  const currentType = loanTypes.find(t => t.id === selectedType)!;

  const handleTypeChange = (typeId: string) => {
    const type = loanTypes.find(t => t.id === typeId)!;
    setSelectedType(typeId);
    // Yeni tip seçildiğinde faiz tipini Aylık'a çekiyoruz
    setInterestType('monthly');
    setInterest(type.defaultInterest);
    setTerm(type.defaultTerm);
    setResult(null);
  };

  const toggleInterestType = () => {
    const currentRate = parseFloat(interest);
    if (isNaN(currentRate)) return;

    if (interestType === 'monthly') {
      // Aylık -> Yıllık (Basit faiz mantığıyla gösterim)
      setInterestType('yearly');
      setInterest((currentRate * 12).toFixed(2));
    } else {
      // Yıllık -> Aylık
      setInterestType('monthly');
      setInterest((currentRate / 12).toFixed(2));
    }
  };

  const calculateLoan = () => {
    const P = parseFloat(amount);
    let monthlyRateInput = parseFloat(interest);
    const n = parseInt(term);

    if (isNaN(P) || isNaN(monthlyRateInput) || isNaN(n) || P <= 0) return;

    // Eğer yıllık faiz girildiyse aylığa çeviriyoruz
    if (interestType === 'yearly') {
      monthlyRateInput = monthlyRateInput / 12;
    }

    const monthlyRateRaw = monthlyRateInput / 100;

    // Seçili türe göre vergi oranları
    const taxRate = 1 + (currentType.kkdf + currentType.bsmv); 
    const i = monthlyRateRaw * taxRate; // Efektif aylık faiz (vergili)

    // Aylık Taksit Formülü: M = P * [i * (1 + i)^n] / [(1 + i)^n - 1]
    const monthlyPayment = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    // Ödeme Planı Oluşturma
    let balance = P;
    const schedule = [];
    for (let m = 1; m <= n; m++) {
      const interestPayment = balance * i;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      schedule.push({
        period: m,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remaining: Math.max(0, balance)
      });
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveRate: i * 100,
      schedule
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <Banknote size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Kredi Maliyeti <span className="text-indigo-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          İhtiyaç, Konut veya Taşıt kredinizi 2026 güncel vergi mevzuatına göre analiz edin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Giriş Alanı */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ShieldCheck size={16} className="text-indigo-600" /> Kredi Türü
              </label>
              <div className="grid grid-cols-3 gap-2">
                {loanTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all gap-2 ${
                      selectedType === type.id 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' 
                      : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {type.icon}
                    <span className="text-[10px] font-black uppercase tracking-tight">{type.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic px-1">{currentType.description}</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Wallet size={16} className="text-indigo-600" /> Kredi Tutarı (₺)
              </label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-600" /> Vade (Ay)
                </label>
                <input 
                  type="number"
                  max={currentType.maxTerm}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold tracking-widest px-1">
                  <span>VADE</span>
                  <span>MAX {currentType.maxTerm} AY</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Percent size={16} className="text-indigo-600" /> {interestType === 'monthly' ? 'Aylık' : 'Yıllık'} Faiz (%)
                  </label>
                  <button 
                    onClick={toggleInterestType}
                    className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw size={10} /> {interestType === 'monthly' ? 'YILLIĞA ÇEVİR' : 'AYLIĞA ÇEVİR'}
                  </button>
                </div>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={calculateLoan}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
            >
              <Calculator size={20} /> Hesaplamayı Başlat
            </button>
          </section>

          <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200">
            <h4 className="text-xs font-black text-slate-800 mb-2 flex items-center gap-2 uppercase tracking-widest"><Info size={14} /> Bilgilendirme</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              Türkiye'de bankalar genellikle <strong>aylık faiz</strong> oranlarını paylaşır. Eğer yıllık maliyet oranınız varsa "Yıllığa Çevir" butonunu kullanarak giriş yapabilirsiniz. Konut kredilerinde KKDF ve BSMV muafiyeti uygulanmaktadır.
            </p>
          </div>
        </div>

        {/* Sonuç Alanı */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><PieChart size={200} /></div>
                
                <div className="relative z-10">
                  <header className="mb-8 pb-6 border-b border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{currentType.name} Analizi</span>
                      <h3 className="text-2xl font-black">Maliyet Özeti</h3>
                    </div>
                  </header>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-indigo-300 font-bold uppercase mb-1">Aylık Taksit</div>
                      <div className="text-3xl font-black">{(result.monthlyPayment || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-rose-400 font-bold uppercase mb-1">Toplam Geri Ödeme</div>
                      <div className="text-3xl font-black">{(result.totalPayment || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="opacity-60 italic">Toplam Faiz + Vergiler</span>
                      <span className="font-bold text-rose-400">+{(result.totalInterest || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="opacity-60 italic">Efektif Aylık Faiz Oranı (Vergili)</span>
                      <span className="font-bold text-indigo-400">%{(result.effectiveRate || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amortisman Tablosu */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200 font-black text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-indigo-600" /> Taksit Detayları
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{term} Taksit</span>
                </div>
                <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="sticky top-0 bg-slate-50 shadow-sm z-20">
                      <tr className="text-[10px] text-slate-400 font-black uppercase">
                        <th className="px-6 py-4">Taksit</th>
                        <th className="px-6 py-4">Ana Para</th>
                        <th className="px-6 py-4">Faiz+Vergi</th>
                        <th className="px-6 py-4">Kalan Borç</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(result.schedule || []).map((s: any) => (
                        <tr key={s.period} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{s.period}. Ay</td>
                          <td className="px-6 py-4 text-slate-600">{(s.principal || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                          <td className="px-6 py-4 text-rose-500 font-medium">{(s.interest || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                          <td className="px-6 py-4 text-slate-400 text-xs tabular-nums">{(s.remaining || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <TrendingUp size={48} className="text-indigo-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Verileri Girin</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Kredi türünü, tutarını ve faiz oranını girerek detaylı ödeme planınızı hemen görün.
               </p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <ShieldCheck size={32} className="text-indigo-600" /> Kredi & Vergi Rehberi 2026
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Faiz Oranı Tipleri</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bankaların reklamlarında gördüğünüz %3,89 gibi oranlar genellikle <strong>aylık</strong> oranlardır. Bazı finansal kuruluşlar <strong>yıllık maliyet oranını</strong> paylaşabilir. Aracımız her iki tipi de destekler ve hesaplamayı otomatik yapar.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Konut Kredisi Farkı</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Konut kredileri vergiden muaftır. Bu, bankanın faizi %2.99 ise, taksitlerinizin tam olarak bu oran üzerinden hesaplanacağı anlamına gelir. Diğer kredilerde ise vergi ek yükü mevcuttur.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Dosya Masrafı</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Yasal olarak kredi tutarının %0,5'ini geçemeyen dosya masrafı ve hayat sigortası bu hesaplamaya dahil edilmemiştir. Net geri ödeme için bu küçük kalemleri de göz önünde bulundurunuz.
            </p>
          </div>
        </div>
      </section>

      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default LoanCalculator;
