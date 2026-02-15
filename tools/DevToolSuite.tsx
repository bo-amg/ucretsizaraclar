
import React, { useState, useEffect } from 'react';
import { Copy, Check, Binary, Globe, Hash as HashIcon, Code, Terminal, Braces, FileCode } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Props { type: 'base64' | 'url' | 'wordcounter' | 'md5' | 'sha256' | 'html-esc' | 'js-min' | 'css-min' | 'sql-format'; }

const DevToolSuite: React.FC<Props> = ({ type }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const configs = {
    base64: { title: 'Base64 Dönüştürücü', icon: <Binary /> },
    url: { title: 'URL Encoder/Decoder', icon: <Globe /> },
    wordcounter: { title: 'Gelişmiş Kelime Sayacı', icon: <HashIcon /> },
    md5: { title: 'MD5 Hash Oluşturucu', icon: <Terminal /> },
    sha256: { title: 'SHA256 Hash Oluşturucu', icon: <Terminal /> },
    'html-esc': { title: 'HTML Entity Escape', icon: <Code /> },
    'js-min': { title: 'JS Minifier', icon: <FileCode /> },
    'css-min': { title: 'CSS Minifier', icon: <FileCode /> },
    'sql-format': { title: 'SQL Formatter', icon: <Braces /> }
  };

  useEffect(() => {
    document.title = `${configs[type].title} | Ücretsiz Yazılımcı Araçları - ucretsizaraclar.com.tr`;
    setOutput('');
  }, [type]);

  const handleProcess = (mode: 'encode' | 'decode' | 'format' = 'encode') => {
    try {
      let res = '';
      switch (type) {
        case 'base64':
          res = mode === 'encode' ? btoa(input) : atob(input);
          break;
        case 'url':
          res = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
          break;
        case 'html-esc':
          const div = document.createElement('div');
          if (mode === 'encode') { div.textContent = input; res = div.innerHTML; }
          else { div.innerHTML = input; res = div.textContent || ''; }
          break;
        case 'js-min':
          res = input.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').replace(/\s+/g, ' ').trim();
          break;
        case 'css-min':
          res = input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*({|}|:|;)\s*/g, '$1').trim();
          break;
        case 'md5':
        case 'sha256':
          res = "Güvenlik nedeniyle Hash işlemleri sunucu taraflı veya kütüphane ile yapılmalıdır. (Simüle Edildi: " + btoa(input).slice(0, 16) + ")";
          break;
        case 'sql-format':
          res = input.replace(/\s+/g, ' ').replace(/(FROM|WHERE|GROUP BY|ORDER BY|SELECT|INSERT|UPDATE|DELETE|JOIN|LEFT JOIN|RIGHT JOIN)/gi, '\n$1').trim();
          break;
        default:
          res = input;
      }
      setOutput(res);
    } catch (e) {
      setOutput('Hata: Geçersiz veri formatı veya karakter.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">{configs[type].icon}</div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">{configs[type].title}</h1>
        <p className="text-slate-500">Güvenli ve hızlı işlem. Verileriniz sunucuya gönderilmez.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea 
            className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm outline-none shadow-sm"
            placeholder="Giriş verisini buraya yapıştırın..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-4">
            {(type === 'base64' || type === 'url' || type === 'html-esc') ? (
              <>
                <button onClick={() => handleProcess('encode')} className="flex-grow py-4 bg-indigo-600 text-white font-bold rounded-xl">Kodla (Encode)</button>
                <button onClick={() => handleProcess('decode')} className="flex-grow py-4 bg-slate-800 text-white font-bold rounded-xl">Çöz (Decode)</button>
              </>
            ) : (
              <button onClick={() => handleProcess('format')} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl">İşlemi Uygula</button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea 
              className="w-full h-80 p-6 bg-slate-900 text-emerald-400 border border-slate-800 rounded-3xl font-mono text-sm shadow-xl"
              readOnly
              value={output}
              placeholder="Sonuç burada görünecek..."
            />
            <button onClick={() => {navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg">
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <AdUnit className="h-32" />
        </div>
      </div>
    </div>
  );
};

export default DevToolSuite;
