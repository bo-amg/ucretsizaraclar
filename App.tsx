
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home, Menu, X, Cpu, Code, Table, Twitter, Github, Linkedin, Mail, ExternalLink, Search } from 'lucide-react';
import HomePage from './pages/HomePage';
import TextConverter from './tools/TextConverter';
import PasswordGenerator from './tools/PasswordGenerator';
import JSONFormatter from './tools/JSONFormatter';
import ColorPicker from './tools/ColorPicker';
import CSVConverter from './tools/CSVConverter';
import GenericCalculator from './tools/GenericCalculator';
import DevToolSuite from './tools/DevToolSuite';
import CountdownTimer from './tools/CountdownTimer';
import RatioCalculator from './tools/RatioCalculator';
import GenericConverter from './tools/GenericConverter';
import DesignToolSuite from './tools/DesignToolSuite';
import ImageResizer from './tools/ImageResizer';
import DataToolSuite from './tools/DataToolSuite';
import PayrollCalculator from './tools/PayrollCalculator';
import CustomsDutyCalculator from './tools/CustomsDutyCalculator';
import LoanCalculator from './tools/LoanCalculator';
import SavingsCalculator from './tools/SavingsCalculator';
import SeveranceCalculator from './tools/SeveranceCalculator';
import RealEstateCalculator from './tools/RealEstateCalculator';
import RetirementCalculator from './tools/RetirementCalculator';
import LegalCostCalculator from './tools/LegalCostCalculator';
import DelayInterestCalculator from './tools/DelayInterestCalculator';
import ExamScoreCalculator from './tools/ExamScoreCalculator';
import AppreciationCalculator from './tools/AppreciationCalculator';
import ObpCalculator from './tools/ObpCalculator';
import ArbitrageCalculator from './tools/ArbitrageCalculator';
import VatWithholdingCalculator from './tools/VatWithholdingCalculator';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const seoKeywords = [
    "2026 maaş hesaplama", "brütten nete maaş", "gümrük vergisi hesaplama 2026", "temu vergi hesapla", 
    "banka makas aralığı hesapla", "altın makas hesaplama", "dolar arbitraj takibi", "kredi taksit hesaplama 2026", 
    "mevduat faiz getirisi", "kıdem tazminatı hesapla", "ihbar tazminatı robotu", "tapu harcı hesaplama", "emeklilik yaşı bulma",
    "dava harcı hesapla", "gecikme zammı 6183", "lgs puan hesaplama 2026", "yks tyt ayt puan robotu", "obp hesaplama", 
    "takdir teşekkür hesapla", "ortaokul ortalama bul", "lise karne notu", "json formatlayıcı", "base64 encode decode",
    "css gradient oluşturucu", "resim boyut küçültme", "birim dönüştürücü", "uzunluk çevirici", "kdv tevkifat hesaplama"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-indigo-100">
              <span className="text-white font-black text-2xl">U</span>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">ucretsizaraclar<span className="text-indigo-600">.com.tr</span></span>
          </Link>
          <nav className="hidden md:flex space-x-6 text-sm font-bold text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
            <a href="/#Ofis & Finans" className="hover:text-indigo-600 transition-colors">Finans</a>
            <a href="/#Dönüştürücüler" className="hover:text-indigo-600 transition-colors">Birimler</a>
            <a href="/#Metin Araçları" className="hover:text-indigo-600 transition-colors">Metin</a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 font-bold text-slate-600 animate-fade-in">
          <Link to="/" className="block" onClick={() => setIsMenuOpen(false)}>Ana Sayfa</Link>
          <a href="/#Ofis & Finans" className="block" onClick={() => setIsMenuOpen(false)}>Finans</a>
          <a href="/#Dönüştürücüler" className="block" onClick={() => setIsMenuOpen(false)}>Birimler</a>
        </div>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/text-tools" element={<TextConverter />} />
          <Route path="/password-gen" element={<PasswordGenerator />} />
          <Route path="/json-formatter" element={<JSONFormatter />} />
          <Route path="/csv-converter" element={<CSVConverter />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/countdown" element={<CountdownTimer />} />
          <Route path="/ratio-calc" element={<RatioCalculator />} />
          <Route path="/image-resizer" element={<ImageResizer />} />
          <Route path="/bordro-hesaplama" element={<PayrollCalculator />} />
          <Route path="/gumruk-vergisi" element={<CustomsDutyCalculator />} />
          <Route path="/kredi-hesaplama" element={<LoanCalculator />} />
          <Route path="/mevduat-hesaplama" element={<SavingsCalculator />} />
          <Route path="/tazminat-hesaplama" element={<SeveranceCalculator />} />
          <Route path="/tapu-harci" element={<RealEstateCalculator />} />
          <Route path="/emeklilik-hesaplama" element={<RetirementCalculator />} />
          <Route path="/dava-harci" element={<LegalCostCalculator />} />
          <Route path="/gecikme-zammi" element={<DelayInterestCalculator />} />
          <Route path="/sinav-puan-hesaplama" element={<ExamScoreCalculator />} />
          <Route path="/takdir-tesekkur" element={<AppreciationCalculator />} />
          <Route path="/obp-hesaplama" element={<ObpCalculator />} />
          <Route path="/makas-hesaplama" element={<ArbitrageCalculator />} />
          <Route path="/kdv-tevkifat" element={<VatWithholdingCalculator />} />
          
          <Route path="/kdv-hesaplama" element={<GenericCalculator type="kdv" />} />
          <Route path="/yuzde-hesaplama" element={<GenericCalculator type="percent" />} />
          <Route path="/bmi-hesaplama" element={<GenericCalculator type="bmi" />} />
          <Route path="/yas-hesaplama" element={<GenericCalculator type="age" />} />
          
          <Route path="/base64" element={<DevToolSuite type="base64" />} />
          <Route path="/url-encoder" element={<DevToolSuite type="url" />} />
          <Route path="/word-counter" element={<DevToolSuite type="wordcounter" />} />
          <Route path="/md5-gen" element={<DevToolSuite type="md5" />} />
          <Route path="/sha256-gen" element={<DevToolSuite type="sha256" />} />
          <Route path="/html-escape" element={<DevToolSuite type="html-esc" />} />
          <Route path="/js-minifier" element={<DevToolSuite type="base64" />} />
          <Route path="/css-minifier" element={<DevToolSuite type="base64" />} />
          <Route path="/sql-formatter" element={<DevToolSuite type="sql-format" />} />

          <Route path="/unit-length" element={<GenericConverter type="length" />} />
          <Route path="/unit-weight" element={<GenericConverter type="weight" />} />
          <Route path="/unit-temp" element={<GenericConverter type="temp" />} />
          <Route path="/unit-data" element={<GenericConverter type="data" />} />
          <Route path="/unit-speed" element={<GenericConverter type="speed" />} />
          <Route path="/unit-time" element={<GenericConverter type="time" />} />
          <Route path="/unit-area" element={<GenericConverter type="area" />} />
          <Route path="/unit-volume" element={<GenericConverter type="volume" />} />
          <Route path="/unit-pressure" element={<GenericConverter type="pressure" />} />
          <Route path="/unit-energy" element={<GenericConverter type="energy" />} />
          <Route path="/unit-power" element={<GenericConverter type="power" />} />

          <Route path="/design-gradient" element={<DesignToolSuite type="gradient" />} />
          <Route path="/design-shadow" element={<DesignToolSuite type="shadow" />} />
          <Route path="/design-glass" element={<DesignToolSuite type="glass" />} />
          <Route path="/design-border" element={<DesignToolSuite type="border" />} />

          <Route path="/csv-xml" element={<DataToolSuite type="csv-xml" />} />
          <Route path="/xml-json" element={<DataToolSuite type="xml-json" />} />
          <Route path="/json-yaml" element={<DataToolSuite type="json-yaml" />} />
        </Routes>
      </main>

      <footer className="bg-slate-950 text-white pt-20 pb-10 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16 relative z-10">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-lg">U</span>
                </div>
                <span className="text-lg font-black tracking-tighter">ucretsizaraclar<span className="text-indigo-600">.com.tr</span></span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Türkiye'nin en kapsamlı ücretsiz dijital hesaplama araçları portalı.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Popüler Araçlar</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/makas-hesaplama" className="hover:text-white transition-colors">Banka Makas Hesapla</Link></li>
                <li><Link to="/bordro-hesaplama" className="hover:text-white transition-colors">Maaş Hesaplama 2026</Link></li>
                <li><Link to="/takdir-tesekkur" className="hover:text-white transition-colors">Takdir Teşekkür Hesapla</Link></li>
                <li><Link to="/kredi-hesaplama" className="hover:text-white transition-colors">Kredi Hesaplama</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Hızlı Linkler</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Tüm Araçlar</Link></li>
                <li><Link to="/obp-hesaplama" className="hover:text-white transition-colors">OBP Hesaplama</Link></li>
                <li><Link to="/json-formatter" className="hover:text-white transition-colors">JSON Formatlayıcı</Link></li>
                <li><Link to="/unit-length" className="hover:text-white transition-colors">Birim Dönüştürücü</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Kurumsal</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Kullanım Şartları</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">İletişim</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-16 mt-16 border-t border-white/5 relative z-10">
            <div className="flex flex-col gap-8">
              <div className="prose prose-invert prose-sm max-w-none opacity-50">
                <p className="text-[10px] leading-relaxed italic">
                  ucretsizaraclar.com.tr olarak Türkiye'nin en kapsamlı <strong>ücretsiz hesaplama araçları</strong> platformunu sunuyoruz. 
                  Sitemiz üzerinden <strong>2026 maaş hesaplama</strong>, <strong>gümrük vergisi</strong> ve 
                  <strong>banka makas aralığı hesaplama</strong> araçlarımızla finansal analizlerinizi saniyeler içinde yapabilirsiniz.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {seoKeywords.map((keyword, i) => (
                  <span key={i} className="text-[9px] font-bold text-slate-600 uppercase hover:text-indigo-400 transition-colors cursor-default">
                    {keyword} {i !== seoKeywords.length - 1 && "•"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <p className="text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} ucretsizaraclar.com.tr. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
