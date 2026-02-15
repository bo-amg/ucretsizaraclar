
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home, Menu, X, Cpu, Code, Table, Twitter, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import HomePage from './pages/HomePage';
import AISummarizer from './tools/AISummarizer';
import AIImageGenerator from './tools/AIImageGenerator';
import TextConverter from './tools/TextConverter';
import PasswordGenerator from './tools/PasswordGenerator';
import JSONFormatter from './tools/JSONFormatter';
import ColorPicker from './tools/ColorPicker';
import ExcelFormulaHelper from './tools/ExcelFormulaHelper';
import CSVConverter from './tools/CSVConverter';
import GenericCalculator from './tools/GenericCalculator';
import DevToolSuite from './tools/DevToolSuite';
import CountdownTimer from './tools/CountdownTimer';
import RecipeGenerator from './tools/RecipeGenerator';
import RatioCalculator from './tools/RatioCalculator';
import AIToolSuite from './tools/AIToolSuite';
import GenericConverter from './tools/GenericConverter';
import DesignToolSuite from './tools/DesignToolSuite';
import AICVGenerator from './tools/AICVGenerator';
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

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="/#Yapay Zeka" className="hover:text-indigo-600 transition-colors">Yapay Zeka</a>
            <a href="/#Ofis & Veri" className="hover:text-indigo-600 transition-colors">Finans</a>
            <a href="/#Dönüştürücüler" className="hover:text-indigo-600 transition-colors">Birimler</a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 font-bold text-slate-600 animate-fade-in">
          <Link to="/" className="block" onClick={() => setIsMenuOpen(false)}>Ana Sayfa</Link>
          <a href="/#Yapay Zeka" className="block" onClick={() => setIsMenuOpen(false)}>Yapay Zeka</a>
          <a href="/#Ofis & Veri" className="block" onClick={() => setIsMenuOpen(false)}>Finans</a>
        </div>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summarizer" element={<AISummarizer />} />
          <Route path="/image-gen" element={<AIImageGenerator />} />
          <Route path="/cv-gen" element={<AICVGenerator />} />
          <Route path="/excel-formula" element={<ExcelFormulaHelper />} />
          <Route path="/text-tools" element={<TextConverter />} />
          <Route path="/password-gen" element={<PasswordGenerator />} />
          <Route path="/json-formatter" element={<JSONFormatter />} />
          <Route path="/csv-converter" element={<CSVConverter />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/countdown" element={<CountdownTimer />} />
          <Route path="/recipe-gen" element={<RecipeGenerator />} />
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

          <Route path="/ai-poem" element={<AIToolSuite type="poem" />} />
          <Route path="/ai-linkedin" element={<AIToolSuite type="linkedin" />} />
          <Route path="/ai-code-explainer" element={<AIToolSuite type="code" />} />
          <Route path="/ai-email" element={<AIToolSuite type="email" />} />
          <Route path="/ai-story" element={<AIToolSuite type="story" />} />

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

      <footer className="bg-slate-950 text-white pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-lg">U</span>
                </div>
                <span className="text-lg font-black tracking-tighter">ucretsizaraclar<span className="text-indigo-600">.com.tr</span></span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Türkiye'nin en kapsamlı ücretsiz dijital araçlar portalı. Yapay zekadan ofis araçlarına kadar her şey tek bir platformda.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600 transition-colors"><Twitter size={18}/></a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600 transition-colors"><Github size={18}/></a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600 transition-colors"><Mail size={18}/></a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Popüler Araçlar</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/bordro-hesaplama" className="hover:text-white transition-colors">Maaş Hesaplama 2026</Link></li>
                <li><Link to="/takdir-tesekkur" className="hover:text-white transition-colors">Takdir Teşekkür Hesapla</Link></li>
                <li><Link to="/sinav-puan-hesaplama" className="hover:text-white transition-colors">YKS Puan Hesaplama</Link></li>
                <li><Link to="/kredi-hesaplama" className="hover:text-white transition-colors">Kredi Hesaplama</Link></li>
                <li><Link to="/gumruk-vergisi" className="hover:text-white transition-colors">Gümrük Vergisi Hesaplama</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Hızlı Linkler</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Tüm Araçlar</Link></li>
                <li><Link to="/obp-hesaplama" className="hover:text-white transition-colors">OBP Hesaplama</Link></li>
                <li><Link to="/cv-gen" className="hover:text-white transition-colors">AI CV Oluşturucu</Link></li>
                <li><Link to="/json-formatter" className="hover:text-white transition-colors">JSON Formatlayıcı</Link></li>
                <li><Link to="/unit-length" className="hover:text-white transition-colors">Birim Dönüştürücü</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Kurumsal</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Kullanım Şartları</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">İletişim</Link></li>
                <li className="pt-2">
                  <a href="mailto:info@ucretsizaraclar.com.tr" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300">
                    Bize Yazın <ExternalLink size={14}/>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} ucretsizaraclar.com.tr. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                <Cpu size={12}/> AI Powered Platform
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
