
import React, { useState, useEffect } from 'react';
import { Receipt, Calculator, Info, TrendingDown, ArrowDownRight, Calendar, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle, Wallet, Landmark, ShieldCheck, Scale } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const PayrollCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "2026 Maaş Hesaplama | Brütten Nete Bordro Hesaplama Robotu (Güncel)";
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "2026 Maaş Hesaplama ve Bordro Robotu",
      "operatingSystem": "All",
      "applicationCategory": "FinanceApplication",
      "description": "2026 vergi dilimleri ve asgari ücret istisnasına uygun, 12 aylık kümülatif vergi ve maaş dökümü aracı.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "TRY"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => { document.head.removeChild(script); };
  }, []);

  const [grossSalary, setGrossSalary] = useState<string>('');
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

  const runYearlySimulation = () => {
    const brut = parseFloat(grossSalary);
    if (isNaN(brut) || brut <= 0) return;

    const SGK_ORANI = 0.14;
    const ISSIZLIK_ORANI = 0.01;
    const DAMGA_VERGISI_ORANI = 0.00759;

    const asgariBrut = 27500.00;
    const asgariSgk = asgariBrut * 0.15;
    const asgariMatrah = asgariBrut - asgariSgk;

    let kumulatifMatrah = 0;
    let kumulatifAsgariMatrah = 0;
    let toplamNet = 0;
    let toplamVergi = 0;
    let toplamSGK = 0;
    const simulation = [];

    const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    for (let i = 0; i < 12; i++) {
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

      let dilim = "%15";
      if (kumulatifMatrah + matrah > 210000) dilim = "%20";
      if (kumulatifMatrah + matrah > 550000) dilim = "%27";
      if (kumulatifMatrah + matrah > 1400000) dilim = "%35";

      simulation.push({
        ay: aylar[i],
        netMaas,
        kesinti: toplamKesinti,
        kumulatif: kumulatifMatrah,
        dilim,
        gv: odenecekGV,
        dv: odenecekDV
      });

      toplamNet += netMaas;
      toplamVergi += (odenecekGV + odenecekDV);
      toplamSGK += (sgkKesintisi + issizlikKesintisi);
      kumulatifMatrah += matrah;
      kumulatifAsgariMatrah += asgariMatrah;
    }

    setMonthlyResults(simulation);
    setSummary({
      yillikToplamBrut: brut * 12,
      yillikToplamNet: toplamNet,
      yillikToplamVergi: toplamVergi,
      yillikToplamSGK: toplamSGK,
      enYuksek: simulation[0].netMaas,
      enDusuk: simulation[11].netMaas,
      fark: simulation[0].netMaas - simulation[11].netMaas
    });
  };

  return (
    <article className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">
          <Calendar size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">2026 Maaş Hesaplama Robotu</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          2026 gelir vergisi dilimleri ve projeksiyonlarına göre brütten nete maaş dökümünüzü hazırlayın. 
          Kümülatif vergi matrahı ve asgari ücret istisnasını içeren en güncel hesaplama motoru.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Giriş Paneli */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl" aria-labelledby="calc-title">
            <h2 id="calc-title" className="sr-only">2026 Brüt Maaş Girişi</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calculator size={16} className="text-indigo-600" /> Aylık Brüt Maaş (2026)
                </label>
                <input 
                  type="number"
                  placeholder="Örn: 80000"
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-2xl font-black"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runYearlySimulation()}
                />
              </div>

              <button 
                onClick={runYearlySimulation}
                disabled={!grossSalary}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
              >
                Yıllık Maaş Analizi Hazırla
              </button>
            </div>
          </section>

          <AdUnit className="h-64" />
        </div>

        {/* Sonuç Alanı */}
        <div className="lg:col-span-8 space-y-6">
          {summary && (
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4">
              <div className="bg-slate-900 p-5 rounded-3xl text-white">
                <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Yıllık Brüt</div>
                <div className="text-lg font-black">{(summary.yillikToplamBrut || 0).toLocaleString('tr-TR')} TL</div>
              </div>
              <div className="bg-indigo-600 p-5 rounded-3xl text-white">
                <div className="text-[10px] text-indigo-100 font-bold uppercase mb-1">Yıllık Net</div>
                <div className="text-lg font-black">{(summary.yillikToplamNet || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-3xl">
                <div className="text-[10px] text-rose-500 font-bold uppercase mb-1">Toplam Vergi</div>
                <div className="text-lg font-black text-slate-900">{(summary.yillikToplamVergi || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL</div>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-3xl">
                <div className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Toplam SGK</div>
                <div className="text-lg font-black text-slate-900">{(summary.yillikToplamSGK || 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL</div>
              </div>
            </section>
          )}

          {monthlyResults.length > 0 ? (
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <TrendingDown size={20} className="text-rose-500" /> 12 Aylık Bordro Simülasyonu
                </h2>
                <div className="flex gap-2">
                   <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">PROJEKSİYON VERİSİ</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-4 border-r border-slate-200/50">Ay</th>
                      <th className="px-6 py-4">Net Maaş</th>
                      <th className="px-6 py-4">Gelir + Damga V.</th>
                      <th className="px-6 py-4">Kesinti Toplamı</th>
                      <th className="px-6 py-4">Vergi Dilimi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(monthlyResults || []).map((m, idx) => (
                      <tr key={m.ay} className={`group hover:bg-slate-50 transition-colors ${idx > 0 && monthlyResults[idx-1]?.netMaas > m.netMaas ? 'bg-amber-50/30' : ''}`}>
                        <td className="px-6 py-4 font-bold text-slate-900 border-r border-slate-100">{m.ay}</td>
                        <td className="px-6 py-4 font-black text-indigo-600 tabular-nums">
                          {(m.netMaas || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-rose-500 tabular-nums">
                          {((m.gv || 0) + (m.dv || 0)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-400 tabular-nums">
                          {(m.kesinti || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
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
            </section>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Receipt size={64} className="text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Verileri Girin</h3>
              <p className="text-slate-400 text-sm max-w-sm">
                2026 projeksiyonu ile maaşınızın aydan aya nasıl değişeceğini ve toplam vergi yükünüzü görmek için brüt maaşınızı girin.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detaylı Bilgilendirme Merkezi */}
      <section className="space-y-12 mb-16">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Info size={32} className="text-indigo-600" /> 2026 Maaş Hesaplama Rehberi
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <h3 className="font-black text-slate-900">Brüt ve Net Farkı Nedir?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Brüt maaş, işveren tarafından size ödenen ancak henüz yasal kesintilerin (SGK, İşsizlik Payı, Gelir Vergisi) yapılmadığı toplam tutardır. 
                Net maaş ise tüm bu kesintiler ve vergiler çıktıktan sonra banka hesabınıza yatan gerçek paradır.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Scale size={24} />
              </div>
              <h3 className="font-black text-slate-900">Asgari Ücret İstisnası</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                2022'den beri uygulanan sistemde, tüm çalışanların asgari ücrete denk gelen gelirleri Gelir ve Damga Vergisinden muaftır. 
                2026 hesaplamalarımızda bu muafiyetin kümülatif etkisi kuruşu kuruşuna simüle edilmektedir.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Landmark size={24} />
              </div>
              <h3 className="font-black text-slate-900">Kümülatif Vergi Matrahı</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Gelir vergisi, yıl içindeki toplam kazancınıza göre artan oranlıdır. Ocak'ta %15 ile başlayan kesinti, toplam matrahınız 
                2026 için öngörülen limitleri aştığında %20, %27 ve üstü dilimlere çıkarak net maaşınızı düşürür.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
             <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
               <ShieldCheck size={20} className="text-indigo-600" /> 2026 Yılında Maaşlar Neden Düşecek?
             </h4>
             <p className="text-sm text-slate-500 leading-relaxed mb-4">
               Türkiye'deki vergi sistemi "dilim usulü" çalışır. Brüt maaşınız sabit kalsa bile, yılın ortalarına doğru kümülatif toplamınız 
               yasal sınırı geçtiği an bir üst vergi dilimine (örneğin %15'ten %20'ye) dahil olursunuz. Bu durum, özellikle yüksek brüt maaşlı çalışanlarda 
               yılın son aylarında ciddi bir "net maaş kaybı" olarak hissedilir. Aracımız bu kaybı Ocak ayından görmenizi sağlar.
             </p>
          </div>
        </div>

        {/* SEO Odaklı Metin Bloğu */}
        <section className="bg-slate-100 p-12 rounded-[3rem] border border-slate-200">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Türkiye'nin En Kapsamlı 2026 Bordro ve Maaş Analiz Aracı</h2>
          <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-500 leading-relaxed">
            <p>
              <strong>ucretsizaraclar.com.tr</strong> tarafından sunulan 2026 maaş hesaplama robotu, özel sektör ve kamu çalışanlarının 
              yeni dönemdeki finansal planlamalarını yapmaları için tasarlanmıştır. Bu araç sadece bir <em>brütten nete hesaplayıcı</em> değil, 
              aynı zamanda 12 aylık bir finansal simülatördür. 2026 yılı için belirlenen Yeniden Değerleme Oranları (YDO) ve tahmini asgari ücret 
              verileriyle entegre çalışan algoritmamız, size en gerçekçi sonuçları sunmayı hedefler.
            </p>
            <p>
              Kullanıcılarımızın en çok merak ettiği <strong>"2026 vergi dilimleri ne kadar?"</strong> veya <strong>"Maaşım hangi ay düşecek?"</strong> 
              gibi soruların yanıtlarını tablomuzda görsel olarak görebilirsiniz. Hesaplama kalemlerimiz arasında SGK İşçi Payı (%14), İşsizlik Sigortası Payı (%1), 
              Gelir Vergisi (Dilimli) ve Damga Vergisi bulunmaktadır. Tüm bu işlemler tarayıcınızda yapılır ve verileriniz asla sunucularımıza kaydedilmez.
            </p>
          </div>
        </section>
      </section>

      <AdUnit className="h-32" />

      {/* SEO Footer Metni */}
      <footer className="mt-12 py-8 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-loose">
            Etiketler: 2026 Maaş Hesaplama • Brüt Net Hesaplama • Bordro Robotu • Gelir Vergisi Dilimleri 2026 • Asgari Ücret İstisnası 2026 • 
            Net Maaş Hesaplama • Maaş Kesintileri • SGK Kesintisi Hesapla • Kümülatif Vergi Matrahı Nedir • 2026 Yıllık Maaş Analizi
          </p>
        </div>
      </footer>
    </article>
  );
};

export default PayrollCalculator;
