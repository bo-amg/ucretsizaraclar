
import React, { useState, useEffect } from 'react';
import { Briefcase, Calculator, Info, ShieldCheck, Calendar, Wallet, FileText, TrendingDown, ArrowRight, Gavel, AlertTriangle } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const SeveranceCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Kıdem ve İhbar Tazminatı Hesaplama 2026 | ucretsizaraclar.com.tr";
  }, []);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [grossSalary, setGrossSalary] = useState('45000');
  const [sideBenefits, setSideBenefits] = useState('0');
  const [result, setResult] = useState<any>(null);

  const calculateTazminat = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const gross = parseFloat(grossSalary);
    const benefits = parseFloat(sideBenefits);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || isNaN(gross) || end <= start) return;

    const KIDEM_TAVANI = 72450.00;
    const DAMGA_VERGISI_ORANI = 0.00759;

    const giydirilmisBrut = Math.min(gross + benefits, KIDEM_TAVANI);
    const gercekGiydirilmisBrut = gross + benefits; 

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = (diffDays % 365) % 30;

    const brutKidem = (giydirilmisBrut / 365) * diffDays;
    const kidemDamgaVergisi = brutKidem * DAMGA_VERGISI_ORANI;
    const netKidem = brutKidem - kidemDamgaVergisi;

    let ihbarHafta = 2;
    if (diffDays >= 180 && diffDays < 540) ihbarHafta = 4;
    else if (diffDays >= 540 && diffDays < 1080) ihbarHafta = 6;
    else if (diffDays >= 1080) ihbarHafta = 8;

    const brutIhbar = (gercekGiydirilmisBrut / 30) * (ihbarHafta * 7);
    const ihbarGelirVergisi = brutIhbar * 0.15; 
    const ihbarDamgaVergisi = brutIhbar * DAMGA_VERGISI_ORANI;
    const netIhbar = brutIhbar - ihbarGelirVergisi - ihbarDamgaVergisi;

    setResult({
      years, months, days,
      brutKidem, netKidem, kidemDamgaVergisi,
      brutIhbar, netIhbar, ihbarGelirVergisi, ihbarDamgaVergisi,
      ihbarHafta,
      toplamNet: netKidem + netIhbar
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-blue-50 text-blue-600 rounded-3xl mb-4 border border-blue-100 shadow-sm">
          <Gavel size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Tazminat <span className="text-blue-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Kıdem ve ihbar tazminatınızı 2026 güncel tavan ücretlerine göre analiz edin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">İşe Giriş</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)} 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">İşten Ayrılış</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Brüt Maaş (₺)</label>
              <input type="number" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-xl font-black" value={grossSalary} onChange={e => setGrossSalary(e.target.value)} />
            </div>

            <button onClick={calculateTazminat} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              <Calculator size={20} /> Tazminatı Hesapla
            </button>
          </section>

          <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200 flex items-start gap-4">
            <AlertTriangle className="text-slate-400 shrink-0" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              <strong>Yasal Uyarı:</strong> Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Mevzuat değişiklikleri, tavan ücreti güncellemeleri veya veri girişleri nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                <div className="bg-blue-600 p-8 rounded-[2rem] text-center shadow-xl">
                  <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest block mb-1">TOPLAM NET ALACAK</span>
                  <div className="text-5xl font-black">{(result.toplamNet || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <Briefcase size={64} className="text-slate-100 mb-6" />
               <h3 className="text-2xl font-black text-slate-900 mb-2">Verileri Girin</h3>
               <p className="text-slate-400 text-sm max-w-sm">
                 Giriş/çıkış tarihlerini ve brüt maaşınızı girerek yasal haklarınızı hemen görün.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32" />
    </div>
  );
};

export default SeveranceCalculator;
