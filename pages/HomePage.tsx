
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
    // FİNANS & OFİS
    { id: 'arbitrage', title: 'Banka Kâr/Zarar Robotu', description: 'Maliyetinize göre hangi bankada ne kadar kâr veya zarar edeceğinizi anlık hesaplayın.', icon: <ArrowRightLeft />, category: ToolCategory.OFFICE, path: '/makas-hesaplama', color: 'text-amber-600', keywords: ['makas aralığı', 'kâr zarar', 'banka altın', 'dolar makas', 'arbitraj'] },
    { id: 'payroll', title: 'Maaş Hesaplama 2026', description: '2026 brütten nete maaş dökümü ve bordro simülatörü.', icon: <Receipt />, category: ToolCategory.OFFICE, path: '/bordro-hesaplama', color: 'text-indigo-600', keywords: ['2026 maaş hesaplama', 'bordro 2026', 'brüt net 2026'] },
    { id: 'gumruk', title: 'Gümrük Vergisi 2026', description: 'Şubat 2026 yeni gümrük yasasına uygun vergi hesaplayıcı.', icon: <Truck />, category: ToolCategory.OFFICE, path: '/gumruk-vergisi', color: 'text-indigo-600', keywords: ['gümrük vergisi', 'temu vergi', 'amazon gümrük'] },
    { id: 'loan', title: 'Kredi Hesaplama 2026', description: 'Banka kredi taksidi, toplam faiz ve ödeme planı.', icon: <Landmark />, category: ToolCategory.OFFICE, path: '/kredi-hesaplama', color: 'text-indigo-600', keywords: ['kredi hesaplama', 'banka faiz', 'taksit hesapla'] },
    { id: 'tazminat', title: 'Tazminat Hesaplama', description: 'Kıdem ve ihbar tazminatı haklarınızı 2026 tavan fiyatlarla hesaplayın.', icon: <Gavel />, category: ToolCategory.OFFICE, path: '/tazminat-hesaplama', color: 'text-blue-600', keywords: ['kıdem tazminatı', 'ihbar tazminatı', 'işten ayrılma'] },
    { id: 'savings', title: 'Mevduat Getirisi 2026', description: 'Banka mevduat faizi ve net getiri hesaplama robotu.', icon: <Coins />, category: ToolCategory.OFFICE, path: '/mevduat-hesaplama', color: 'text-emerald-600', keywords: ['mevduat faizi', 'vadeli hesap', 'getiri hesaplama'] },
    { id: 'exam', title: 'LGS/YKS Puan Hesapla', description: 'Katsayılar ve standart sapmaları içeren güncel tahmin araçları.', icon: <GraduationCap />, category: ToolCategory.OFFICE, path: '/sinav-puan-hesaplama', color: 'text-indigo-600', keywords: ['lgs puan', 'yks puan', 'tyt ayt hesaplama'] },
    { id: 'vat-withholding', title: 'KDV Tevkifat Hesapla', description: 'Reklam ve inşaat sektörüne özel tevkifatlı fatura hesaplama robotu.', icon: <Receipt />, category: ToolCategory.OFFICE, path: '/kdv-tevkifat', color: 'text-emerald-700', keywords: ['tevkifat', 'kdv tevkifat', '9/10 tevkifat'] },
    { id: 'kdv', title: 'KDV Hesaplama', description: 'Vergi dahil/hariç hesaplama.', icon: <Calculator />, category: ToolCategory.OFFICE, path: '/kdv-hesaplama', color: 'text-blue-600', keywords: ['kdv', 'vergi', 'finans'] },
    { id: 'percent', title: 'Yüzde Hesaplama', description: 'Hızlı yüzde bulma.', icon: <Percent />, category: ToolCategory.OFFICE, path: '/yuzde-hesaplama', color: 'text-orange-500', keywords: ['yüzde', 'matematik', 'hesap'] },

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
    { id: 'pwd', title: 'Şifre Üretici', description: 'Güçlü şifreler üret.', icon: <Lock />, category: ToolCategory.MISC, path: '/password-gen', color: 'text-emerald-600', keywords: ['şifre', 'güvenlik'] },
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
          Hesaplamalarınızı <br className="hidden md:block"/> <span className="text-indigo-600">Saniyeler İçinde</span> Yapın.
        </h1>
        <h2 className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">Maaş hesaplama, gümrük vergisi, banka kâr/zarar ve dönüştürme araçları tamamen ücretsiz.</h2>
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={24} />
          <input 
            type="text"
            placeholder="Ne hesaplamak istiyorsunuz? (Örn: Maaş, Vergi, Makas, KDV)"
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
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
