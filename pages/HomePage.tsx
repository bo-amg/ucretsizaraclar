
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, FileText, Image as ImageIcon, Lock, Code2, Palette, ArrowRight, Zap,
  Table, FileSpreadsheet, Calculator, Hash, Percent, User, Landmark, Scale,
  Thermometer, Ruler, RefreshCw, Type, Binary, Globe, QrCode, Dices, List, 
  Search, ShieldCheck, Database, FileCode, SearchIcon, Clock, Utensils, Divide,
  Mail, MessageSquare, PenTool, Braces, Layers, Maximize, MousePointer2, Info,
  Sun, Wind, HardDrive, Square, Box, UserCircle, Layout, FileUp, FileDown, 
  Settings, Terminal, Fingerprint, Eye, EyeOff, Scissors, Edit3, HeartPulse,
  Droplet, Gauge, Activity, Cpu, BrainCircuit, Receipt, Truck, Coins, Gavel, Key, History, GraduationCap, Award, Target, Bitcoin, ArrowRightLeft
} from 'lucide-react';
import { ToolCategory, ToolItem } from '../types';
import AdUnit from '../components/AdUnit';

const ToolCard: React.FC<ToolItem> = ({ title, description, icon, category, path, color }) => (
  <Link 
    to={path}
    className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
  >
    <div className={`inline-flex p-3 rounded-xl mb-4 ${color} bg-opacity-10 transition-transform group-hover:scale-110`}>
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24 }) : icon}
    </div>
    <div className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500 uppercase">
      {category}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
      {title}
    </h3>
    <p className="text-slate-500 text-[11px] leading-relaxed mb-4 flex-grow line-clamp-2">
      {description}
    </p>
    <div className="flex items-center text-indigo-600 font-bold text-xs">
      Hemen Kullan <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Hepsi');

  const allTools: ToolItem[] = useMemo(() => [
    // EN ÇOK KULLANILANLAR
    { id: 'arbitrage', title: 'Banka Makas Hesaplama', description: 'Altın ve Döviz için bankalar arası alım-satım farkı ve en kârlı banka analizi.', icon: <ArrowRightLeft />, category: ToolCategory.OFFICE, path: '/makas-hesaplama', color: 'text-amber-600', keywords: ['makas aralığı', 'banka altın', 'dolar makas', 'arbitraj', 'altın fiyatı'] },
    { id: 'payroll', title: 'Maaş Hesaplama 2026', description: '2026 brütten nete maaş dökümü ve bordro simülatörü.', icon: <Receipt />, category: ToolCategory.OFFICE, path: '/bordro-hesaplama', color: 'text-indigo-600', keywords: ['2026 maaş hesaplama', 'bordro 2026', 'brüt net 2026', 'maaş robotu', 'vergi dilimi 2026'] },
    { id: 'gumruk', title: 'Gümrük Vergisi 2026', description: 'Şubat 2026 yeni gümrük yasasına uygun vergi hesaplayıcı.', icon: <Truck />, category: ToolCategory.OFFICE, path: '/gumruk-vergisi', color: 'text-indigo-600', keywords: ['gümrük vergisi', 'temu vergi', 'amazon gümrük', 'yurt dışı alışveriş', '2026 gümrük'] },
    { id: 'loan', title: 'Kredi Hesaplama 2026', description: 'Banka kredi taksidi, toplam faiz ve ödeme planı.', icon: <Landmark />, category: ToolCategory.OFFICE, path: '/kredi-hesaplama', color: 'text-indigo-600', keywords: ['kredi hesaplama', 'banka faiz', 'taksit hesapla', 'ihtiyaç kredisi', 'konut kredisi'] },
    { id: 'tazminat', title: 'Tazminat Hesaplama', description: 'Kıdem ve ihbar tazminatı haklarınızı 2026 tavan fiyatlarla hesaplayın.', icon: <Gavel />, category: ToolCategory.OFFICE, path: '/tazminat-hesaplama', color: 'text-blue-600', keywords: ['kıdem tazminatı', 'ihbar tazminatı', 'işten ayrılma', 'istifa hakları'] },
    { id: 'tapu', title: 'Tapu Harcı 2026', description: 'Gayrimenkul alım-satım harçlarını ve döner sermaye ücretlerini hesaplayın.', icon: <Key />, category: ToolCategory.OFFICE, path: '/tapu-harci', color: 'text-orange-600', keywords: ['tapu harcı', 'ev alım satım', 'emlak vergisi', 'harç hesapla'] },
    { id: 'savings', title: 'Mevduat Getirisi 2026', description: 'Banka mevduat faizi ve net getiri hesaplama robotu.', icon: <Coins />, category: ToolCategory.OFFICE, path: '/mevduat-hesaplama', color: 'text-emerald-600', keywords: ['mevduat faizi', 'vadeli hesap', 'getiri hesaplama', 'faiz hesapla', 'banka kazanç'] },
    { id: 'gecikme', title: 'Gecikme Zammı 2026', description: 'Vergi ve kamu borçları için 6183 sayılı kanuna göre faiz hesaplayın.', icon: <History />, category: ToolCategory.OFFICE, path: '/gecikme-zammi', color: 'text-red-600', keywords: ['gecikme zammı', 'vergi faizi', '6183 faiz', 'gecikme cezası', 'kamu borcu'] },
    { id: 'exam', title: 'LGS/YKS Puan Hesapla', description: 'Katsayılar ve standart sapmaları içeren güncel tahmin araçları.', icon: <GraduationCap />, category: ToolCategory.OFFICE, path: '/sinav-puan-hesaplama', color: 'text-indigo-600', keywords: ['lgs puan', 'yks puan', 'tyt ayt hesaplama', 'sınav robotu', 'tercih robotu'] },
    { id: 'retirement', title: 'Emeklilik Zamanı', description: 'Ne zaman emekli olacağınızı prim gün sayınıza göre hesaplayın.', icon: <HeartPulse />, category: ToolCategory.OFFICE, path: '/emeklilik-hesaplama', color: 'text-rose-600', keywords: ['emeklilik hesaplama', 'ne zaman emekli olurum', 'eyt hesaplama', 'prim günü'] },
    { id: 'appreciation', title: 'Takdir Teşekkür', description: 'Dönem sonlarında ortaokul ve lise not ortalaması sorguları.', icon: <Award />, category: ToolCategory.OFFICE, path: '/takdir-tesekkur', color: 'text-amber-600', keywords: ['takdir hesaplama', 'teşekkür hesaplama', 'not ortalaması', 'eokul hesapla'] },
    { id: 'obp', title: 'OBP Hesaplama', description: 'YKS üniversite sınavına eklenecek okul puanı hesaplama.', icon: <Target />, category: ToolCategory.OFFICE, path: '/obp-hesaplama', color: 'text-indigo-500', keywords: ['obp hesaplama', 'okul puanı', 'yks obp', 'diploma notu'] },
    { id: 'legal', title: 'Dava Harcı ve Masrafı', description: 'Dava açma maliyetlerini yasal tarifelere göre hesaplayın.', icon: <Scale />, category: ToolCategory.OFFICE, path: '/dava-harci', color: 'text-slate-600', keywords: ['dava harcı', 'mahkeme masrafı', 'harç hesaplama', 'bilirkişi ücreti', 'gider avansi'] },
    { id: 'vat-withholding', title: 'KDV Tevkifat Hesapla', description: 'Reklam ve inşaat sektörüne özel tevkifatlı fatura hesaplama robotu.', icon: <Receipt />, category: ToolCategory.OFFICE, path: '/kdv-tevkifat', color: 'text-emerald-700', keywords: ['tevkifat', 'kdv tevkifat', '9/10 tevkifat', 'fatura hesaplama', 'reklam kdv'] },

    // YAPAY ZEKA
    { id: 'cv-gen', title: 'AI CV Oluşturucu', description: 'Profesyonel özgeçmiş hazırlayın.', icon: <UserCircle />, category: ToolCategory.AI, path: '/cv-gen', color: 'text-indigo-600', keywords: ['cv', 'iş', 'ai', 'kariyer', 'özgeçmiş'] },
    { id: 'summarizer', title: 'AI Metin Özetleme', description: 'Uzun makaleleri özetleyin.', icon: <FileText />, category: ToolCategory.AI, path: '/summarizer', color: 'text-indigo-600', keywords: ['ai', 'özet', 'text'] },
    { id: 'image-gen', title: 'AI Görsel Oluşturma', description: 'Yapay zeka ile görsel üretin.', icon: <ImageIcon />, category: ToolCategory.AI, path: '/image-gen', color: 'text-pink-600', keywords: ['resim', 'ai', 'art'] },
    { id: 'excel-formula', title: 'AI Excel Formülü', description: 'Formülleri AI ile yazdırın.', icon: <FileSpreadsheet />, category: ToolCategory.AI, path: '/excel-formula', color: 'text-emerald-600', keywords: ['excel', 'ai', 'formül'] },
    { id: 'recipe-gen', title: 'AI Yemek Tarifi', description: 'Yapay zeka şefiniz olsun.', icon: <Utensils />, category: ToolCategory.AI, path: '/recipe-gen', color: 'text-orange-600', keywords: ['yemek', 'ai', 'tarif'] },

    // OFİS & VERİ
    { id: 'kdv', title: 'KDV Hesaplama', description: 'Vergi dahil/hariç hesaplama.', icon: <Calculator />, category: ToolCategory.OFFICE, path: '/kdv-hesaplama', color: 'text-blue-600', keywords: ['kdv', 'vergi', 'finans'] },
    { id: 'percent', title: 'Yüzde Hesaplama', description: 'Hızlı yüzde bulma.', icon: <Percent />, category: ToolCategory.OFFICE, path: '/yuzde-hesaplama', color: 'text-orange-500', keywords: ['yüzde', 'matematik', 'hesap'] },
    { id: 'bmi', title: 'VKE (BMI) Hesapla', description: 'Sağlıklı kilonuzu bulun.', icon: <HeartPulse />, category: ToolCategory.OFFICE, path: '/bmi-hesaplama', color: 'text-red-500', keywords: ['vke', 'sağlık', 'diyet'] },
    { id: 'age', title: 'Yaş Hesaplama', description: 'Doğum gününe göre yaş.', icon: <Activity />, category: ToolCategory.OFFICE, path: '/yas-hesaplama', color: 'text-teal-600', keywords: ['yaş', 'tarih', 'zaman'] },

    // YAZILIMCI ARAÇLARI
    { id: 'json-fmt', title: 'JSON Formatter', description: 'JSON verisini güzelleştir.', icon: <Code2 />, category: ToolCategory.DEV, path: '/json-formatter', color: 'text-amber-600', keywords: ['json', 'format', 'code'] },
    { id: 'b64', title: 'Base64 Araçları', description: 'Encode ve Decode işlemleri.', icon: <Binary />, category: ToolCategory.DEV, path: '/base64', color: 'text-slate-800', keywords: ['base64', 'kod', 'encode'] },

    // DÖNÜŞTÜRÜCÜLER
    { id: 'u-length', title: 'Uzunluk Çevirici', description: 'Metre, Mil, İnç çevrimi.', icon: <Ruler />, category: ToolCategory.UNIT, path: '/unit-length', color: 'text-slate-600', keywords: ['uzunluk', 'çevirici'] },
    { id: 'u-weight', title: 'Ağırlık Çevirici', description: 'Kg, Lb, Ton çevrimi.', icon: <Scale />, category: ToolCategory.UNIT, path: '/unit-weight', color: 'text-orange-600', keywords: ['ağırlık', 'çevirici'] },

    // TASARIM ARAÇLARI
    { id: 'i-resizer', title: 'Boyut Küçültücü', description: 'Resim boyutlarını küçült.', icon: <Maximize />, category: ToolCategory.DESIGN, path: '/image-resizer', color: 'text-pink-600', keywords: ['resim', 'boyut', 'optimize'] },
    { id: 'd-color', title: 'Renk Seçici', description: 'HEX ve RGB kodları.', icon: <Palette />, category: ToolCategory.DESIGN, path: '/color-picker', color: 'text-pink-500', keywords: ['renk', 'hex', 'kod'] },
    
    // DİĞER
    { id: 'pwd', title: 'Şifre Üretici', description: 'Güçlü şifreler üret.', icon: <Lock />, category: ToolCategory.MISC, path: '/password-gen', color: 'text-emerald-600', keywords: ['şifre', 'gevuvenlik'] },
  ], []);

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = tool.title.toLowerCase().includes(query) || 
                          tool.description.toLowerCase().includes(query) ||
                          tool.keywords.some(k => k.includes(query));
      const matchesCategory = activeCategory === 'Hepsi' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, allTools]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white border-b border-slate-200 py-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
          İşlerinizi Kolaylaştıran <br className="hidden md:block"/> <span className="text-indigo-600">Ücretsiz Dijital</span> Araçlar.
        </h1>
        <h2 className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">Maaş hesaplama, vergi robotları ve yapay zeka araçları ile işlerinizi saniyeler içinde halledin.</h2>
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={24} />
          <input 
            type="text"
            placeholder="Ne yapmak istiyorsunuz? (Örn: Maaş, Vergi, CV Oluşturma, OBP)"
            className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:bg-white focus:border-indigo-600 outline-none transition-all shadow-sm text-lg font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-2 overflow-x-auto pb-8 no-scrollbar">
          {['Hepsi', ...Object.values(ToolCategory)].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 -translate-y-1' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-24">
          {filteredTools.map((tool, i) => (
            <React.Fragment key={tool.id}>
              <ToolCard {...tool} />
            </React.Fragment>
          ))}
        </div>

        <section className="bg-white p-12 md:p-16 rounded-[3rem] border border-slate-200 mb-12 shadow-sm">
          <div className="max-w-4xl mx-auto text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Sparkles size={32} className="text-indigo-600" /> Neden ucretsizaraclar.com.tr?
            </h2>
            <div className="prose prose-slate prose-sm max-w-none text-slate-500 space-y-6 leading-relaxed">
              <p>
                <strong>ucretsizaraclar.com.tr</strong>, Türkiye'nin en güncel <strong>maaş hesaplama</strong>, <strong>gümrük vergisi robotu</strong>, <strong>LGS/YKS puan hesaplama</strong> ve <strong>yapay zeka içerik üretme</strong> araçlarını barındırır. Finansal, eğitim ve dijital kararlarınızı alırken güncel mevzuata uygun, güvenilir ve hızlı sonuçlar elde etmenizi sağlıyoruz.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
