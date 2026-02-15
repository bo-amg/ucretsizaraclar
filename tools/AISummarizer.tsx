import React, { useState, useEffect } from 'react';
import { summarizeText, SummarizeConfig } from '../services/geminiService';
import { FileText, Loader2, Copy, Check, RotateCcw, Settings2, List, AlignLeft, MessageSquare } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const AISummarizer: React.FC = () => {
  useEffect(() => {
    document.title = "AI Metin Özetleyici | Özelleştirilebilir Akıllı Özetler";
  }, []);

  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Yeni Ayar State'leri
  const [sentences, setSentences] = useState(3);
  const [style, setStyle] = useState<'paragraph' | 'bullets'>('paragraph');
  const [tone, setTone] = useState<SummarizeConfig['tone']>('professional');

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await summarizeText(text, { sentences, style, tone });
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sol Sidebar Ad */}
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
            <p className="text-slate-500">Özet uzunluğunu ve stilini kendiniz belirleyin.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 space-y-8">
              {/* Giriş Alanı */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MessageSquare size={16} className="text-indigo-600" /> Özetlenecek Metin
                </label>
                <textarea
                  className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="Buraya uzun bir makale veya metin yapıştırın..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {/* Ayarlar Paneli */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-2">
                  <Settings2 size={18} /> Özet Tercihleri
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cümle Sayısı */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uzunluk: {sentences} Cümle</label>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={sentences} 
                      onChange={(e) => setSentences(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Ton Seçimi */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Anlatım Tonu</label>
                    <select 
                      value={tone}
                      onChange={(e) => setTone(e.target.value as any)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="professional">Profesyonel</option>
                      <option value="simple">Basit (Özetle)</option>
                      <option value="creative">Yaratıcı</option>
                      <option value="academic">Akademik</option>
                    </select>
                  </div>
                </div>

                {/* Stil Seçimi */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStyle('paragraph')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm ${style === 'paragraph' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 bg-white text-slate-400'}`}
                  >
                    <AlignLeft size={18} /> Paragraf
                  </button>
                  <button 
                    onClick={() => setStyle('bullets')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold text-sm ${style === 'bullets' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 bg-white text-slate-400'}`}
                  >
                    <List size={18} /> Maddeler
                  </button>
                </div>
              </div>

              <button
                onClick={handleSummarize}
                disabled={loading || !text.trim()}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <RotateCcw size={24} />}
                {loading ? 'Yapay Zeka Hazırlıyor...' : 'Özeti Oluştur'}
              </button>

              {summary && (
                <div className="mt-8 p-8 bg-indigo-900 rounded-3xl relative animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Sonuç</span>
                    <button onClick={copyToClipboard} className="text-white hover:text-indigo-200 flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Kopyalandı' : 'Kopyala'}
                    </button>
                  </div>
                  <div className="prose prose-invert max-w-none text-indigo-50 leading-relaxed text-lg whitespace-pre-wrap">
                    {summary}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <AdUnit className="mt-8 h-32" />
        </div>

        {/* Sağ Sidebar Ad */}
        <div className="hidden lg:block lg:col-span-1">
          <AdUnit className="h-[600px] sticky top-24" />
        </div>
      </div>
    </div>
  );
};

export default AISummarizer;