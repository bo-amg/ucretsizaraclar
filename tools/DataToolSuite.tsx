
import React, { useState, useEffect } from 'react';
import { Table, Copy, Trash2, Check, FileCode, Database } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Props { type: 'csv-xml' | 'xml-json' | 'json-yaml'; }

const DataToolSuite: React.FC<Props> = ({ type }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const configs = {
    'csv-xml': { title: 'CSV to XML', icon: <Table />, color: 'text-emerald-600' },
    'xml-json': { title: 'XML to JSON', icon: <FileCode />, color: 'text-indigo-600' },
    'json-yaml': { title: 'JSON to YAML', icon: <Database />, color: 'text-orange-600' },
  };

  const current = configs[type];

  useEffect(() => {
    document.title = `${current.title} Dönüştürücü | Ücretsiz Veri Araçları - ucretsizaraclar.com.tr`;
  }, [type]);

  const process = () => {
    if (type === 'csv-xml') {
      const lines = input.split('\n');
      const headers = lines[0].split(',');
      let xml = '<root>\n';
      lines.slice(1).forEach(line => {
        const values = line.split(',');
        xml += '  <item>\n';
        headers.forEach((h, i) => {
          xml += `    <${h.trim()}>${values[i]?.trim()}</${h.trim()}>\n`;
        });
        xml += '  </item>\n';
      });
      xml += '</root>';
      setResult(xml);
    } else if (type === 'json-yaml') {
      try {
        const obj = JSON.parse(input);
        const yaml = JSON.stringify(obj, null, 2).replace(/"/g, '').replace(/{/g, '').replace(/}/g, '').replace(/,/g, '');
        setResult(yaml);
      } catch { setResult('Hata: Geçersiz JSON formatı.'); }
    } else {
      setResult('Bu dönüştürme algoritması geliştiriliyor...');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className={`inline-flex p-4 bg-slate-50 ${current.color} rounded-3xl mb-4`}>{current.icon}</div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">{current.title}</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea className="w-full h-80 p-6 bg-white border rounded-3xl font-mono text-sm outline-none" placeholder="Verinizi yapıştırın..." value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={process} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl">Dönüştür</button>
        </div>
        <div className="relative group">
          <textarea className="w-full h-80 p-6 bg-slate-100 border rounded-3xl font-mono text-sm outline-none" readOnly value={result} placeholder="Sonuç..." />
          <button onClick={() => {navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000)}} className="absolute top-4 right-4 p-2 bg-white text-indigo-600 rounded-lg shadow-sm">
            {copied ? <Check size={18}/> : <Copy size={18}/>}
          </button>
          <AdUnit className="mt-4 h-24" />
        </div>
      </div>
    </div>
  );
};

export default DataToolSuite;
