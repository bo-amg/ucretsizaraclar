
import React, { useState, useEffect } from 'react';
import { Table, Copy, Trash2, Check, Download, FileCode } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const CSVConverter: React.FC = () => {
  useEffect(() => {
    document.title = "CSV Dönüştürücü | Verileri Hızlıca Formatlayın";
  }, []);

  const [csv, setCsv] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToJSON = () => {
    if (!csv.trim()) return;
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((header, i) => {
        obj[header] = values[i]?.trim();
      });
      return obj;
    });
    setResult(JSON.stringify(data, null, 2));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-amber-50 text-amber-600 rounded-2xl mb-4">
          <Table size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">CSV Dönüştürücü</h1>
        <p className="text-slate-500">Excel'den kopyaladığınız CSV verilerini JSON'a çevirin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-700">Giriş (CSV)</h3>
            <button onClick={() => setCsv('')} className="text-xs font-bold text-red-500 uppercase flex items-center gap-1">
              <Trash2 size={14} /> Temizle
            </button>
          </div>
          <textarea
            className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            placeholder="isim,soyisim,yas&#10;Ahmet,Yilmaz,25&#10;Ayse,Demir,30"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />
          <button
            onClick={convertToJSON}
            className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
          >
            <FileCode size={18} /> JSON formatına Çevir
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-700">Sonuç (JSON)</h3>
            {result && (
              <button onClick={handleCopy} className="text-xs font-bold text-indigo-600 uppercase flex items-center gap-1">
                {copied ? <Check size={14} /> : <Copy size={14} />} Kopyala
              </button>
            )}
          </div>
          <pre className="w-full h-80 p-6 bg-slate-900 text-amber-400 border border-slate-800 rounded-3xl font-mono text-sm overflow-auto">
            {result || "// Sonuç burada görünecek..."}
          </pre>
          <AdUnit className="h-24" />
        </div>
      </div>
    </div>
  );
};

export default CSVConverter;
