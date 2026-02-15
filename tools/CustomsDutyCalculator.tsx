
import React, { useState, useEffect } from 'react';
import { Truck, Info, Calculator, AlertTriangle, RefreshCw, Globe, ShoppingBag, Receipt, Box, Tag, ShieldAlert, ShieldCheck, CreditCard, Layers, Search, FileWarning, Landmark, Scale, FileText, ChevronRight, Wallet } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Category {
  id: string;
  name: string;
  hsCode: string;
  otvRate: number; 
  vatRate: number;
  description: string;
}

const categories: Category[] = [
  { id: 'general', name: 'Genel Eşya & Aksesuar', hsCode: '9801', otvRate: 0, vatRate: 0.20, description: 'Standart ürünler (Artık ticari rejime tabidir).' },
  { id: 'electronics', name: 'Elektronik & Ses Sistemleri', hsCode: '8518', otvRate: 0.20, vatRate: 0.20, description: 'IV sayılı liste kapsamında %20 ek ÖTV uygulanır.' },
  { id: 'watch', name: 'Saat & Akıllı Saat', hsCode: '9101', otvRate: 0.20, vatRate: 0.20, description: 'Akıllı ve klasik saatlerde %20 ek ÖTV vardır.' },
  { id: 'clothing', name: 'Giyim & Tekstil', hsCode: '6100', otvRate: 0, vatRate: 0.20, description: 'Tekstil ürünleri ve aksesuarlar.' },
  { id: 'footwear', name: 'Ayakkabı & Bot', hsCode: '6403', otvRate: 0, vatRate: 0.20, description: 'Her türlü ayakkabı ve spor ayakkabısı.' },
  { id: 'toys', name: 'Oyuncak & Hobi Ürünleri', hsCode: '9503', otvRate: 0, vatRate: 0.20, description: 'Lego, figür ve hobi oyuncakları.' },
  { id: 'cosmetics', name: 'Kozmetik & Parfüm', hsCode: '3303', otvRate: 0.20, vatRate: 0.20, description: 'Kozmetik ürünlerde tam ithalat denetimi uygulanır.' },
  { id: 'autoparts', name: 'Oto Yedek Parça', hsCode: '8708', otvRate: 0, vatRate: 0.20, description: 'Araç yedek parçaları ve aksesuarlar.' },
  { id: 'sports', name: 'Spor & Outdoor Ekipmanları', hsCode: '9506', otvRate: 0, vatRate: 0.20, description: 'Kamp ve spor malzemeleri.' },
  { id: 'jewelry', name: 'Bijuteri & Takı', hsCode: '7117', otvRate: 0.20, vatRate: 0.20, description: 'Değerli olmayan takılar.' },
  { id: 'homedecor', name: 'Ev Dekorasyon & Mutfak', hsCode: '6911', otvRate: 0, vatRate: 0.20, description: 'Mutfak gereçleri ve süs eşyaları.' },
  { id: 'books', name: 'Kitap & Basılı Yayın', hsCode: '4901', otvRate: 0, vatRate: 0, description: 'Kitaplarda gümrük muafiyeti olsa da müşavir gerekebilir.' },
  { id: 'pets', name: 'Evcil Hayvan Ürünleri', hsCode: '4201', otvRate: 0, vatRate: 0.20, description: 'Mama kapları, tasmalar ve aksesuarlar.' },
];

const CustomsDutyCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Gümrük Vergisi Hesaplama 2026 | ucretsizaraclar.com.tr";
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Şubat 2026 Gümrük Hesaplama Robotu",
      "applicationCategory": "FinanceApplication",
      "description": "Şubat 2026'da yürürlüğe giren 4458 sayılı kanun değişikliğine uygun gümrük maliyeti hesaplayıcı.",
      "operatingSystem": "All"
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const [price, setPrice] = useState<string>('');
  const [currency, setCurrency] = useState<'TRY' | 'USD' | 'EUR'>('EUR');
  const [exchangeRate, setExchangeRate] = useState<string>('42.50');
  const [origin, setOrigin] = useState<'EU' | 'OTHER'>('OTHER');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('general');
  const [result, setResult] = useState<any>(null);

  const calculateDuty = () => {
    const p = parseFloat(price);
    const rate = parseFloat(exchangeRate);
    if (isNaN(p) || (currency !== 'TRY' && isNaN(rate)) || p <= 0) return;

    const currentCategory = categories.find(c => c.id === selectedCategoryId)!;
    const priceInTRY = currency === 'TRY' ? p : p * rate;

    const baseDutyRate = origin === 'EU' ? 0.30 : 0.60;
    const gumrukVergisi = priceInTRY * baseDutyRate;
    const otvTutari = (priceInTRY + gumrukVergisi) * currentCategory.otvRate;
    const kdvMatrahi = priceInTRY + gumrukVergisi + otvTutari;
    const kdvTutari = kdvMatrahi * currentCategory.vatRate;

    // Sabit Çekim Masrafları
    const musavirlikUcreti = 8500.00; 
    const noterVekalet = 1850.00; 
    const ardiyeUcreti = 4500.00; 
    const ordinoDosya = 2500.00; 
    const damgaVergisi = 560.00; 

    const toplamVergi = gumrukVergisi + otvTutari + kdvTutari;
    const toplamCekimMasrafi = musavirlikUcreti + noterVekalet + ardiyeUcreti + ordinoDosya + damgaVergisi;
    
    const urunArtiVergiler = priceInTRY + toplamVergi;
    const nihaiMaliyet = priceInTRY + toplamVergi + toplamCekimMasrafi;

    setResult({
      priceInTRY,
      gumrukVergisi,
      otvTutari,
      kdvTutari,
      musavirlikUcreti,
      noterVekalet,
      ardiyeUcreti,
      ordinoDosya,
      damgaVergisi,
      toplamVergi,
      toplamCekimMasrafi,
      urunArtiVergiler,
      nihaiMaliyet,
      hsCode: currentCategory.hsCode,
      origin: origin === 'EU' ? 'Avrupa Birliği' : 'Çin / Diğer'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100">
          <Truck size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Gümrük Vergisi Hesaplama <span className="text-indigo-600">2026</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Şubat 2026 yeni yasasına uygun <strong>kalem kalem masraf dökümü</strong> ve maliyet analiz robotu.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Giriş Formu */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Tag size={16} className="text-indigo-600" /> Ürün Kategorisi
              </label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name} (HS: {cat.hsCode})</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ShoppingBag size={16} className="text-indigo-600" /> Ürün Fiyatı
              </label>
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder="0.00"
                  className="flex-grow p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-xl font-black min-w-0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <select 
                  className="w-28 sm:w-32 flex-shrink-0 p-4 bg-slate-100 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer text-xs"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="TRY">TRY (₺)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Gönderici Bölge</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setOrigin('EU')}
                  className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${origin === 'EU' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  Avrupa Birliği
                </button>
                <button 
                  onClick={() => setOrigin('OTHER')}
                  className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${origin === 'OTHER' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  Çin / Diğer
                </button>
              </div>
            </div>

            <button 
              onClick={calculateDuty}
              disabled={!price}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
            >
              <Calculator size={20} /> Detaylı Hesapla
            </button>
          </section>

          <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
            <h4 className="text-sm font-black text-indigo-800 mb-2 flex items-center gap-2 uppercase tracking-widest"><Info size={16} /> Bilgi</h4>
            <p className="text-[10px] text-indigo-600 leading-relaxed font-medium">
              30€ sınırı kaldırıldığı için tüm bireysel gönderiler ticari ithalat statüsünde işlem görür. Bu hesaplama tahmini müşavirlik ve depo giderlerini içerir.
            </p>
          </div>
        </div>

        {/* Sonuç Alanı */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Landmark size={240} /></div>
                
                <div className="relative z-10">
                  <header className="mb-8 pb-6 border-b border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Tahmini İthalat Özeti (HS: {result.hsCode})</span>
                      <h3 className="text-2xl font-black">Maliyet Analizi</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Ürün Bedeli</span>
                      <div className="text-xl font-bold">{result.priceInTRY.toLocaleString('tr-TR')} ₺</div>
                    </div>
                  </header>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* 1. Kısım: Vergiler */}
                    <div className="space-y-4">
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Layers size={14} /> 1. Vergi Kalemleri
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="opacity-60">Gümrük Vergisi</span>
                            <span className="font-bold">+{result.gumrukVergisi.toLocaleString()} ₺</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">KDV (%20)</span>
                            <span className="font-bold">+{result.kdvTutari.toLocaleString()} ₺</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">ÖTV (Kategori Bazlı)</span>
                            <span className="font-bold">+{result.otvTutari.toLocaleString()} ₺</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-bold text-indigo-300">
                            <span>Ürün + Vergiler Toplamı</span>
                            <span>{result.urunArtiVergiler.toLocaleString()} ₺</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Kısım: Çekim Masrafları */}
                    <div className="space-y-4">
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Scale size={14} /> 2. Çekim Masrafları (Tahmini)
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="opacity-60">Müşavirlik Hizmet Bedeli</span>
                            <span className="font-bold">~{result.musavirlikUcreti.toLocaleString()} ₺</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Noter Vekaletname</span>
                            <span className="font-bold">~{result.noterVekalet.toLocaleString()} ₺</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Ardiye & Depo Ücreti</span>
                            <span className="font-bold">~{result.ardiyeUcreti.toLocaleString()} ₺</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Ordino / Dosya Masrafı</span>
                            <span className="font-bold">~{result.ordinoDosya.toLocaleString()} ₺</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-bold text-amber-400">
                            <span>Toplam Çekim Masrafı</span>
                            <span>{result.toplamCekimMasrafi.toLocaleString()} ₺</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-600 p-8 rounded-[2rem] text-center shadow-xl border border-indigo-500">
                    <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1">GENEL TOPLAM MALİYET</span>
                    <div className="text-5xl font-black tabular-nums">
                      {result.nihaiMaliyet.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </div>
                    <p className="text-[10px] text-indigo-200 mt-2 font-medium italic">
                      * Ürün Bedeli + Toplam Vergiler + Çekim Masrafları Dahildir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-[2.5rem] flex items-start gap-4">
                <AlertTriangle className="text-amber-600 shrink-0" size={24} />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Dikkat:</strong> 2026 yılındaki yasal değişiklikler nedeniyle, düşük fiyatlı ürünlerde (örn: 50€) çekim masrafları ürün fiyatından çok daha yüksek çıkmaktadır.
                </p>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <FileWarning size={48} className="text-indigo-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Analize Hazır</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Gümrükten çekilecek paketinizin tüm detaylarını kalem kalem analiz etmek için ürün bilgilerini girin.
               </p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <Search size={32} className="text-indigo-600" /> Masraf Kalemleri Rehberi
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2"><Scale size={20} className="text-indigo-600"/> Müşavirlik & Noter</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ticari ithalat rejiminde paketinizi sizin adınıza bir profesyonelin çekmesi şarttır. Gümrük müşaviri için noter onaylı bir vekaletname çıkartmanız gerekir. Bu masraflar tek seferlik veya her ithalat başına değişebilir.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2"><Landmark size={20} className="text-indigo-600"/> Ardiye & Ordino</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ardiye, paketinizin gümrüklü sahada kaldığı her gün için ödenen kira bedelidir. Ordino ise yükün teslim belgesidir. 2026 şartlarında bu kalemler lojistik firmaları tarafından sabit/günlük bazda fatura edilir.
            </p>
          </div>
        </div>
      </section>

      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default CustomsDutyCalculator;
