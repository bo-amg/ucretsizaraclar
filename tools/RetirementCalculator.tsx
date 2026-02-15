
import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowRight, ShieldCheck, TrendingUp, Info, HelpCircle, HeartPulse, Target, Award } from 'lucide-react';
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

    // Basitleştirilmiş SGK Emeklilik Algoritması (EYT ve Yeni Kanunlar)
    if (entryYear < 1999 || (entryYear === 1999 && entryMonth < 9)) {
      retirementType = "EYT Kapsamı / 1999 Öncesi";
      requiredDays = gender === 'male' ? 5000 : 5000; // Standart EYT min gün
      requiredAge = 0; // EYT yaş sınırı yok
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
    
    // Yaş hesaplama
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
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-rose-500 font-bold cursor-pointer" 
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Sigorta Başlangıcı</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-rose-500 font-bold cursor-pointer" 
                  value={entryDate}
                  onChange={e => setEntryDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                <span>Mevcut Toplam Prim Gün</span>
                <span className="text-[10px] text-slate-400 font-normal italic">E-Devlet'ten bakabilirsiniz</span>
              </label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border rounded-2xl outline-none text-xl font-black" 
                placeholder="Örn: 4200"
                value={currentDays}
                onChange={e => setCurrentDays(e.target.value)}
              />
            </div>

            <button onClick={calculateRetirement} className="w-full py-5 bg-rose-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-700 transition-all shadow-xl shadow-rose-100">
              <TrendingUp size={20} /> Emeklilik Yolculuğunu Gör
            </button>
          </section>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Progress Card */}
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Award size={200} /></div>
                
                <div className="relative z-10 text-center mb-10">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] block mb-2">{result.retirementType}</span>
                  <h3 className="text-2xl font-black mb-10">Emeklilik İlerleme Durumu</h3>
                  
                  <div className="relative h-6 bg-white/10 rounded-full mb-4 overflow-hidden border border-white/5">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-1000 ease-out" 
                      style={{ width: `${result.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-4xl font-black">%{result.progress}</span>
                    <span className="text-xs font-bold text-slate-500">HEDEF: {result.requiredDays} GÜN</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Kalan Prim Günü</div>
                    <div className="text-3xl font-black text-rose-400">{result.remainingDays.toLocaleString()} GÜN</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Tahmini Emeklilik Yılı</div>
                    <div className="text-3xl font-black text-emerald-400">{result.estimatedYear}</div>
                  </div>
                </div>
              </div>

              {/* Info Table */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200 font-black text-slate-800 flex items-center gap-2">
                  <Target size={18} className="text-rose-600" /> Detaylı Gereksinimler
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-black uppercase">Gereken Yaş</div>
                    <div className="text-lg font-bold text-slate-900">{result.requiredAge === 0 ? 'Yaş Sınırı Yok (EYT)' : result.requiredAge}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-black uppercase">Mevcut Yaşınız</div>
                    <div className="text-lg font-bold text-slate-900">{result.currentAge}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-black uppercase">Kalan Yaş</div>
                    <div className="text-lg font-bold text-rose-600">{result.remainingAge > 0 ? `${result.remainingAge} Yıl` : 'Yaş Şartı Tamam'}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-start gap-4">
                 <Info className="text-rose-600 shrink-0" size={24} />
                 <p className="text-xs text-rose-800 leading-relaxed">
                   <strong>Önemli Not:</strong> Bu hesaplama mevcut yasalara göre (EYT ve 5510 sayılı kanun) tahmini bir projeksiyondur. Kesin emeklilik bilgileri için E-Devlet "Emeklilik Şartları" ekranını kontrol etmenizi öneririz.
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <Clock size={64} className="text-slate-100 mb-6" />
               <h3 className="text-2xl font-black text-slate-900 mb-2">Bilgilerinizi Girin</h3>
               <p className="text-slate-400 text-sm max-w-sm">
                 Sigorta giriş tarihinizi ve güncel prim sayınızı girerek emekliliğe giden yoldaki konumunuzu görün.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32" />
    </div>
  );
};

export default RetirementCalculator;
