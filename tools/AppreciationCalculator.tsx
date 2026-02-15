
import React, { useState, useEffect } from 'react';
import { Award, Calculator, Info, AlertTriangle, Plus, Trash2, CheckCircle2, GraduationCap, BookOpen, Star, Sparkles } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Subject {
  id: string;
  name: string;
  grade: string;
  hours: string;
}

const AppreciationCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Takdir Teşekkür Hesaplama 2026 | Not Ortalaması Robotu";
  }, []);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Türkçe', grade: '85', hours: '6' },
    { id: '2', name: 'Matematik', grade: '80', hours: '6' },
    { id: '3', name: 'Fen Bilimleri', grade: '75', hours: '4' },
    { id: '4', name: 'Sosyal Bilgiler', grade: '90', hours: '3' },
  ]);
  const [absenteeism, setAbsenteeism] = useState<string>('0');
  const [result, setResult] = useState<any>(null);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now().toString(), name: '', grade: '', hours: '' }]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculateAverage = () => {
    let totalPoints = 0;
    let totalHours = 0;
    let hasFailingGrade = false;

    subjects.forEach(s => {
      const g = parseFloat(s.grade);
      const h = parseFloat(s.hours);
      if (!isNaN(g) && !isNaN(h)) {
        totalPoints += g * h;
        totalHours += h;
        if (g < 50) hasFailingGrade = true;
      }
    });

    const average = totalHours > 0 ? totalPoints / totalHours : 0;
    const abs = parseFloat(absenteeism) || 0;

    let certificate = "Belge Alınamadı";
    let status = "neutral";

    if (hasFailingGrade) {
      certificate = "Zayıf Ders Nedeniyle Belge Alınamaz";
      status = "error";
    } else if (abs > 5) {
      certificate = "Devamsızlık (5 gün üzeri) Nedeniyle Belge Alınamaz";
      status = "error";
    } else if (average >= 85) {
      certificate = "Takdir Belgesi";
      status = "success";
    } else if (average >= 70) {
      certificate = "Teşekkür Belgesi";
      status = "success";
    } else {
      certificate = "Ortalama Yetersiz (70 Altı)";
    }

    setResult({ average, certificate, status, hasFailingGrade });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-amber-50 text-amber-600 rounded-3xl mb-4 border border-amber-100 shadow-sm">
          <Award size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Takdir Teşekkür <span className="text-amber-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Dönem sonu notlarınızı girerek <strong>belge durumunuzu</strong> ve ağırlıklı ortalamanızı anında öğrenin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen size={20} className="text-amber-600" /> Ders Listesi
              </h2>
              <button 
                onClick={addSubject}
                className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl transition-all flex items-center gap-1"
              >
                <Plus size={14} /> Ders Ekle
              </button>
            </div>

            <div className="space-y-3 mb-8">
              {subjects.map((subject, index) => (
                <div key={subject.id} className="grid grid-cols-12 gap-2 items-center animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="col-span-6">
                    <input 
                      placeholder="Ders Adı"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-amber-100"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="number"
                      placeholder="Puan"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-center outline-none focus:ring-2 focus:ring-amber-100"
                      value={subject.grade}
                      onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number"
                      placeholder="Saat"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-center outline-none focus:ring-2 focus:ring-amber-100"
                      value={subject.hours}
                      onChange={(e) => updateSubject(subject.id, 'hours', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => removeSubject(subject.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center">
               <div className="flex-grow w-full md:w-auto">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Özürsüz Devamsızlık (Gün)</label>
                  <input 
                    type="number"
                    className="w-full md:w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                    value={absenteeism}
                    onChange={(e) => setAbsenteeism(e.target.value)}
                  />
               </div>
               <button 
                onClick={calculateAverage}
                className="w-full md:w-auto px-12 py-4 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all shadow-xl shadow-amber-100"
              >
                HESAPLA
              </button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Star size={200} /></div>
                <div className="relative z-10 text-center">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] block mb-2">Ağırlıklı Not Ortalaması</span>
                  <div className="text-6xl font-black mb-6">{(result.average || 0).toFixed(4)}</div>
                  
                  <div className={`p-4 rounded-2xl border-2 font-black uppercase text-sm ${
                    result.status === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 
                    result.status === 'error' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    {result.certificate}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info size={18} className="text-amber-600" /> Bilmeniz Gerekenler
                </h3>
                <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
                  <li className="flex gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Ortalamanız 70.00 - 84.99 arası ise <strong>Teşekkür</strong>, 85.00+ ise <strong>Takdir</strong> alırsınız.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Herhangi bir dersinizin notu <strong>50.00</strong> altındaysa ortalamanız yetse bile belge alamazsınız.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Özürsüz devamsızlığınızın <strong>5 günü</strong> geçmemesi gerekir.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                 <Sparkles size={48} className="text-amber-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Notlarınızı Girin</h3>
               <p className="text-slate-400 text-sm max-w-sm">
                 Hangi derslerden kaç puan aldığınızı ve haftalık ders saatlerini girerek simülasyonu başlatın.
               </p>
            </div>
          )}

          <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-4">
            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Yasal Sorumluluk</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed italic">
                Bu hesaplama sadece bilgilendirme amaçlıdır. MEB e-Okul sistemi ile arasında yuvarlama farkları olabilir. Resmi sonuçlar için okul idaresine veya e-Okul'a başvurun.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdUnit className="h-32" />
    </div>
  );
};

export default AppreciationCalculator;
