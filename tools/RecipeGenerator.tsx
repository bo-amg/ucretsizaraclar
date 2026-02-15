
import React, { useState, useEffect } from 'react';
import { Utensils, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { generateRandomRecipe } from '../services/geminiService';
import AdUnit from '../components/AdUnit';

const RecipeGenerator: React.FC = () => {
  const [recipe, setRecipe] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Rastgele Yemek Tarifi | ucretsizaraclar.com.tr";
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setRecipe('');
    try {
      const result = await generateRandomRecipe();
      setRecipe(result);
    } catch (error) {
      setRecipe("Tarif oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(recipe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-orange-50 text-orange-600 rounded-2xl mb-4">
          <Utensils size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Rastgele Yemek Tarifi</h1>
        <p className="text-slate-500">"Bugün ne pişirsem?" diyenlere özel, yapay zeka destekli tarifler.</p>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center">
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="px-12 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'Yapay Zeka Hazırlıyor...' : 'Yeni Tarif Getir'}
          </button>
        </div>

        {loading && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
               <p className="text-slate-400 italic">Şefimiz sizin için harika bir tarif düşünüyor...</p>
             </div>
          </div>
        )}

        {recipe && !loading && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Şefin Önerisi</span>
              <button onClick={handleCopy} className="text-orange-600 hover:text-orange-700 p-2 rounded-lg flex items-center gap-1 font-bold text-sm">
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <div className="p-8 md:p-12 prose prose-orange max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg font-medium">
                {recipe}
              </div>
            </div>
          </div>
        )}
        
        <AdUnit className="h-48" />
      </div>
    </div>
  );
};

export default RecipeGenerator;
