
import React, { useState, useEffect } from 'react';
import { callAI } from '../services/geminiService';
import { UserCircle, Sparkles, Loader2, Copy, Check, FileText } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const AICVGenerator: React.FC = () => {
  const [info, setInfo] = useState('');
  const [cv, setCv] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "AI CV Oluşturucu | Profesyonel Özgeçmiş Hazırla - ucretsizaraclar.com.tr";
  }, []);

  const handleGenerate = async () => {
    if (!info.trim()) return;
    setLoading(true);
    try {
      const res = await callAI(`Şu bilgilerle modern ve etkileyici bir özgeçmiş oluştur. Markdown kullan ve başlıkları net yap: \n\n${info}`);
      setCv(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">
          <UserCircle size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">AI CV Oluşturucu</h1>
        <p className="text-slate-500">Yapay zeka ile dakikalar içinde profesyonel bir CV taslağı hazırlayın.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <h3 className="font-bold text-slate-800">Bilgilerinizi Girin</h3>
          <p className="text-xs text-slate-400 italic">Eğitim, deneyim, yetenekler ve iletişim bilgilerinizi kısa cümlelerle yazın.</p>
          <textarea 
            className="w-full h-80 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
            placeholder="Örn: İsim Ahmet Yılmaz, 5 yıl deneyimli Senior React Developer, İTÜ Bilgisayar mezunu..."
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? 'Yapay Zeka Yazıyor...' : 'CV Oluştur'}
          </button>
        </div>

        <div className="relative">
          {cv ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl h-full overflow-auto max-h-[700px] animate-fade-in prose prose-slate">
              <button 
                onClick={() => {navigator.clipboard.writeText(cv); setCopied(true); setTimeout(() => setCopied(false), 2000)}} 
                className="absolute top-4 right-4 p-2 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                {copied ? <Check size={20}/> : <Copy size={20}/>}
              </button>
              <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans">{cv}</div>
            </div>
          ) : (
            <div className="bg-slate-100 rounded-3xl border-4 border-dashed border-slate-200 h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <FileText size={64} className="mb-4 opacity-20" />
              <p>Özgeçmişiniz burada oluşacak.</p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="mt-12 h-32" />
    </div>
  );
};

export default AICVGenerator;
