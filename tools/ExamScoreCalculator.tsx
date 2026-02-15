
import React, { useState, useEffect } from 'react';
import { GraduationCap, Calculator, Info, AlertTriangle, BookOpen, Brain, Microscope, Globe, History, Languages, Check, X, ArrowRight, Star } from 'lucide-react';
import AdUnit from '../components/AdUnit';

type ExamType = 'LGS' | 'TYT' | 'AYT';

const ExamScoreCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "LGS & YKS Puan Hesaplama 2026 | Güncel Katsayılar";
  }, []);

  const [examType, setExamType] = useState<ExamType>('LGS');
  const [inputs, setInputs] = useState<any>({
    lgs: { tur: { d: 20, y: 0 }, mat: { d: 20, y: 0 }, fen: { d: 20, y: 0 }, ink: { d: 10, y: 0 }, din: { d: 10, y: 0 }, dil: { d: 10, y: 0 } },
    tyt: { tur: { d: 30, y: 5 }, mat: { d: 30, y: 5 }, sos: { d: 15, y: 2 }, fen: { d: 15, y: 2 } },
    ayt: { mat: { d: 30, y: 5 }, fiz: { d: 10, y: 2 }, kim: { d: 10, y: 2 }, bio: { d: 10, y: 2 }, edb: { d: 20, y: 2 }, tar1: { d: 8, y: 2 }, cog1: { d: 4, y: 1 }, tar2: { d: 10, y: 0 }, cog2: { d: 10, y: 0 }, fel: { d: 10, y: 0 }, din: { d: 6, y: 0 } }
  });
  const [obp, setObp] = useState<string>('85');
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (exam: string, subject: string, field: 'd' | 'y', val: string) => {
    const num = Math.max(0, parseInt(val) || 0);
    setInputs((prev: any) => ({
      ...prev,
      [exam]: {
        ...prev[exam],
        [subject]: { ...prev[exam][subject], [field]: num }
      }
    }));
  };

  const calculateScores = () => {
    if (examType === 'LGS') {
      const data = inputs.lgs;
      const net = (d: number, y: number) => Math.max(0, d - (y / 3));
      
      const nets = {
        tur: net(data.tur.d, data.tur.y),
        mat: net(data.mat.d, data.mat.y),
        fen: net(data.fen.d, data.fen.y),
        ink: net(data.ink.d, data.ink.y),
        din: net(data.din.d, data.din.y),
        dil: net(data.dil.d, data.dil.y)
      };

      // 2024 LGS Katsayıları (Tahmini)
      const score = 194.7 + (nets.tur * 4) + (nets.mat * 4) + (nets.fen * 4) + (nets.ink * 1) + (nets.din * 1) + (nets.dil * 1);
      setResults({ type: 'LGS', score: Math.min(500, score), nets });
    } else {
      // YKS Hesaplama
      const t = inputs.tyt;
      const a = inputs.ayt;
      const net = (d: number, y: number) => Math.max(0, d - (y / 4));
      const t_nets = { tur: net(t.tur.d, t.tur.y), mat: net(t.mat.d, t.mat.y), sos: net(t.sos.d, t.sos.y), fen: net(t.fen.d, t.fen.y) };
      const a_nets = { 
        mat: net(a.mat.d, a.mat.y), fiz: net(a.fiz.d, a.fiz.d), kim: net(a.kim.d, a.kim.y), bio: net(a.bio.d, a.bio.y),
        edb: net(a.edb.d, a.edb.y), tar1: net(a.tar1.d, a.tar1.y), cog1: net(a.cog1.d, a.cog1.y),
        tar2: net(a.tar2.d, a.tar2.y), cog2: net(a.cog2.d, a.cog2.y), fel: net(a.fel.d, a.fel.y), din: net(a.din.d, a.din.y)
      };

      const tyt_ham = 100 + (t_nets.tur * 3.3) + (t_nets.mat * 3.3) + (t_nets.sos * 3.4) + (t_nets.fen * 3.4);
      const obp_score = parseFloat(obp) * 0.6;

      const say_ham = (tyt_ham * 0.4) + (a_nets.mat * 3.0) + (a_nets.fiz * 2.85) + (a_nets.kim * 3.07) + (a_nets.bio * 3.07);
      const ea_ham = (tyt_ham * 0.4) + (a_nets.mat * 3.0) + (a_nets.edb * 3.0) + (a_nets.tar1 * 2.8) + (a_nets.cog1 * 3.3);
      const soz_ham = (tyt_ham * 0.4) + (a_nets.edb * 3.0) + (a_nets.tar1 * 2.8) + (a_nets.cog1 * 3.3) + (a_nets.tar2 * 2.9) + (a_nets.cog2 * 2.9) + (a_nets.fel * 3.0) + (a_nets.din * 3.0);

      setResults({
        type: 'YKS',
        tyt: tyt_ham,
        say: say_ham + obp_score,
        ea: ea_ham + obp_score,
        soz: soz_ham + obp_score,
        obp: obp_score
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <GraduationCap size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Sınav Puanı <span className="text-indigo-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          LGS ve YKS (TYT-AYT) hedeflerinize ne kadar yakınsınız? 2024-2025 verileriyle analiz edin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Seçenekler ve Giriş */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            
            <div className="flex p-1 bg-slate-100 rounded-2xl">
              <button 
                onClick={() => { setExamType('LGS'); setResults(null); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${examType === 'LGS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              >
                LGS (Lise Giriş)
              </button>
              <button 
                onClick={() => { setExamType('TYT'); setResults(null); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${examType !== 'LGS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              >
                YKS (Üniversite)
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {examType === 'LGS' ? (
                Object.keys(inputs.lgs).map((subj) => (
                  <div key={subj} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex-grow">
                      <div className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">{subj === 'tur' ? 'Türkçe' : subj === 'mat' ? 'Matematik' : subj === 'fen' ? 'Fen Bilimleri' : subj === 'ink' ? 'İnkılap' : subj === 'din' ? 'Din Kültürü' : 'Yabancı Dil'}</div>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Check size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                          <input type="number" placeholder="D" className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-100 outline-none" value={inputs.lgs[subj].d} onChange={(e) => handleInputChange('lgs', subj, 'd', e.target.value)} />
                        </div>
                        <div className="flex-1 relative">
                          <X size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" />
                          <input type="number" placeholder="Y" className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-rose-100 outline-none" value={inputs.lgs[subj].y} onChange={(e) => handleInputChange('lgs', subj, 'y', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 mb-4">
                    <label className="text-xs font-black text-indigo-900 uppercase block mb-2">Diploma Notu (OBP)</label>
                    <input type="number" step="0.01" className="w-full p-3 bg-white border border-indigo-200 rounded-xl font-black text-indigo-600 outline-none" value={obp} onChange={(e) => setObp(e.target.value)} />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">TYT Oturumu</h4>
                  {Object.keys(inputs.tyt).map((subj) => (
                    <div key={subj} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                       <div className="w-20 text-[10px] font-black text-slate-500 uppercase">{subj === 'tur' ? 'Türkçe' : subj === 'mat' ? 'Matematik' : subj === 'sos' ? 'Sosyal' : 'Fen'}</div>
                       <input type="number" placeholder="D" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold" value={inputs.tyt[subj].d} onChange={(e) => handleInputChange('tyt', subj, 'd', e.target.value)} />
                       <input type="number" placeholder="Y" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold" value={inputs.tyt[subj].y} onChange={(e) => handleInputChange('tyt', subj, 'y', e.target.value)} />
                    </div>
                  ))}
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2 mt-6">AYT Oturumu</h4>
                   {Object.keys(inputs.ayt).map((subj) => (
                    <div key={subj} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                       <div className="w-20 text-[10px] font-black text-slate-500 uppercase">{subj === 'mat' ? 'Matematik' : subj === 'edb' ? 'Edebiyat' : subj === 'fiz' ? 'Fizik' : subj === 'kim' ? 'Kimya' : subj === 'bio' ? 'Biyoloji' : subj}</div>
                       <input type="number" placeholder="D" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold" value={inputs.ayt[subj].d} onChange={(e) => handleInputChange('ayt', subj, 'd', e.target.value)} />
                       <input type="number" placeholder="Y" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold" value={inputs.ayt[subj].y} onChange={(e) => handleInputChange('ayt', subj, 'y', e.target.value)} />
                    </div>
                  ))}
                </>
              )}
            </div>

            <button 
              onClick={calculateScores}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              <Calculator size={20} /> Puanı Hesapla
            </button>
          </section>

          {/* Yasal Uyarı Kutusu */}
          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Yasal Uyarı</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                Bu sonuçlar tahmini olup katsayılar ve standart sapma her yıl değişmektedir. Gerçek sonuçlar için ÖSYM ve MEB verilerini baz alın.
              </p>
            </div>
          </div>
        </div>

        {/* Sonuç Paneli */}
        <div className="lg:col-span-7 space-y-6">
          {results ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Star size={240} /></div>
                
                <div className="relative z-10">
                  {results.type === 'LGS' ? (
                    <div className="text-center">
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] block mb-2">Tahmini LGS Puanı</span>
                       {/* Fixed: cast score to any to avoid unknown type error on toFixed */}
                       <div className="text-7xl font-black tabular-nums">{(results.score as any).toFixed(4)}</div>
                       {/* Fixed: cast nets values to any and ensure toFixed is called on a number */}
                       <p className="text-slate-400 mt-4 text-sm font-medium">Toplam {(Object.values(results.nets) as any[]).reduce((a: any, b: any) => a + b, 0).toFixed(2)} Net ile hesaplanmıştır.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
                        <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">TYT Ham Puan</div>
                        <div className="text-3xl font-black">{(results.tyt as any).toFixed(4)}</div>
                      </div>
                      <div className="bg-indigo-600 p-6 rounded-3xl text-center">
                        <div className="text-[10px] text-indigo-100 font-bold uppercase mb-1">SAY Yerleştirme</div>
                        <div className="text-3xl font-black">{(results.say as any).toFixed(4)}</div>
                      </div>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
                        <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">EA Yerleştirme</div>
                        <div className="text-3xl font-black">{(results.ea as any).toFixed(4)}</div>
                      </div>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
                        <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">SÖZ Yerleştirme</div>
                        <div className="text-3xl font-black">{(results.soz as any).toFixed(4)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                 <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                   <Info size={18} className="text-indigo-600" /> Hesaplama Detayları
                 </h4>
                 <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-500 leading-relaxed">
                   <div className="space-y-3">
                     <p><strong>Standart Sapma:</strong> ÖSYM ve MEB puanları hesaplarken derslerin Türkiye ortalamasını baz alır. Bu araç ortalama bir sapma değeri kullanır.</p>
                     <p><strong>OBP Etkisi:</strong> YKS'de okul puanı ham puanınıza eklenerek yerleştirme puanınızı oluşturur.</p>
                   </div>
                   <div className="space-y-3">
                     <p><strong>Net Hesabı:</strong> LGS'de 3 yanlış 1 doğruyu, YKS'de ise 4 yanlış 1 doğruyu götürür.</p>
                     <p><strong>Katsayılar:</strong> Derslerin önemine göre puan katkıları farklılık gösterir. Örneğin Matematik ve Türkçe katsayıları her zaman en yüksektir.</p>
                   </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <Brain size={48} className="text-indigo-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Netlerinizi Girin</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Doğru ve yanlış sayılarını girerek tahmini sınav sonucunuzu anında dökün.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default ExamScoreCalculator;
