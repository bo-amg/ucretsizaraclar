
import React, { useState, useEffect } from 'react';
import { generateExcelFormula } from '../services/geminiService';
// Added missing Info icon to lucide-react imports
import { FileSpreadsheet, Loader2, Copy, Check, Sparkles, MessageSquare, Info } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const ExcelFormulaHelper: React.FC = () => {
  useEffect(() => {
    document.title = "AI Excel Formül Oluşturucu | Ücretsiz Excel Yardımcısı";
  }, []);

  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const formula = await generateExcelFormula(description);
      setResult(formula);
    } catch (error) {
      console.error(error);
      setResult("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
          <FileSpreadsheet size={32} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">AI Excel Formül Oluşturucu</h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          "A sütunundaki sayıları topla ama B sütunu boşsa toplama" gibi isteklerinizi yazın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MessageSquare size={16} /> Ne Yapmak İstiyorsunuz?
              </label>
              <textarea
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                placeholder="Örn: A1 hücresi 100'den büyükse 'Evet' yaz, değilse 'Hayır' yaz..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !description.trim()}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {loading ? 'Yapay Zeka Düşünüyor...' : 'Formülü Oluştur'}
              </button>
            </div>

            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Önerilen Çözüm</span>
                  <button onClick={copyToClipboard} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm font-semibold">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Kopyalandı' : 'Kopyala'}
                  </button>
                </div>
                <div className="p-6 bg-slate-900 rounded-2xl text-emerald-400 font-mono text-sm border border-slate-800 whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            )}
          </div>
          
          <AdUnit className="h-32" />
        </div>

        <div className="space-y-6">
          <AdUnit className="h-[400px]" />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info size={18} className="text-indigo-600" /> İpuçları
            </h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>• Hücre adreslerini (A1, B5 gibi) belirtmeniz daha iyi sonuç verir.</li>
              <li>• İstediğiniz koşulları "Eğer şu ise bu olsun" şeklinde açık yazın.</li>
              <li>• Google Sheets veya Excel olduğunu belirtirseniz spesifik fonksiyonları seçer.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelFormulaHelper;
