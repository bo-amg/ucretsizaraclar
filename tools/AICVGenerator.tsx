import React, { useState, useEffect } from 'react';
import { generateCV, CVConfig } from '../services/geminiService';
import { 
  UserCircle, Sparkles, Loader2, Copy, Check, FileText, 
  Printer, Briefcase, GraduationCap, Award, Settings2, Layout, Type
} from 'lucide-react';
import AdUnit from '../components/AdUnit';

const AICVGenerator: React.FC = () => {
  useEffect(() => {
    document.title = "Profesyonel AI CV Oluşturucu | ucretsizaraclar.com.tr";
  }, []);

  const [info, setInfo] = useState('');
  const [cv, setCv] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ayar State'leri
  const [style, setStyle] = useState<CVConfig['style']>('modern');
  const [tone, setTone] = useState<CVConfig['tone']>('professional');

  const handleGenerate = async () => {
    if (!info.trim()) return;
    setLoading(true);
    try {
      const res = await generateCV(info, { style, tone });
      setCv(res);
    } catch (error) {
      console.error(error);
      setCv("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-cv');
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = 'Print' + uniqueName;
    const printWindow = window.open(windowUrl, windowName, 'left=50,top=50,width=800,height=900');

    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>CV Çıktısı</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Inter', sans-serif; padding: 40px; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div class="prose prose-slate max-w-none">
              ${printContent.innerHTML.replace(/\n/g, '<br/>')}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">
          <UserCircle size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Profesyonel AI CV Oluşturucu</h1>
        <p className="text-slate-500">Bilgilerinizi girin, gerisini yapay zekaya bırakın.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sol Panel: Giriş ve Ayarlar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-600" /> Bilgileriniz
              </label>
              <textarea 
                className="w-full h-64 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm leading-relaxed"
                placeholder="Örn: Ahmet Yılmaz, İTÜ mezunu, 5 yıl frontend deneyimi, React ve Tailwind uzmanı. Kariyer hedefim..."
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
              <div className="flex gap-2 text-[10px] text-slate-400 font-medium bg-slate-50 p-3 rounded-xl">
                <Sparkles size={12} />
                İpucu: Eğitim, iş tecrübesi ve yeteneklerinizi alt alta yazın.
              </div>
            </div>

            {/* Ayarlar Bölümü */}
            <div className="grid grid-cols-1 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Layout size={14} /> Şablon Stili
                </label>
                <div className="flex gap-2">
                  {(['modern', 'classic', 'minimalist'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg border-2 capitalize transition-all ${style === s ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
                    >
                      {s === 'modern' ? 'Modern' : s === 'classic' ? 'Klasik' : 'Minimalist'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} /> Anlatım Tonu
                </label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="professional">Profesyonel & Kurumsal</option>
                  <option value="confident">İddialı & Özgüvenli</option>
                  <option value="humble">Dengeli & Gelişime Açık</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || !info.trim()}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? 'AI Taslağı Hazırlıyor...' : 'Özgeçmişi Oluştur'}
            </button>
          </div>
          
          <AdUnit className="h-32" />
        </div>

        {/* Sağ Panel: Önizleme */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl h-full flex flex-col min-h-[800px]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Önizleme Ekranı</span>
              <div className="flex gap-2">
                {cv && (
                  <>
                    <button onClick={handlePrint} className="p-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-bold">
                      <Printer size={16} /> PDF / Yazdır
                    </button>
                    <button onClick={copyToClipboard} className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 text-xs font-bold">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Kopyalandı' : 'Kopyala'}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-grow p-4 md:p-8 overflow-auto custom-scrollbar">
              {cv ? (
                <div 
                  id="printable-cv"
                  className="bg-white rounded-2xl p-8 md:p-12 shadow-inner min-h-full animate-in fade-in zoom-in duration-500"
                >
                  <div className="prose prose-slate max-w-none prose-sm md:prose-base">
                    <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-sans">
                      {cv}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <FileText size={48} className="text-slate-600 opacity-50" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Henüz Taslak Oluşturulmadı</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      Bilgilerinizi girip oluştur butonuna bastığınızda profesyonel özgeçmişiniz burada görünecek.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {loading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center z-10">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-indigo-400" size={48} />
                  <p className="text-indigo-100 font-bold animate-pulse uppercase tracking-widest text-xs">Yapay Zeka Kariyerini İnşa Ediyor...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICVGenerator;