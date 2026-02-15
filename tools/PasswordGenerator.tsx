
import React, { useState, useEffect } from 'react';
import { Lock, RefreshCw, Copy, Check, ShieldCheck, ShieldAlert } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) {
      setPassword('Lütfen en az bir seçenek seçin');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(result);
  };

  useEffect(() => {
    generate();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: 'Zayıf', color: 'bg-red-500', icon: <ShieldAlert className="text-red-500" /> };
    if (length < 12) return { label: 'Orta', color: 'bg-yellow-500', icon: <ShieldCheck className="text-yellow-500" /> };
    return { label: 'Güçlü', color: 'bg-emerald-500', icon: <ShieldCheck className="text-emerald-500" /> };
  };

  const strength = getStrength();

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-2xl mb-4">
          <Lock size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Güvenli Şifre Oluşturucu</h1>
        <p className="text-slate-500">Hesaplarınız için kırılamaz ve güvenli şifreler üretin.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8">
        <div className="relative mb-8">
          <div className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-2xl text-center break-all text-slate-900">
            {password}
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <button onClick={generate} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><RefreshCw size={20} /></button>
            <button onClick={handleCopy} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 p-3 bg-slate-50 rounded-xl">
          {strength.icon}
          <div className="flex-grow">
            <div className="text-xs font-bold text-slate-400 uppercase">Güvenlik Seviyesi: {strength.label}</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1">
              <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: `${(length / 32) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Şifre Uzunluğu</label>
              <span className="text-sm font-bold text-indigo-600">{length} Karakter</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setOptions({ ...options, [key as keyof typeof options]: !value })}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-slate-700 capitalize">
                  {key === 'uppercase' ? 'Büyük Harf' : key === 'lowercase' ? 'Küçük Harf' : key === 'numbers' ? 'Sayılar' : 'Semboller'}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={generate}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            Yeni Şifre Oluştur <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
