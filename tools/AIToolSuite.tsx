
import React, { useState, useEffect } from 'react';
import { callAI } from '../services/geminiService';
import { Sparkles, Loader2, Copy, Check, RotateCcw } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Props { type: 'poem' | 'linkedin' | 'code' | 'email' | 'story'; }

const AIToolSuite: React.FC<Props> = ({ type }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const configs = {
    poem: { title: 'AI Şiir Yazıcı', prompt: 'Şu konuda duygusal bir Türkçe şiir yaz: ', icon: '🌹' },
    linkedin: { title: 'AI LinkedIn Post', prompt: 'LinkedIn için profesyonel bir içerik oluştur: ', icon: '💼' },
    code: { title: 'AI Kod Açıklayıcı', prompt: 'Aşağıdaki kodu satır satır açıkla: ', icon: '💻' },
    email: { title: 'AI E-Posta Yazıcı', prompt: 'Şu amaçla profesyonel bir e-posta taslağı yaz: ', icon: '📧' },
    story: { title: 'AI Hikaye Yazıcı', prompt: 'İçinde şunların geçtiği yaratıcı bir hikaye yaz: ', icon: '✍️' },
  };

  const config = configs[type];

  useEffect(() => {
    document.title = `${config.title} | ucretsizaraclar.com.tr`;
    setResult('');
    setInput('');
  }, [type]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await callAI(config.prompt + input);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{config.icon}</div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">{config.title}</h1>
        <p className="text-slate-500">Yapay zeka gücüyle saniyeler içinde içerik üretin.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <textarea 
          className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none"
          placeholder="İsteğinizi buraya yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {loading ? 'Yapay Zeka Hazırlıyor...' : 'İçeriği Oluştur'}
        </button>

        {result && (
          <div className="mt-8 p-8 bg-slate-50 border border-slate-200 rounded-2xl relative animate-fade-in">
             <button onClick={() => {navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000)}} className="absolute top-4 right-4 text-indigo-600">
               {copied ? <Check /> : <Copy />}
             </button>
             <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default AIToolSuite;
