
import React, { useState, useEffect } from 'react';
import { Scale, Calculator, Info, ShieldCheck, FileText, Gavel, Landmark, AlertTriangle, ChevronRight, Wallet, Users, Search } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface CaseType {
  id: string;
  name: string;
  isNispi: boolean; // Değere bağlı mı?
  basvuruHarci: number;
  maktuHarc?: number;
  description: string;
}

const caseTypes: CaseType[] = [
  { id: 'asliye_hukuk', name: 'Asliye Hukuk Mahkemesi', isNispi: true, basvuruHarci: 422.60, description: 'Genel mahkemelerdeki alacak, tazminat ve mülkiyet davaları.' },
  { id: 'sulh_hukuk', name: 'Sulh Hukuk Mahkemesi', isNispi: true, basvuruHarci: 195.30, description: 'Kira tespiti, tahliye, ortaklığın giderilmesi davaları.' },
  { id: 'is_mahkemesi', name: 'İş Mahkemesi', isNispi: true, basvuruHarci: 422.60, description: 'İşçi-işveren uyuşmazlıkları (İşe iade, alacak).' },
  { id: 'ticaret_mahkemesi', name: 'Asliye Ticaret Mahkemesi', isNispi: true, basvuruHarci: 422.60, description: 'Ticari işletmeler arası uyuşmazlıklar.' },
  { id: 'tuketici_mahkemesi', name: 'Tüketici Mahkemesi', isNispi: false, basvuruHarci: 0, maktuHarc: 0, description: 'Tüketici lehine açılan davalar genellikle harçtan muaftır.' },
  { id: 'aile_mahkemesi', name: 'Aile Mahkemesi', isNispi: false, basvuruHarci: 422.60, maktuHarc: 422.60, description: 'Boşanma, velayet, nafaka (maddi tazminat hariç maktu).' },
];

const LegalCostCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Dava Harcı ve Masrafı Hesaplama 2026 | ucretsizaraclar.com.tr";
  }, []);

  const [selectedCaseId, setSelectedCaseId] = useState('asliye_hukuk');
  const [claimValue, setClaimValue] = useState('100000');
  const [partyCount, setPartyCount] = useState('2');
  const [hasDiscovery, setHasDiscovery] = useState(false); // Keşif var mı?
  const [result, setResult] = useState<any>(null);

  const calculateCosts = () => {
    const value = parseFloat(claimValue) || 0;
    const parties = parseInt(partyCount) || 2;
    const caseType = caseTypes.find(c => c.id === selectedCaseId)!;

    // 2026 Tahmini Harç Oranları
    const NISPI_HARC_ORANI = 0.06831; // Bindis 68.31
    const PESIN_HARC_ORANI = NISPI_HARC_ORANI / 4; // Peşin 1/4 ödenir
    const TEBLIGAT_MASRAFI = 250; // Tebligat başı tahmini
    const VEKALET_HARCI = 60.50; 
    const GIDER_AVANSI_TABAN = 1200; // Bilirkişi hariç taban masraflar

    let pesinHarc = 0;
    let basvuruHarci = caseType.basvuruHarci;

    if (caseType.isNispi) {
      pesinHarc = value * PESIN_HARC_ORANI;
    } else {
      pesinHarc = caseType.maktuHarc || 0;
    }

    const tebligatToplama = parties * TEBLIGAT_MASRAFI;
    const kesifMasrafi = hasDiscovery ? 3500 : 0;
    const toplamGiderAvansi = GIDER_AVANSI_TABAN + tebligatToplama + kesifMasrafi;
    
    const toplamAcilisMaliyeti = basvuruHarci + pesinHarc + toplamGiderAvansi + VEKALET_HARCI;

    setResult({
      basvuruHarci,
      pesinHarc,
      toplamGiderAvansi,
      vekaletHarci: VEKALET_HARCI,
      kesifMasrafi,
      tebligatToplama,
      toplamAcilisMaliyeti,
      caseName: caseType.name
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-slate-100 text-slate-700 rounded-3xl mb-4 border border-slate-200 shadow-sm">
          <Scale size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Dava Harcı <span className="text-indigo-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Adalet sarayına gitmeden önce davanızın <strong>açılış masraflarını ve harçlarını</strong> detaylıca dökün.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Gavel size={16} className="text-indigo-600" /> Mahkeme / Dava Türü
              </label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
              >
                {caseTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 italic px-1">{caseTypes.find(c => c.id === selectedCaseId)?.description}</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Dava Değeri (Alacak Tutarı - ₺)</label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-xl font-black focus:ring-2 focus:ring-indigo-500" 
                value={claimValue} 
                onChange={e => setClaimValue(e.target.value)} 
                disabled={selectedCaseId === 'tuketici_mahkemesi'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Users size={16} /> Taraf Sayısı
                </label>
                <input 
                  type="number" 
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-bold" 
                  value={partyCount} 
                  onChange={e => setPartyCount(e.target.value)} 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Keşif İsteği</label>
                <button 
                  onClick={() => setHasDiscovery(!hasDiscovery)}
                  className={`w-full p-4 rounded-2xl border-2 font-black transition-all text-xs ${hasDiscovery ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  {hasDiscovery ? 'EVET (Keşif Var)' : 'HAYIR (Keşif Yok)'}
                </button>
              </div>
            </div>

            <button onClick={calculateCosts} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              <Calculator size={20} /> Masrafları Hesapla
            </button>
          </section>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Landmark size={200} /></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <h3 className="text-xl font-black">Tahmini Dava Açılış Gideri</h3>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{result.caseName}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Toplam Peşin Harçlar</div>
                      <div className="text-3xl font-black">{(result.basvuruHarci + result.pesinHarc).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Toplam Gider Avansı</div>
                      <div className="text-3xl font-black">{(result.toplamGiderAvansi).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                    </div>
                  </div>

                  <div className="bg-indigo-600 p-8 rounded-[2rem] text-center shadow-xl">
                    <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1">VEZNEDE ÖDENECEK TOPLAM</span>
                    <div className="text-5xl font-black tabular-nums">{(result.toplamAcilisMaliyeti || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                    <p className="text-[10px] text-indigo-200 mt-2 italic">* Bilirkişi ve baro pulları hariç asgari tutardır.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200 font-black text-slate-800 flex items-center gap-2">
                  <FileText size={18} className="text-indigo-600" /> Harç ve Masraf Detayları
                </div>
                <div className="p-6 space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500 italic">Başvuru Harcı (Maktu)</span>
                    <span className="font-bold">{(result.basvuruHarci).toLocaleString()} ₺</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500 italic">Peşin Karar Harcı (1/4)</span>
                    <span className="font-bold">{(result.pesinHarc).toLocaleString()} ₺</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500 italic">Tebligat Masrafları (Gider Avansı)</span>
                    <span className="font-bold">{(result.tebligatToplama).toLocaleString()} ₺</span>
                  </div>
                  {result.kesifMasrafi > 0 && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500 italic">Keşif Harcı ve Yolluğu</span>
                      <span className="font-bold">{(result.kesifMasrafi).toLocaleString()} ₺</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500 italic">Vekalet Harcı</span>
                    <span className="font-bold">{(result.vekaletHarci).toLocaleString()} ₺</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <Search size={64} className="text-slate-100 mb-6" />
               <h3 className="text-2xl font-black text-slate-900 mb-2">Dava Detaylarını Girin</h3>
               <p className="text-slate-400 text-sm max-w-sm">
                 Davanın değerini ve türünü seçerek mahkeme veznesinde sizi bekleyen maliyeti şimdiden görün.
               </p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-amber-50 border border-amber-100 p-8 rounded-[3rem] flex items-start gap-4 mb-20">
        <AlertTriangle className="text-amber-600 shrink-0" size={32} />
        <div>
          <h4 className="font-black text-amber-900 mb-2">Yasal Uyarı</h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            Buradaki hesaplamalar 2026 yılı tahmini harç tarifelerine dayanmaktadır. <strong>Bilirkişi ücretleri, baro pulu ve avukatlık vekalet ücretleri</strong> davaya göre değişkenlik gösterdiği için dahil edilmemiştir. Kesin bilgi için bir avukata danışmanız önerilir.
          </p>
        </div>
      </section>

      <AdUnit className="h-32" />
    </div>
  );
};

export default LegalCostCalculator;
