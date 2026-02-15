
import React, { useState, useEffect } from 'react';
import { Receipt, Calculator, Info, TrendingDown, ArrowDownRight, Calendar, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle, Wallet, Landmark, Scale, ArrowRightLeft, Zap } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const PayrollCalculator: React.FC = () => {
  useEffect(() => {
    const pageTitle = "2026 Maaş Hesaplama | Brütten Nete ve Netten Brüte Bordro Robotu";
    const pageDesc = "2026 güncel vergi dilimlerine uygun brütten nete ve netten brüte maaş hesaplama aracı. Asgari ücret istisnası dahil 12 aylık kümülatif vergi analizi.";
    document.title = pageTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', pageDesc);

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "2026 Maaş Hesaplama Robotu",
      "operatingSystem": "All",
      "applicationCategory": "FinanceApplication",
      "description": pageDesc,
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "TRY" }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const [calcMode, setCalcMode] = useState<'G2N' | 'N2G'>('G2N');
  const [salaryInput, setSalaryInput] = useState<string>('50000');
  const [monthlyResults, setMonthlyResults] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  const calculateTax = (matrah: number, kumulatif: number) => {
    const dilimler = [
      { sinir: 210000, oran: 0.15 },
      { sinir: 550000, oran: 0.20 },
      { sinir: 1400000, oran: 0.27 },
      { sinir: 6500000, oran: 0.35 },
      { sinir: Infinity, oran: 0.40 }
    ];

    let hesaplananVergi = 0;
    let kalanMatrah = matrah;
    let geciciKumulatif = kumulatif;

    for (const dilim of dilimler) {
      const dilimIciLimit = dilim.sinir - geciciKumulatif;
      if (dilimIciLimit > 0) {
        const vergilendirilecekKisim = Math.min(kalanMatrah, dilimIciLimit);
        hesaplananVergi += vergilendirilecekKisim * dilim.oran;
        kalanMatrah -= vergilendirilecekKisim;
        geciciKumulatif += vergilendirilecekKisim;
      }
      if (kalanMatrah <= 0) break;
    }
    return hesaplananVergi;
  };

  const calculateSingleMonth = (brut: number, kumulatifMatrah: number, kumulatifAsgariMatrah: number) => {
    const SGK_ORANI = 0.14;
    const ISSIZLIK_ORANI = 0.01;
    const DAMGA_VERGISI_ORANI = 0.00759;

    const asgariBrut = 27500.00;
    const asgariSgk = asgariBrut * 0.15;
    const asgariMatrah = asgariBrut - asgariSgk;

    const sgkKesintisi = brut * SGK_ORANI;
    const issizlikKesintisi = brut * ISSIZLIK_ORANI;
    const matrah = brut - sgkKesintisi - issizlikKesintisi;
    
    const brutGelirVergisi = calculateTax(matrah, kumulatifMatrah);
    const brutDamgaVergisi = brut * DAMGA_VERGISI_ORANI;

    const asgariGelirVergisiIstisnasi = calculateTax(asgariMatrah, kumulatifAsgariMatrah);
    const asgariDamgaVergisiIstisnasi = asgariBrut * DAMGA_VERGISI_ORANI;

    const odenecekGV = Math.max(0, brutGelirVergisi - asgariGelirVergisiIstisnasi);
    const odenecekDV = Math.max(0, brutDamgaVergisi - asgariDamgaVergisiIstisnasi);

    const toplamKesinti = sgkKesintisi + issizlikKesintisi + odenecekGV + odenecekDV;
    const netMaas = brut - toplamKesinti;

    return { netMaas, kesinti: toplamKesinti, gv: odenecekGV, dv: odenecekDV, matrah, asgariMatrah };
  };

  const findGrossFromNet = (targetNet: number, kumulatifMatrah: number, kumulatifAsgariMatrah: number) => {
    let lower = targetNet;
    let upper = targetNet * 2; 
    let brut = (lower + upper) / 2;
    let iterations = 0;

    while (iterations < 50) {
      const { netMaas } = calculateSingleMonth(brut, kumulatifMatrah, kumulatifAsgariMatrah);
      if (Math.abs(netMaas - targetNet) < 0.01) break;
      if (netMaas < targetNet) lower = brut;
      else upper = brut;
      brut = (lower + upper) / 2;
      iterations++;
    }
    return brut;
  };

  const runYearlySimulation = () => {
    const inputVal = parseFloat(salaryInput);
    if (isNaN(inputVal) || inputVal <= 0) return;

    let kumulatifMatrah = 0;
    let kumulatifAsgariMatrah = 0;
    let toplamNet = 0;
    let toplamBrut = 0;
    let toplamVergi = 0;
    let toplamSGK = 0;
    const simulation = [];

    const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    for (let i = 0; i < 12; i++) {
      let currentBrut = calcMode === 'G2N' ? inputVal : 0;
      
      if (calcMode === 'N2G') {
        // Net maaşın her ay sabit kaldığı varsayımıyla brüt hesaplanır
        currentBrut = findGrossFromNet(inputVal, kumulatifMatrah, kumulatifAsgariMatrah);
      }

      const monthData = calculateSingleMonth(currentBrut, kumulatifMatrah, kumulatifAsgariMatrah);
      
      let dilim = "%15";
      const nextMatrah = kumulatifMatrah + monthData.matrah;
      if (nextMatrah > 1400000) dilim = "%35";
      else if (nextMatrah > 550000) dilim = "%27";
      else if (nextMatrah > 210000) dilim = "%20";

      simulation.push({
        ay: aylar[i],
        brut: currentBrut,
        netMaas: monthData.netMaas,
        kesinti: monthData.kesinti,
        kumulatif: kumulatifMatrah,
        dilim,
        gv: monthData.gv,
        dv: monthData.dv
      });

      toplamNet += monthData.netMaas;
      toplamBrut += currentBrut;
      toplamVergi += (monthData.gv + monthData.dv);
      toplamSGK += (currentBrut * 0.15); // SGK + İşsizlik
      kumulatifMatrah += monthData.matrah;
      kumulatifAsgariMatrah += monthData.asgariMatrah;
    }

    setMonthlyResults(simulation);
    setSummary({
      yillikToplamBrut: toplamBrut,
      yillikToplamNet: toplamNet,
      yillikToplamVergi: toplamVergi,
      yillikToplamSGK: toplamSGK,
    });
  };

  return (
    <article className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 shadow-sm border border-indigo-100">
          <Calendar size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          2026 Maaş <span className="text-indigo-600">Hesaplama Robotu</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Vergi dilimleri ve asgari ücret istisnasına tam uyumlu <strong>bordro simülatörü</strong>. Brütten nete veya netten brüte analiz yapın.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Giriş Paneli */}
        <aside className="lg:col-span-4 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl" aria-labelledby="calc-title">
            <h2 id="calc-title" className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Hesaplama Tercihleri</h2>
            
            <div className="space-y-6">
              {/* Sekme Seçimi */}
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                <button 
                  onClick={() => setCalcMode('G2N')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${calcMode === 'G2N' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  <TrendingDown size={14} /> Brütten Nete
                </button>
                <button 
                  onClick={() => setCalcMode('N2G')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${calcMode === 'N2G' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  <Zap size={14} /> Netten Brüte
                </button>
              </div>

              <div className="space-y-4">
                <label htmlFor="salary-input" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calculator size={16} className="text-indigo-600" /> {calcMode === 'G2N' ? 'Aylık Brüt Maaş (₺)' : 'Aylık Net Maaş (₺)'}
                </label>
                <input 
                  id="salary-input"
                  type="number"
                  placeholder={calcMode === 'G2N' ? "Örn: 80000" : "Örn: 50000"}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-2xl font-black"
                  value={salaryInput}
                  onChange={(e) => setSalaryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runYearlySimulation()}
                />
              </div>

              <button 
                onClick={runYearlySimulation}
                disabled={!salaryInput}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
              >
                12 Aylık Simülasyonu Başlat
              </button>
            </div>
          </section>

          <AdUnit className="h-64" />
        </aside>

        {/* Sonuç Alanı */}
        <section className="lg:col-span-8 space-y-6">
          {summary && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4">
              <div className="bg-slate-900 p-5 rounded-3xl text-white">
                <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Yıllık Toplam Brüt</div>
                <div className="text-lg font-black">{(summary.yillikToplamBrut || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
              </div>
              <div className="bg-indigo-600 p-5 rounded-3xl text-white">
                <div className="text-[10px] text-indigo-100 font-bold uppercase mb-1">Yıllık Toplam Net</div>
                <div className="text-lg font-black">{(summary.yillikToplamNet || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-3xl">
                <div className="text-[10px] text-rose-500 font-bold uppercase mb-1">Toplam Vergi</div>
                <div className="text-lg font-black text-slate-900">{(summary.yillikToplamVergi || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-3xl">
                <div className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Toplam SGK</div>
                <div className="text-lg font-black text-slate-900">{(summary.yillikToplamSGK || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</div>
              </div>
            </div>
          )}

          {monthlyResults.length > 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ArrowRightLeft size={20} className="text-indigo-600" /> {calcMode === 'G2N' ? 'Brütten Nete' : 'Netten Brüte'} Analizi
                </h2>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">2026 GÜNCEL VERİLER</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-4 border-r border-slate-200/50">Ay</th>
                      <th className="px-6 py-4">Brüt Maaş</th>
                      <th className="px-6 py-4">Net Maaş</th>
                      <th className="px-6 py-4">Gelir Vergisi</th>
                      <th className="px-6 py-4">Vergi Dilimi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {monthlyResults.map((m) => (
                      <tr key={m.ay} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 border-r border-slate-100">{m.ay}</td>
                        <td className="px-6 py-4 font-bold text-slate-600 tabular-nums">
                          {m.brut.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                        </td>
                        <td className="px-6 py-4 font-black text-indigo-600 tabular-nums">
                          {m.netMaas.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-rose-500 tabular-nums">
                          {m.gv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                            m.dilim === '%15' ? 'bg-emerald-100 text-emerald-700' : 
                            m.dilim === '%20' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {m.dilim}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Receipt size={64} className="text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Hesaplamaya Başlayın</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Aylık brüt veya net tutarınızı girerek 2026 yılı boyunca maaşınızın nasıl değişeceğini anında analiz edin.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Yasal Uyarı Blok */}
      <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-5 mb-16">
        <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={28} />
        <div className="space-y-2">
          <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Önemli Yasal Sorumluluk Sınırı</h4>
          <p className="text-[12px] text-amber-800 leading-relaxed italic">
            Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Mevzuat değişiklikleri, özel indirimler (engellilik, sendika vb.) veya hesaplama yöntemlerindeki farklılıklar nedeniyle sapmalar ve yanlışlıklar olabilir. <strong>ucretsizaraclar.com.tr</strong> bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez. Kesin bordro işlemleri için mali müşavirinize veya ilgili kurumlara danışın.
          </p>
        </div>
      </div>

      <section className="space-y-16 mb-20 prose prose-slate max-w-none">
        <div className="bg-white p-10 md:p-16 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
            <Info size={36} className="text-indigo-600" /> Sıkça Sorulan Sorular
          </h2>
          <div className="grid md:grid-cols-2 gap-10 not-prose">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" /> Netten brüte ne demek?
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                İşveren ile elinize geçecek "net" tutar üzerinden anlaştıysanız, işverenin sizin adınıza ödeyeceği vergi ve SGK paylarını dahil ederek toplam maliyeti bulma işlemidir. Vergi dilimi arttıkça, net maaşın sabit kalması için brüt maaşın artması gerekir.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" /> Asgari ücret istisnası nedir?
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tüm çalışanların maaşlarının asgari ücrete kadar olan kısmı gelir ve damga vergisinden muaftır. Robotumuz bu istisnayı kümülatif matrahı baz alarak her ay için otomatik hesaplar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdUnit className="h-32" />
    </article>
  );
};

export default PayrollCalculator;
