
import React, { useState, useEffect } from 'react';
import { Landmark, Calculator, Info, Wallet, PieChart, Calendar, ArrowRight, FileText, ChevronRight, TrendingUp, ShieldCheck, Percent, Home, Car, ShoppingBag, Banknote, RefreshCw, AlertTriangle } from 'lucide-react';
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
    setInterestType('monthly');
    setInterest(type.defaultInterest);
    setTerm(type.defaultTerm);
    setResult(null);
  };

  const toggleInterestType = () => {
    const currentRate = parseFloat(interest);
    if (isNaN(currentRate)) return;

    if (interestType === 'monthly') {
      setInterestType('yearly');
      setInterest((currentRate * 12).toFixed(2));
    } else {
      setInterestType('monthly');
      setInterest((currentRate / 12).toFixed(2));
    }
  };

  const calculateLoan = () => {
    const P = parseFloat(amount);
    let monthlyRateInput = parseFloat(interest);
    const n = parseInt(term);

    if (isNaN(P) || isNaN(monthlyRateInput) || isNaN(n) || P <= 0) return;

    if (interestType === 'yearly') {
      monthlyRateInput = monthlyRateInput / 12;
    }

    const monthlyRateRaw = monthlyRateInput / 100;
    const taxRate = 1 + (currentType.kkdf + currentType.bsmv); 
    const i = monthlyRateRaw * taxRate; 

    const monthlyPayment = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

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
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Percent size={16} className="text-indigo-600" /> Faiz (%)
                  </label>
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
              <Calculator size={20} /> Hesapla
            </button>
          </section>

          {/* Yasal Uyarı Kutusu Güncellendi */}
          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Yasal Uyarı</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Banka politikaları, kredi notu veya mevzuat değişiklikleri nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
              </p>
            </div>
          </div>
        </div>

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
                 Kredi türünü ve faiz oranını girerek detaylı ödeme planınızı hemen görün.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default LoanCalculator;
