
import React, { useState, useEffect } from 'react';
import { Truck, Info, Calculator, AlertTriangle, Globe, ShoppingBag, Receipt, Tag, ShieldCheck, Landmark, Scale, FileText, ChevronRight, Wallet, Layers, Box, AlertCircle, Coins, ArrowRight } from 'lucide-react';
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

    // Sabit Çekim Masrafları (2026 Tahmini)
    const musavirlikUcreti = 8500.00; 
    const noterVekalet = 1850.00; 
    const ardiyeUcreti = 4500.00; 
    const ordinoDosya = 2500.00; 
    const damgaVergisi = 560.00; 

    const toplamVergi = gumrukVergisi + otvTutari + kdvTutari;
    const toplamCekimMasrafi = musavirlikUcreti + noterVekalet + ardiyeUcreti + ordinoDosya + damgaVergisi;
    const toplamIthalatMaliyeti = toplamVergi + toplamCekimMasrafi;
    const nihaiMaliyet = priceInTRY + toplamIthalatMaliyeti;

    setResult({
      priceInTRY,
      baseDutyRate,
      gumrukVergisi,
      otvRate: currentCategory.otvRate,
      otvTutari,
      vatRate: currentCategory.vatRate,
      kdvTutari,
      musavirlikUcreti,
      noterVekalet,
      ardiyeUcreti,
      ordinoDosya,
      damgaVergisi,
      toplamVergi,
      toplamCekimMasrafi,
      toplamIthalatMaliyeti,
      nihaiMaliyet,
      hsCode: currentCategory.hsCode,
      origin: origin === 'EU' ? 'Avrupa Birliği' : 'Çin / Diğer'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <Truck size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Gümrük Vergisi Hesaplama <span className="text-indigo-600">2026</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Şubat 2026 yeni yasasına uygun <strong>kalem kalem masraf dökümü</strong> ve detaylı maliyet analiz robotu.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Giriş Formu */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
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
                  className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${origin === 'EU' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  Avrupa Birliği
                </button>
                <button 
                  onClick={() => setOrigin('OTHER')}
                  className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${origin === 'OTHER' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  Çin / Diğer
                </button>
              </div>
            </div>

            <button 
              onClick={calculateDuty}
              disabled={!price}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
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
                  <header className="mb-8 pb-6 border-b border-white/10">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Detaylı Maliyet Analizi (HS: {result.hsCode})</span>
                    <h3 className="text-2xl font-black">Maliyet Dökümü</h3>
                  </header>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {/* Sütun 1: Vergi Kalemleri */}
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-indigo-400 font-black text-[11px] uppercase tracking-widest border-b border-white/5 pb-2">
                        <Receipt size={14} /> Vergi Kalemleri
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Gümrük Vergisi (%{result.baseDutyRate * 100})</span>
                          <span className="font-bold text-white">+{result.gumrukVergisi.toLocaleString()} ₺</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">KDV (%{result.vatRate * 100})</span>
                          <span className="font-bold text-white">+{result.kdvTutari.toLocaleString()} ₺</span>
                        </div>
                        {result.otvTutari > 0 && (
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">ÖTV (%{result.otvRate * 100})</span>
                            <span className="font-bold text-white">+{result.otvTutari.toLocaleString()} ₺</span>
                          </div>
                        )}
                        <div className="pt-2 mt-2 border-t border-white/5 flex justify-between font-black text-indigo-400">
                          <span className="text-[10px] uppercase">Toplam Vergi</span>
                          <span>{result.toplamVergi.toLocaleString()} ₺</span>
                        </div>
                      </div>
                    </div>

                    {/* Sütun 2: Çekim Masrafları */}
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-amber-400 font-black text-[11px] uppercase tracking-widest border-b border-white/5 pb-2">
                        <Scale size={14} /> Çekim Masrafları
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Gümrük Müşavirliği</span>
                          <span className="font-bold text-white">~{result.musavirlikUcreti.toLocaleString()} ₺</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Ardiye / Depo / Ordino</span>
                          <span className="font-bold text-white">~{(result.ardiyeUcreti + result.ordinoDosya).toLocaleString()} ₺</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Noter & Damga V.</span>
                          <span className="font-bold text-white">~{(result.noterVekalet + result.damgaVergisi).toLocaleString()} ₺</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-white/5 flex justify-between font-black text-amber-400">
                          <span className="text-[10px] uppercase">Toplam İşlem</span>
                          <span>{result.toplamCekimMasrafi.toLocaleString()} ₺</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sonuç Özeti 3'lü */}
                  <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl border border-indigo-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                       <div>
                         <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1">Ürün Maliyeti</span>
                         <div className="text-2xl font-black">{result.priceInTRY.toLocaleString()} ₺</div>
                       </div>
                       <div className="border-y md:border-y-0 md:border-x border-indigo-400/50 py-4 md:py-0">
                         <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1">İthalat Masrafları</span>
                         <div className="text-2xl font-black">{result.toplamIthalatMaliyeti.toLocaleString()} ₺</div>
                       </div>
                       <div>
                         <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mb-1">Tahmini Toplam</span>
                         <div className="text-3xl font-black text-white">{result.nihaiMaliyet.toLocaleString()} ₺</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yasal Sorumluluk Kutusu */}
              <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                <AlertTriangle className="text-amber-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={32} />
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Önemli Yasal Sorumluluk Sınırı</h4>
                  <p className="text-[12px] text-amber-800 leading-relaxed italic">
                    Bu araç tarafından sunulan hesaplamalar <strong>tahminidir</strong> ve sadece bilgilendirme amaçlıdır. Şubat 2026 yasal değişiklikleri kapsamında bireysel gönderiler ticari rejime tabi tutulmuştur. Döviz kurları, lojistik süreçleri, gümrük memuru değerlendirmesi ve müşavirlik asgari ücret tarifeleri nedeniyle gerçek maliyette sapmalar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir finansal kayıp veya yasal sorumluluğu kabul etmez.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <Calculator size={48} className="text-indigo-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Analize Hazır</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Ürün bedeli ve gönderici bölgesini girerek 2026 yılı güncel ithalat maliyetlerini detaylı şekilde görün.
               </p>
            </div>
          )}
        </div>
      </div>

      <AdUnit className="h-32" />

      {/* SEO Optimizasyon Metin Alanları - 600 Kelime Odaklı */}
      <section className="mt-20 border-t border-slate-200 pt-16 pb-12 space-y-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" size={32} /> 2026 Gümrük Vergisi Yasası: Kapsamlı Analiz
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Türkiye'de yurtdışı alışveriş alışkanlıklarını kökten değiştiren <strong>2026 gümrük yasası</strong> düzenlemeleri ile birlikte, daha önce uygulanan 30 Euro ve 150 Euro gibi muafiyet ve basitleştirilmiş usul sınırları tamamen kaldırılmıştır. Artık <strong>Temu gümrük vergisi</strong> veya <strong>Amazon yurtdışı alışveriş</strong> işlemlerinde, gelen paketin değeri ne olursa olsun tüm bireysel gönderiler ticari ithalat statüsünde işlem görmektedir.
              <br/><br/>
              Bu yeni dönemde, alıcıların sadece gümrük vergisi ödemesiyle paketi kapıda teslim alması süreci sona ermiştir. Yeni düzenleme ile birlikte, her paket için bir gümrük müşaviri ile anlaşılması, noter onaylı vekaletname çıkartılması ve ardiye/ordino gibi ek masrafların ödenmesi zorunlu hale gelmiştir. <strong>Gümrük vergisi hesaplama 2026</strong> robotumuz, bu karmaşık maliyetleri tek tek listeleyerek tüketicilerin sürpriz masraflarla karşılaşmasının önüne geçmektedir. Ticari ithalat rejimine geçiş, bireysel kullanıcıları kurumsal ithalatçılarla aynı mali yükümlülükler altına sokmuştur.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Globe className="text-emerald-600" size={32} /> Temu ve Çin Menşeli Ürünlerde Vergi Oranları
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Özellikle <strong>Temu vergi hesapla</strong> araması yapan kullanıcılar için belirtmek gerekir ki; Çin gibi Avrupa Birliği dışı ülkelerden gelen ürünlerde gümrük vergisi oranı %60 olarak güncellenmiştir. Eğer ürününüz Avrupa Birliği ülkelerinden geliyorsa bu oran %30 olarak uygulanmaktadır. Ancak vergi sadece ürün bedeli üzerinden hesaplanmaz; kargo ücreti ve sigorta giderleri de <strong>CIF bedeli</strong> adı altında vergi matrahına dahil edilmektedir.
              <br/><br/>
              Hesaplama aracımızda "Ürün Bedeli" kısmına kargo dahil tutarı girmeniz, <strong>2026 yurtdışı alışveriş vergisi</strong> analizinizin doğruluğunu artıracaktır. Ayrıca elektronik ürünlerde %20 ek ÖTV ve tüm ithalat kalemlerinde %20 KDV uygulanmaktadır. Bu kümülatif artışlar, ürünün gerçek maliyetini orijinal fatura fiyatının 3 katına kadar çıkarabilmektedir. <strong>ucretsizaraclar.com.tr</strong> olarak amacımız, bu maliyet artışlarını şeffaf bir şekilde size sunarak alışveriş öncesi doğru karar vermenize yardımcı olmaktır.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Landmark className="text-amber-600" size={32} /> Gizli Maliyetler: Ardiye, Ordino ve Müşavirlik Bedelleri
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Yurtdışından gelen bir paketin gümrükten çekilmesi sürecinde, ödenecek tutarın büyük bir kısmını "görünmez" maliyetler oluşturmaktadır. <strong>Gümrük müşavirliği asgari ücret tarifesi</strong> gereği, her bir işlem için yaklaşık 8.500 TL civarında bir hizmet bedeli ödemeniz gerekmektedir. Bunun yanı sıra, ürününüzün gümrüklü sahada (geçici depolama yerinde) beklediği her gün için <strong>ardiye ücreti</strong> tahakkuk eder ve bu ücret gün geçtikçe katlanarak artar.
              <br/><br/>
              Platformumuzda sunduğumuz bu ileri seviye robot, piyasa ortalamalarına göre noter vekalet ücreti (yaklaşık 1.850 TL), dosya masrafı (ordino) ve damga vergisi gibi kalemleri de hesaplamaya dahil eder. Ticari ithalat rejimine geçiş yapılması, 100 dolarlık bir ürün için dahi 15.000 TL'nin üzerinde bir çekim maliyetiyle karşılaşabileceğiniz anlamına gelmektedir. <strong>Ücretsiz gümrük maliyeti hesaplama</strong> servisimizle, bütçenizi bu gizli giderlere göre önceden planlayabilirsiniz.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Scale className="text-blue-600" size={32} /> Gümrük Müşaviri Zorunluluğu ve Yasal Süreçler
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Yeni <strong>4458 sayılı Gümrük Kanunu</strong> ve bağlı yönetmeliklerdeki değişiklikler sonrası, posta veya hızlı kargo yoluyla gelen eşyaların basitleştirilmiş beyanı artık imkansız hale gelmiştir. Ticari mahiyet arz eden veya bireysel kullanım sınırını aşan her gönderi için tam beyanname verilmesi esastır. Bu işlem, ileri düzey teknik bilgi ve gümrük idaresinin BİLGE sistemine erişim gerektirdiği için sadece yetkili bir <strong>gümrük müşaviri</strong> aracılığıyla yapılabilmektedir.
              <br/><br/>
              Hesaplama aracımızdaki iki sütunlu döküm sayesinde, ürün maliyeti ile yasal işlem maliyetini birbirinden ayırarak net bir vizyon elde edebilirsiniz. Yanlış beyan verilmesi durumunda gümrük cezalarıyla karşılaşabileceğinizi veya ürünün gümrükte terk edilmesi durumunda tasfiye süreçlerinin başlayacağını unutmamalısınız. 2026 yılında da <strong>ucretsizaraclar.com.tr</strong>, vergi dilimlerini ve lojistik giderlerini sürekli güncel tutarak Türkiye'nin en güvenilir finansal analiz ve hesaplama platformu olmaya devam edecektir.
            </p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase tracking-tighter">İthalat ve Gümrük Hakkında Sıkça Sorulan Sorular</h2>
          <div className="grid md:grid-cols-3 gap-10 not-prose">
            <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="font-black text-indigo-600 uppercase text-xs flex items-center gap-2"><Box size={14} /> Ordino Nedir?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Taşıyıcı firmanın, eşyanın teslim alınabileceğine dair verdiği belgedir. 2026 yılında kargo firmaları bu belge ve dosya masrafı için sabit ve yüksek ücretler talep etmektedir.</p>
            </div>
            <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="font-black text-indigo-600 uppercase text-xs flex items-center gap-2"><Layers size={14} /> ÖTV IV Sayılı Liste Nedir?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Parfüm, kozmetik, ses sistemleri, akıllı saatler ve beyaz eşya gibi ürünleri kapsayan listedir. Bu kategorideki ürünlerde gümrük vergisine ek olarak %20 ÖTV uygulanır.</p>
            </div>
            <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h4 className="font-black text-indigo-600 uppercase text-xs flex items-center gap-2"><AlertCircle size={14} /> Ardiye Masrafı Neden Artar?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Eşyanın gümrük deposunda kaldığı her gün masraf birikir. Gümrük müşaviri beyannameyi ne kadar hızlı tescil ederse bu maliyet o kadar düşük kalır; ancak evrak eksikliği maliyeti katlar.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomsDutyCalculator;
