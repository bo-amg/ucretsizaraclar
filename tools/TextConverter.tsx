
import React, { useState, useEffect } from 'react';
import { Type as TypeIcon, Copy, Trash2, Hash, FileText, Check, Repeat, Eraser, AlignLeft } from 'lucide-react';

const TextConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Metin Araçları & Dönüştürücü | Harf Değiştirici - ucretsizaraclar.com.tr";
  }, []);

  const stats = {
    chars: text.length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    lines: text.trim() === '' ? 0 : text.split('\n').length
  };

  const actions = [
    { name: 'BÜYÜK HARF', fn: () => setText(text.toUpperCase()) },
    { name: 'küçük harf', fn: () => setText(text.toLowerCase()) },
    { name: 'Yazım Düzeni', fn: () => setText(text.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase())) },
    { name: 'Ters Çevir', fn: () => setText(text.split('').reverse().join('')) },
    { name: 'Boşlukları Temizle', fn: () => setText(text.replace(/\s+/g, ' ').trim()) },
    { name: 'Satırları Birleştir', fn: () => setText(text.replace(/\n/g, ' ')) },
    { name: 'Noktalamaları Kaldır', fn: () => setText(text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")) },
    { name: 'Sayıları Kaldır', fn: () => setText(text.replace(/[0-9]/g, "")) },
    { name: 'Z - A Sırala', fn: () => setText(text.split('\n').sort().reverse().join('\n')) },
    { name: 'Emoji Temizle', fn: () => setText(text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF])/g, '')) },
    { name: 'Sıfır Boşluk Yap', fn: () => setText(text.replace(/\s/g, '')) },
    { name: 'Binary Dönüştür', fn: () => setText(text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ')) },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-blue-50 text-blue-600 rounded-3xl mb-4">
          <TypeIcon size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Metin Dönüştürücü</h1>
        <p className="text-slate-500">Metinlerinizi düzenleyin, temizleyin ve profesyonel hale getirin.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { l: 'Karakter', v: stats.chars, i: <FileText size={16}/> },
          { l: 'Kelime', v: stats.words, i: <Hash size={16}/> },
          { l: 'Satır', v: stats.lines, i: <AlignLeft size={16}/> },
          { l: 'Boşluksuz', v: text.replace(/\s/g, '').length, i: <Eraser size={16}/> }
        ].map(s => (
          <div key={s.l} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="text-slate-400 mb-1 flex justify-center">{s.i}</div>
            <div className="text-2xl font-black text-slate-900">{s.v}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-8">
        <textarea
          className="w-full h-80 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-mono text-sm mb-6"
          placeholder="Metninizi buraya yazın..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={action.fn}
              className="px-3 py-3 bg-slate-100 text-slate-700 font-bold text-[11px] uppercase rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-200"
            >
              {action.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button onClick={() => setText('')} className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-sm">
            <Trash2 size={18} /> Temizle
          </button>
          <button onClick={handleCopy} className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Kopyalandı' : 'Sonucu Kopyala'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextConverter;
