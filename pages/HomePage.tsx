
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
  Droplet, Gauge, Activity, Cpu, BrainCircuit
} from 'lucide-react';
import { ToolCategory, ToolItem } from '../types';
import AdUnit from '../components/AdUnit';

const ToolCard: React.FC<ToolItem> = ({ title, description, icon, category, path, color }) => (
  <Link 
    to={path}
    className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
  >
    <div className={`inline-flex p-3 rounded-xl mb-4 ${color} bg-opacity-10 transition-transform group-hover:scale-110`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
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
    // YAPAY ZEKA (1-15)
    { id: 'cv-gen', title: 'AI CV Oluşturucu', description: 'Profesyonel özgeçmiş hazırlayın.', icon: <UserCircle />, category: ToolCategory.AI, path: '/cv-gen', color: 'text-indigo-600', keywords: ['cv', 'iş', 'ai', 'kariyer', 'özgeçmiş'] },
    { id: 'summarizer', title: 'AI Metin Özetleme', description: 'Uzun makaleleri özetleyin.', icon: <FileText />, category: ToolCategory.AI, path: '/summarizer', color: 'text-indigo-600', keywords: ['ai', 'özet', 'text'] },
    { id: 'image-gen', title: 'AI Görsel Oluşturma', description: 'Yapay zeka ile görsel üretin.', icon: <ImageIcon />, category: ToolCategory.AI, path: '/image-gen', color: 'text-pink-600', keywords: ['resim', 'ai', 'art'] },
    { id: 'excel-formula', title: 'AI Excel Formülü', description: 'Formülleri AI ile yazdırın.', icon: <FileSpreadsheet />, category: ToolCategory.AI, path: '/excel-formula', color: 'text-emerald-600', keywords: ['excel', 'ai', 'formül'] },
    { id: 'recipe-gen', title: 'AI Yemek Tarifi', description: 'Yapay zeka şefiniz olsun.', icon: <Utensils />, category: ToolCategory.AI, path: '/recipe-gen', color: 'text-orange-600', keywords: ['yemek', 'ai', 'tarif'] },
    { id: 'ai-poem', title: 'AI Şiir Yazıcı', description: 'Duygusal şiirler üretin.', icon: <PenTool />, category: ToolCategory.AI, path: '/ai-poem', color: 'text-rose-500', keywords: ['şiir', 'ai', 'edebiyat'] },
    { id: 'ai-linkedin', title: 'AI LinkedIn Post', description: 'Profesyonel paylaşımlar.', icon: <MessageSquare />, category: ToolCategory.AI, path: '/ai-linkedin', color: 'text-blue-600', keywords: ['linkedin', 'ai', 'sosyal medye'] },
    { id: 'ai-code', title: 'AI Kod Açıklayıcı', description: 'Karmaşık kodları anlayın.', icon: <BrainCircuit />, category: ToolCategory.AI, path: '/ai-code-explainer', color: 'text-slate-900', keywords: ['kod', 'ai', 'programlama'] },
    { id: 'ai-email', title: 'AI E-Posta Yazıcı', description: 'Etkileyici mailler yazın.', icon: <Mail />, category: ToolCategory.AI, path: '/ai-email', color: 'text-cyan-600', keywords: ['mail', 'ai', 'eposta'] },
    { id: 'ai-story', title: 'AI Hikaye Yazıcı', description: 'Yaratıcı hikayeler üretin.', icon: <Zap />, category: ToolCategory.AI, path: '/ai-story', color: 'text-amber-500', keywords: ['hikaye', 'ai', 'kitap'] },

    // METİN ARAÇLARI (16-30)
    { id: 'text-tools', title: 'Harf Dönüştürücü', description: 'Büyük/küçük harf işlemleri.', icon: <Type />, category: ToolCategory.TEXT, path: '/text-tools', color: 'text-blue-600', keywords: ['metin', 'harf', 'ters'] },
    { id: 'word-counter', title: 'Kelime Sayacı', description: 'Metin analizi ve istatistik.', icon: <Hash />, category: ToolCategory.TEXT, path: '/word-counter', color: 'text-indigo-500', keywords: ['kelime', 'sayacı', 'karakter'] },
    { id: 'lorem', title: 'Lorem Ipsum', description: 'Taslak metin oluşturucu.', icon: <Edit3 />, category: ToolCategory.TEXT, path: '/text-tools', color: 'text-slate-400', keywords: ['lorem', 'ipsum', 'taslak'] },
    { id: 'slug-gen', title: 'URL Slug Gen', description: 'SEO uyumlu URL oluşturun.', icon: <Globe />, category: ToolCategory.TEXT, path: '/text-tools', color: 'text-emerald-500', keywords: ['seo', 'slug', 'url'] },

    // OFİS & VERİ (31-45)
    { id: 'kdv', title: 'KDV Hesaplama', description: 'Vergi dahil/hariç hesaplama.', icon: <Calculator />, category: ToolCategory.OFFICE, path: '/kdv-hesaplama', color: 'text-blue-600', keywords: ['kdv', 'vergi', 'finans'] },
    { id: 'percent', title: 'Yüzde Hesaplama', description: 'Hızlı yüzde bulma.', icon: <Percent />, category: ToolCategory.OFFICE, path: '/yuzde-hesaplama', color: 'text-orange-500', keywords: ['yüzde', 'matematik', 'hesap'] },
    { id: 'csv-xml', title: 'CSV to XML', description: 'CSV verilerini XML yapın.', icon: <FileUp />, category: ToolCategory.OFFICE, path: '/csv-xml', color: 'text-emerald-600', keywords: ['csv', 'xml', 'veri'] },
    { id: 'xml-json', title: 'XML to JSON', description: 'XML yapısını JSON yapın.', icon: <FileDown />, category: ToolCategory.OFFICE, path: '/xml-json', color: 'text-indigo-600', keywords: ['xml', 'json', 'veri'] },
    { id: 'json-yaml', title: 'JSON to YAML', description: 'Veri formatı dönüşümü.', icon: <Database />, category: ToolCategory.OFFICE, path: '/json-yaml', color: 'text-orange-600', keywords: ['json', 'yaml', 'veri'] },
    { id: 'bmi', title: 'VKE (BMI) Hesapla', description: 'Sağlıklı kilonuzu bulun.', icon: <HeartPulse />, category: ToolCategory.OFFICE, path: '/bmi-hesaplama', color: 'text-red-500', keywords: ['vke', 'sağlık', 'diyet'] },
    { id: 'age', title: 'Yaş Hesaplama', description: 'Doğum gününe göre yaş.', icon: <Activity />, category: ToolCategory.OFFICE, path: '/yas-hesaplama', color: 'text-teal-600', keywords: ['yaş', 'tarih', 'zaman'] },
    { id: 'ratio', title: 'Oran Orantı', description: 'Matematiksel çözümler.', icon: <Divide />, category: ToolCategory.OFFICE, path: '/ratio-calc', color: 'text-indigo-500', keywords: ['oran', 'matematik', 'üçlü'] },

    // YAZILIMCI ARAÇLARI (46-65)
    { id: 'json-fmt', title: 'JSON Formatter', description: 'JSON verisini güzelleştir.', icon: <Code2 />, category: ToolCategory.DEV, path: '/json-formatter', color: 'text-amber-600', keywords: ['json', 'format', 'code'] },
    { id: 'b64', title: 'Base64 Araçları', description: 'Encode ve Decode işlemleri.', icon: <Binary />, category: ToolCategory.DEV, path: '/base64', color: 'text-slate-800', keywords: ['base64', 'kod', 'encode'] },
    { id: 'url-enc', title: 'URL Encode/Decode', description: 'URL güvenli hale getirin.', icon: <Globe />, category: ToolCategory.DEV, path: '/url-encoder', color: 'text-blue-400', keywords: ['url', 'encode', 'web'] },
    { id: 'md5', title: 'MD5 Hash', description: 'Veri bütünlüğü için Hash.', icon: <Terminal />, category: ToolCategory.DEV, path: '/md5-gen', color: 'text-red-400', keywords: ['md5', 'hash', 'şifre'] },
    { id: 'sha256', title: 'SHA256 Hash', description: 'Güçlü şifreleme hash.', icon: <Terminal />, category: ToolCategory.DEV, path: '/sha256-gen', color: 'text-blue-500', keywords: ['sha', 'hash', 'güvenlik'] },
    // Fix: Use Code2 instead of Code because Code is not imported from lucide-react in this file.
    { id: 'html-esc', title: 'HTML Escape', description: 'Karakterleri güvenli yapın.', icon: <Code2 />, category: ToolCategory.DEV, path: '/html-escape', color: 'text-orange-400', keywords: ['html', 'escape', 'web'] },
    { id: 'js-min', title: 'JS Minifier', description: 'Kod boyutunu küçültün.', icon: <FileCode />, category: ToolCategory.DEV, path: '/js-minifier', color: 'text-yellow-600', keywords: ['js', 'minify', 'hız'] },
    { id: 'css-min', title: 'CSS Minifier', description: 'CSS dosyalarını optimize et.', icon: <Layers />, category: ToolCategory.DEV, path: '/css-minifier', color: 'text-indigo-400', keywords: ['css', 'minify', 'tasarım'] },
    { id: 'sql-fmt', title: 'SQL Formatter', description: 'SQL sorgularını düzenle.', icon: <Braces />, category: ToolCategory.DEV, path: '/sql-formatter', color: 'text-slate-700', keywords: ['sql', 'format', 'db'] },

    // DÖNÜŞTÜRÜCÜLER (66-80+)
    { id: 'u-length', title: 'Uzunluk Çevirici', description: 'Metre, Mil, İnç çevrimi.', icon: <Ruler />, category: ToolCategory.UNIT, path: '/unit-length', color: 'text-slate-600', keywords: ['uzunluk', 'çevirici'] },
    { id: 'u-weight', title: 'Ağırlık Çevirici', description: 'Kg, Lb, Ton çevrimi.', icon: <Scale />, category: ToolCategory.UNIT, path: '/unit-weight', color: 'text-orange-600', keywords: ['ağırlık', 'çevirici'] },
    { id: 'u-temp', title: 'Sıcaklık Çevirici', description: 'C, F, K birimleri.', icon: <Thermometer />, category: ToolCategory.UNIT, path: '/unit-temp', color: 'text-red-500', keywords: ['sıcaklık', 'derece'] },
    { id: 'u-data', title: 'Veri Çevirici', description: 'MB, GB, TB çevrimi.', icon: <HardDrive />, category: ToolCategory.UNIT, path: '/unit-data', color: 'text-blue-700', keywords: ['veri', 'mb', 'gb'] },
    { id: 'u-speed', title: 'Hız Çevirici', description: 'KMH, MPH, Knot.', icon: <Wind />, category: ToolCategory.UNIT, path: '/unit-speed', color: 'text-emerald-600', keywords: ['hız', 'çevirici'] },
    { id: 'u-time', title: 'Zaman Çevirici', description: 'Saat, Hafta, Yıl.', icon: <Clock />, category: ToolCategory.UNIT, path: '/unit-time', color: 'text-purple-600', keywords: ['zaman', 'birim'] },
    { id: 'u-area', title: 'Alan Çevirici', description: 'M2, Dönüm, Hektar.', icon: <Maximize />, category: ToolCategory.UNIT, path: '/unit-area', color: 'text-amber-700', keywords: ['alan', 'arazi'] },
    { id: 'u-vol', title: 'Hacim Çevirici', description: 'Litre, M3, Galon.', icon: <Droplet />, category: ToolCategory.UNIT, path: '/unit-volume', color: 'text-cyan-500', keywords: ['hacim', 'su'] },
    { id: 'u-pres', title: 'Basınç Çevirici', description: 'Bar, PSI, Pascal.', icon: <Gauge />, category: ToolCategory.UNIT, path: '/unit-pressure', color: 'text-red-600', keywords: ['basınç', 'hava'] },
    { id: 'u-ene', title: 'Enerji Çevirici', description: 'Joule, Cal, Kwh.', icon: <Zap />, category: ToolCategory.UNIT, path: '/unit-energy', color: 'text-yellow-500', keywords: ['enerji', 'elektrik'] },
    { id: 'u-pow', title: 'Güç Çevirici', description: 'Watt, HP, KW.', icon: <Cpu />, category: ToolCategory.UNIT, path: '/unit-power', color: 'text-indigo-600', keywords: ['güç', 'motor'] },

    // TASARIM ARAÇLARI
    { id: 'i-resizer', title: 'Boyut Küçültücü', description: 'Resim boyutlarını küçült.', icon: <Maximize />, category: ToolCategory.DESIGN, path: '/image-resizer', color: 'text-pink-600', keywords: ['resim', 'boyut', 'optimize'] },
    { id: 'd-color', title: 'Renk Seçici', description: 'HEX ve RGB kodları.', icon: <Palette />, category: ToolCategory.DESIGN, path: '/color-picker', color: 'text-pink-500', keywords: ['renk', 'hex', 'kod'] },
    { id: 'd-grad', title: 'CSS Gradient', description: 'Gradyan CSS üretici.', icon: <Layers />, category: ToolCategory.DESIGN, path: '/design-gradient', color: 'text-indigo-400', keywords: ['gradient', 'css', 'ui'] },
    { id: 'd-shadow', title: 'CSS Shadow', description: 'Gölge efekti CSS.', icon: <Box />, category: ToolCategory.DESIGN, path: '/design-shadow', color: 'text-slate-600', keywords: ['shadow', 'gölge', 'css'] },
    { id: 'd-glass', title: 'Glassmorphism', description: 'Cam efekti tasarımı.', icon: <Sun />, category: ToolCategory.DESIGN, path: '/design-glass', color: 'text-cyan-400', keywords: ['glass', 'cam', 'ui'] },
    { id: 'd-border', title: 'Border Radius', description: 'Köşe yuvarlama kodları.', icon: <Square />, category: ToolCategory.DESIGN, path: '/design-border', color: 'text-emerald-500', keywords: ['border', 'köşe', 'css'] },
    
    // DİĞER
    { id: 'pwd', title: 'Şifre Üretici', description: 'Güçlü şifreler üret.', icon: <Lock />, category: ToolCategory.MISC, path: '/password-gen', color: 'text-emerald-600', keywords: ['şifre', 'güvenlik'] },
    { id: 'qr', title: 'QR Kod Üretici', description: 'Hızlı QR kod oluştur.', icon: <QrCode />, category: ToolCategory.MISC, path: '/qr-gen', color: 'text-slate-900', keywords: ['qr', 'kod'] },
    { id: 'cd', title: 'Geri Sayaç', description: 'Zamanı takip edin.', icon: <Clock />, category: ToolCategory.MISC, path: '/countdown', color: 'text-rose-600', keywords: ['sayaç', 'zaman'] },
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
          Tam <span className="text-indigo-600">80+ Ücretsiz</span> <br className="hidden md:block"/> Dijital Araç.
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">İhtiyacınız olan her şey tek bir platformda, anında elinizin altında.</p>
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={24} />
          <input 
            type="text"
            placeholder="Ne yapmak istiyorsunuz? (Örn: CV, KDV, JSON, Mil Çevirici)"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, i) => (
              <React.Fragment key={tool.id}>
                <ToolCard {...tool} />
                {(i + 1) % 15 === 0 && <div className="col-span-full"><AdUnit className="h-28" /></div>}
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex p-6 bg-slate-100 rounded-full mb-4">
                <SearchIcon size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Aradığınız araç bulunamadı.</h3>
              <p className="text-slate-500">Farklı anahtar kelimelerle tekrar aramayı deneyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
