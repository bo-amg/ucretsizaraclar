
import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowRight, ShieldCheck, TrendingUp, Info, HelpCircle, HeartPulse, Target, Award, AlertTriangle } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const RetirementCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Emeklilik Zamanı Hesaplama 2026 | Ne Zaman Emekli Olurum?";
  }, []);

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [currentDays, setCurrentDays] = useState('0');
  const [result, setResult] = useState<any>(null);

  const calculateRetirement = () => {
    const birth = new Date(birthDate);
    const entry = new Date(entryDate);
    const current = parseInt(currentDays);

    if (isNaN(birth.getTime()) || isNaN(entry.getTime()) || isNaN(current)) return;

    const entryYear = entry.getFullYear();
    const entryMonth = entry.getMonth() + 1;
    
    let requiredDays = 7200;
    let requiredAge = 60;
    let retirementType = "";

    if (entryYear < 1999 || (entryYear === 1999 && entryMonth < 9)) {
      retirementType = "EYT Kapsamı / 1999 Öncesi";
      requiredDays = 5000; 
      requiredAge = 0; 
    } else if (entryYear < 2008) {
      retirementType = "1999 - 2008 Arası (Kademeli)";
      requiredDays = 7000;
      requiredAge = gender === 'male' ? 60 : 58;
    } else {
      retirementType = "2008 Sonrası (Yeni Kanun)";
      requiredDays = 7200;
      requiredAge = gender === 'male' ? 60 : 58;
    }

    const progress = Math.min((current / requiredDays) * 100, 100);
    const remainingDays = Math.max(requiredDays - current, 0);
    
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

    const remainingAge = Math.max(requiredAge - age, 0);

    setResult({
      retirementType,
      requiredDays,
      requiredAge,
      progress: progress.toFixed(1),
      remainingDays,
      remainingAge,
      currentAge: age,
      estimatedYear: today.getFullYear() + Math.max(Math.ceil(remainingDays / 360), remainingAge)
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-rose-50 text-rose-600 rounded-3xl mb-4 border border-rose-100 shadow-sm">
          <HeartPulse size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Emeklilik <span className="text-rose-600">Zamanı</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Prim gün sayınıza göre emekliliğe ne kadar yolunuz kaldığını görselleştirin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-rose-600"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Cinsiyet</label>
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                <button 
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${gender === 'male' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}
                >
                  Erkek
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${gender === 'female' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}
                >
                  Kadın
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Doğum Tarihi</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-rose-500 font-bold" 
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Sigorta Başlangıcı</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-rose-500 font-bold" 
                  value={entryDate}
                  onChange={e => setEntryDate(e.target.value)}
                />
              </div>
            </div>

            <button onClick={calculateRetirement} className="w-full py-5 bg-rose-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-700 transition-all shadow-xl shadow-rose-100">
              <TrendingUp size={20} /> Analiz Et
            </button>
          </section>

          <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200 flex items-start gap-4">
            <AlertTriangle className="text-slate-400 shrink-0" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              <strong>Yasal Uyarı:</strong> Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Mevzuat değişiklikleri, hizmet birleştirme veya veri girişleri nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10 text-center">
                  <span className="text-4xl font-black">%{result.progress} Tamamlandı</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32" />
    </div>
  );
};

export default RetirementCalculator;
