
import React, { useState } from 'react';
import { Code2, Copy, Trash2, Check, FileJson } from 'lucide-react';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(`Hata: ${e.message}`);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(`Hata: ${e.message}`);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-amber-50 text-amber-600 rounded-2xl mb-4">
          <Code2 size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON Formatlayıcı</h1>
        <p className="text-slate-500">JSON verilerinizi düzenleyin, doğrulayın ve güzelleştirin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-700">Giriş (JSON)</h3>
            <button onClick={() => setInput('')} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-wider transition-colors">
              <Trash2 size={14} /> Temizle
            </button>
          </div>
          <textarea
            className="w-full h-[500px] p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none shadow-sm transition-all"
            placeholder='{"key": "value", "example": [1, 2, 3]}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              onClick={formatJSON}
              className="flex-grow py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
            >
              <FileJson size={18} /> Güzelleştir (Prettify)
            </button>
            <button
              onClick={minifyJSON}
              className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all"
            >
              Küçült (Minify)
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-700">Sonuç</h3>
            {output && (
              <button onClick={handleCopy} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider transition-colors">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Kopyalandı' : 'Kopyala'}
              </button>
            )}
          </div>
          <div className="relative group">
            <pre className={`w-full h-[500px] p-6 rounded-3xl font-mono text-sm overflow-auto border shadow-sm transition-all ${error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-900 border-slate-800 text-amber-400'}`}>
              {error ? error : (output || '// Sonuç burada görünecek...')}
            </pre>
            {output && !error && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded border border-slate-700">READONLY</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;
