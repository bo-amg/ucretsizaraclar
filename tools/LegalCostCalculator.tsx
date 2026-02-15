
import React, { useState, useEffect } from 'react';
import { Scale, Calculator, Info, ShieldCheck, FileText, Gavel, Landmark, AlertTriangle, ChevronRight, Wallet, Users, Search } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface CaseType {
  id: string;
  name: string;
  isNispi: boolean; 
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
  const [hasDiscovery, setHasDiscovery] = useState(false); 
  const [result, setResult] = useState<any>(null);

  const calculateCosts = () => {
    const value = parseFloat(claimValue) || 0;
    const parties = parseInt(partyCount) || 2;
    const caseType = caseTypes.find(c => c.id === selectedCaseId)!;

    const NISPI_HARC_ORANI = 0.06831; 
    const PESIN_HARC_ORANI = NISPI_HARC_ORANI / 4; 
    const TEBLIGAT_MASRAFI = 250; 
    const VEKALET_HARCI = 60.50; 
    const GIDER_AVANSI_TABAN = 1200; 

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
                <Gavel size={16} className="text-indigo-600" /> Dava Türü
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
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Dava Değeri (₺)</label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-xl font-black focus:ring-2 focus:ring-indigo-500" 
                value={claimValue} 
                onChange={e => setClaimValue(e.target.value)} 
                disabled={selectedCaseId === 'tuketici_mahkemesi'}
              />
            </div>

            <button onClick={calculateCosts} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              <Calculator size={20} /> Masrafları Hesapla
            </button>
          </section>

          <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] flex items-start gap-4 mb-20">
            <AlertTriangle className="text-amber-600 shrink-0" size={32} />
            <div>
              <h4 className="font-black text-amber-900 mb-2">Yasal Uyarı</h4>
              <p className="text-xs text-amber-800 leading-relaxed italic">
                Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Harç tarifesi güncellemeleri, bilirkişi ücretleri veya mevzuat değişiklikleri nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result && (
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="bg-indigo-600 p-8 rounded-[2rem] text-center shadow-xl">
                    <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1">VEZNEDE ÖDENECEK TOPLAM</span>
                    <div className="text-5xl font-black tabular-nums">{(result.toplamAcilisMaliyeti || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                </div>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32" />
    </div>
  );
};

export default LegalCostCalculator;
