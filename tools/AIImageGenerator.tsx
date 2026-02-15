
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { Image as ImageIcon, Loader2, Download, Sparkles, AlertCircle } from 'lucide-react';

const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);
    
    try {
      const result = await generateImage(prompt);
      if (result) {
        setImageUrl(result);
      } else {
        setError("Görsel oluşturulamadı. Lütfen farklı bir prompt deneyin.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-gorsel-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-pink-50 text-pink-600 rounded-2xl mb-4">
          <ImageIcon size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Görsel Oluşturucu</h1>
        <p className="text-slate-500">Hayallerinizi gerçeğe dönüştürün. Ne görmek istediğinizi yazın.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="flex-grow p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
              placeholder="Örn: Ormanda fütüristik bir şehir, gün batımı, dijital sanat..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="md:w-48 py-4 bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-100 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? 'Oluşturuluyor...' : 'Oluştur'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <div className="relative aspect-square w-full max-w-xl mx-auto bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <>
                <img src={imageUrl} alt="AI Generated" className="w-full h-full object-cover animate-in fade-in zoom-in duration-700" />
                <button
                  onClick={handleDownload}
                  className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur shadow-lg rounded-xl text-slate-900 hover:bg-white transition-all"
                >
                  <Download size={24} />
                </button>
              </>
            ) : (
              <div className="text-center text-slate-400 p-8">
                {loading ? (
                  <div className="space-y-4 flex flex-col items-center">
                    <Loader2 size={48} className="animate-spin text-pink-400" />
                    <p className="font-medium animate-pulse">Yapay zeka pikselleri boyuyor...</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                    <p>Görseliniz burada görünecek.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
