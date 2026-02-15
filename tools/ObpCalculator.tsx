
import React, { useState, useEffect } from 'react';
import { GraduationCap, Calculator, Info, AlertTriangle, TrendingUp, Target, Sparkles, Star } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const ObpCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "OBP Hesaplama 2026 | Ortaöğretim Başarı Puanı Robotu";
  }, []);

  const [diplomaGrade, setDiplomaGrade] = useState<string>('85');
  const [previouslyPlaced, setPreviouslyPlaced] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const calculateObp = () => {
    const grade = parseFloat(diplomaGrade);
    if (isNaN(grade) || grade < 0 || grade > 100) return;

    // OBP = Diploma Notu * 5
    const obp = grade * 5;
    
    // YKS'ye eklenecek puan = OBP * 0.12 (Kırık değilse)
    let contribution = obp * 0.12;
    
    // Geçen yıl yerleştiyse katsayı yarıya düşer (Kırık OBP)
    if (previouslyPlaced) {
      contribution = contribution / 2;
    }

    setResult({
      obp,
      contribution,
      finalGrade: grade,
      isBroken: previouslyPlaced
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <Target size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          OBP <span className="text-indigo-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Diploma notunuzun <strong>YKS yerleştirme puanınıza</strong> ne kadar katkı yapacağını saniyeler içinde hesaplayın.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <GraduationCap size={16} className="text-indigo-600" /> Diploma Notu (0-100)
              </label>
              <input 
                type="number"
                step="0.01"
                placeholder="Örn: 85.50"
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-2xl font-black"
                value={diplomaGrade}
                onChange={(e) => setDiplomaGrade(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Geçen yıl bir bölüme yerleştiniz mi?</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPreviouslyPlaced(false)}
                  className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${!previouslyPlaced ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  HAYIR (Tam OBP)
                </button>
                <button 
                  onClick={() => setPreviouslyPlaced(true)}
                  className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${previouslyPlaced ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-inner' : 'border-slate-100 bg-white text-slate-400'}`}
                >
                  EVET (Kırık OBP)
                </button>
              </div>
              <p className="text-[10px] text-slate-400 italic px-1">ÖSYM kuralı gereği yerleşen adayların okul puanı bir sonraki yıl yarıya düşer.</p>
            </div>

            <button 
              onClick={calculateObp}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
            >
              <Calculator size={20} /> Hesapla
            </button>
          </section>

          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Önemli Bilgi</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                Diploma notunuz belli değilse tahmini bir not girebilirsiniz. OBP puanı 250 ile 500 arasında değişir.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Star size={240} /></div>
                
                <div className="relative z-10 text-center">
                  <header className="mb-10 pb-6 border-b border-white/10">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">YKS Puanına Eklenecek Net Puan</span>
                    <div className={`text-7xl font-black tabular-nums tracking-tighter ${result.isBroken ? 'text-rose-400' : 'text-indigo-400'}`}>
                      {result.contribution.toFixed(4)}
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">500 Üzerinden OBP</div>
                      <div className="text-3xl font-black">{result.obp.toFixed(2)}</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Diploma Notu</div>
                      <div className="text-3xl font-black">{result.finalGrade}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                 <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                   <TrendingUp size={18} className="text-indigo-600" /> OBP Nasıl Hesaplanır?
                 </h4>
                 <p className="text-sm text-slate-500 leading-relaxed">
                   Ortaöğretim Başarı Puanı (OBP), diploma notunun 5 ile çarpılmasıyla elde edilir. En düşük OBP 250, en yüksek OBP 500'dür. 
                   Bu puanın 0.12 katsayısı ile çarpımı yerleştirme puanınıza (TYT, SAY, EA, SÖZ) direkt olarak eklenir. 
                   Eğer bir önceki yıl merkezi yerleştirme ile bir bölüme girdiyseniz, bu katsayı 0.06'ya düşer.
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <Sparkles size={48} className="text-indigo-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Puanınızı Hesaplayın</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Mezuniyet notunuzu girerek YKS sınavında size gelecek olan ekstra puanı hemen analiz edin.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default ObpCalculator;
