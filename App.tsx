
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home, Menu, X, Cpu, Code, Table, Twitter } from 'lucide-react';
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
            <a href="/#Dönüştürücüler" className="hover:text-indigo-600 transition-colors">Birimler</a>
            <a href="/#Tasarım Araçları" className="hover:text-indigo-600 transition-colors">Tasarım</a>
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
          <a href="/#Tasarım Araçları" className="block" onClick={() => setIsMenuOpen(false)}>Tasarım</a>
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
          <Route path="/js-minifier" element={<DevToolSuite type="js-min" />} />
          <Route path="/css-minifier" element={<DevToolSuite type="css-min" />} />
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

      <footer className="bg-slate-900 text-white py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-6 mb-8 opacity-60">
             <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
             <Link to="/" className="hover:text-white transition-colors">Hakkımızda</Link>
             <Link to="/" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
          </div>
          <p className="text-slate-400 text-sm mb-4">© {new Date().getFullYear()} ucretsizaraclar.com.tr - Ücretsiz Dijital Araçlar Portalı</p>
          <div className="flex justify-center gap-4"><Twitter size={20}/></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
