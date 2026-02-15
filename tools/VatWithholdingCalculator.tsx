
import React, { useState, useEffect } from 'react';
import { Calculator, Receipt, Info, FileText, ArrowRightLeft, Percent, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const ratios = [
  { id: '2/10', label: '2/10 (Temizlik, Bahçe, İlaçlama)', val: 0.2 },
  { id: '3/10', label: '3/10 (Yapım İşleri, Mühendislik)', val: 0.3 },
  { id: '4/10', label: '4/10 (Yemek, Organizasyon)', val: 0.4 },
  { id: '5/10', label: '5/10 (İşgücü Temini, Özel Güvenlik)', val: 0.5 },
  { id: '7/10', label: '7/10 (Taşımacılık, Servis)', val: 0.7 },
  { id: '9/10', label: '9/10 (Reklam, Danışmanlık, Denetim)', val: 0.9 },
  { id: '10/10', label: '10/10 (Tam Tevkifat)', val: 1.0 },
];

const VatWithholdingCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "KDV Tevkifat Hesaplama 2026 | Fatura Tevkifat Robotu";
  }, []);

  const [inputMode, setInputMode] = useState<'base' | 'total'>('base');
  const [amount, setAmount] = useState<string>('10000');
  const [vatRate, setVatRate] = useState<number>(0.20);
  const [withholdingId, setWithholdingId] = useState<string>('9/10');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const val = parseFloat(amount);
    const selectedRatio = ratios.find(r => r.id === withholdingId)!.val;
    if (isNaN(val) || val <= 0) return;

    let matrah = 0;
    if (inputMode === 'base') {
      matrah = val;
    } else {
      // Toplamdan matrahı bulma: Toplam = Matrah + (KDV * (1 - Tevkifat))
      // Toplam = Matrah + (Matrah * VatRate * (1 - Tevkifat))
      // Toplam = Matrah * (1 + VatRate * (1 - Tevkifat))
      matrah = val / (1 + vatRate * (1 - selectedRatio));
    }

    const tamKdv = matrah * vatRate;
    const tevkifEdilenKdv = tamKdv * selectedRatio;
    const beyanEdilecekKdv = tamKdv - tevkifEdilenKdv;
    const toplamTahsil = matrah + beyanEdilecekKdv;

    setResult({
      matrah,
      tamKdv,
      tevkifEdilenKdv,
      beyanEdilecekKdv,
      toplamTahsil,
      ratioLabel: withholdingId
    });
  };

  useEffect(() => {
    calculate();
  }, [amount, vatRate, withholdingId, inputMode]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <Receipt size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          KDV <span className="text-indigo-600">Tevkifat</span> Hesaplama
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Reklam, inşaat ve hizmet sektörleri için <strong>tevkifatlı fatura</strong> kalemlerini anında hesaplayın.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Hesaplama Yönü</label>
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                <button 
                  onClick={() => setInputMode('base')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${inputMode === 'base' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  MATRAHTAN (HARİÇ)
                </button>
                <button 
                  onClick={() => setInputMode('total')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${inputMode === 'total' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  TOPLAMDAN (DAHİL)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calculator size={16} className="text-indigo-600" /> Tutar (₺)
              </label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">KDV Oranı</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer text-sm"
                  value={vatRate}
                  onChange={(e) => setVatRate(parseFloat(e.target.value))}
                >
                  <option value={0.20}>%20 KDV</option>
                  <option value={0.10}>%10 KDV</option>
                  <option value={0.01}>%1 KDV</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Tevkifat Oranı</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer text-sm"
                  value={withholdingId}
                  onChange={(e) => setWithholdingId(e.target.value)}
                >
                  {ratios.map(r => (
                    <option key={r.id} value={r.id}>{r.id}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Seçili Oran Açıklaması</span>
                <p className="text-xs font-bold text-indigo-700">{ratios.find(r => r.id === withholdingId)?.label}</p>
            </div>
          </section>

          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Önemli Bilgi</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                Tevkifat uygulaması, faturadaki KDV'nin bir kısmının alıcı tarafından direkt vergi dairesine ödenmesidir. Bu araç 2026 yılı güncel KDV uygulama tebliğlerine uygundur.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Receipt size={240} /></div>
                
                <div className="relative z-10">
                  <header className="mb-10 pb-6 border-b border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Tahsil Edilecek Toplam</span>
                      <div className="text-5xl font-black tabular-nums text-emerald-400">
                        {result.toplamTahsil.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </div>
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Matrah (KDV Hariç)</div>
                      <div className="text-2xl font-black">{result.matrah.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-rose-400 font-bold uppercase mb-1">Tevkif Edilen KDV ({result.ratioLabel})</div>
                      <div className="text-2xl font-black text-rose-400">{result.tevkifEdilenKdv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fatura Dökümü Tablosu */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200 font-black text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 uppercase text-xs tracking-widest">
                    <FileText size={18} className="text-indigo-600" /> Fatura Kalem Detayları
                  </div>
                </div>
                <div className="p-0">
                  <table className="w-full text-left text-sm border-collapse">
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr>
                        <td className="px-8 py-5 text-slate-500">Mal/Hizmet Bedeli (Matrah)</td>
                        <td className="px-8 py-5 text-right font-black text-slate-900">{result.matrah.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 text-slate-500">Hesaplanan KDV (%{vatRate * 100})</td>
                        <td className="px-8 py-5 text-right font-black text-slate-900">{result.tamKdv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                      </tr>
                      <tr className="bg-rose-50/30">
                        <td className="px-8 py-5 text-rose-600 font-bold">Tevkif Edilen KDV ({result.ratioLabel})</td>
                        <td className="px-8 py-5 text-right font-black text-rose-600">-{result.tevkifEdilenKdv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 text-slate-500">Ödenecek / Beyan Edilecek KDV</td>
                        <td className="px-8 py-5 text-right font-black text-slate-900">{result.beyanEdilecekKdv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                      </tr>
                      <tr className="bg-slate-900 text-white">
                        <td className="px-8 py-6 font-black text-lg">TOPLAM TAHSİL EDİLECEK</td>
                        <td className="px-8 py-6 text-right font-black text-2xl text-emerald-400">{result.toplamTahsil.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem]">
                 <h4 className="font-black text-indigo-900 mb-4 flex items-center gap-2">
                   <Info size={18} /> Nasıl Kullanılır?
                 </h4>
                 <p className="text-sm text-indigo-800/70 leading-relaxed">
                   Faturayı keserken alıcıdan tahsil edeceğiniz tutar <strong>Toplam Tahsil Edilecek</strong> kısmıdır. Faturanızın alt kısmında tevkif edilen tutarı ayrıca göstermeli ve matraha kalan KDV'yi ekleyerek genel toplamı oluşturmalısınız.
                 </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default VatWithholdingCalculator;
