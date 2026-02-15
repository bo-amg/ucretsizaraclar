
import React, { useState, useEffect } from 'react';
import { summarizeText } from '../services/geminiService';
import { FileText, Loader2, Copy, Check, RotateCcw } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const AISummarizer: React.FC = () => {
  useEffect(() => {
    document.title = "AI Metin Özetleyici | Ücretsiz Akıllı Özetler";
  }, []);

  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await summarizeText(text);
      setSummary(result);
    } catch (error) {
      console.error(error);
      setSummary("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Ad */}
        <div className="hidden lg:block lg:col-span-1">
          <AdUnit className="h-[600px] sticky top-24" />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <FileText size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Metin Özetleyici</h1>
            <p className="text-slate-500">Uzun makaleleri saniyeler içinde özetleyin.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              <textarea
                className="w-full h-64 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                placeholder="Özetlenmesini istediğiniz metni buraya yapıştırın..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button
                onClick={handleSummarize}
                disabled={loading || !text.trim()}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <RotateCcw size={20} />}
                {loading ? 'Özetleniyor...' : 'Özeti Oluştur'}
              </button>

              {summary && (
                <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl relative animate-in fade-in duration-500">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Özet Sonucu</span>
                    <button onClick={copyToClipboard} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-semibold">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Kopyalandı' : 'Kopyala'}
                    </button>
                  </div>
                  <div className="prose prose-slate max-w-none text-slate-700">{summary}</div>
                </div>
              )}
            </div>
          </div>
          
          <AdUnit className="mt-8 h-32" />
        </div>

        {/* Right Sidebar Ad */}
        <div className="hidden lg:block lg:col-span-1">
          <AdUnit className="h-[600px] sticky top-24" />
        </div>
      </div>
    </div>
  );
};

export default AISummarizer;
