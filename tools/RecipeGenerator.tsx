import React, { useState, useEffect } from 'react';
import { Utensils, Loader2, Sparkles, Copy, Check, ShoppingBasket, ChefHat, Trash2 } from 'lucide-react';
import { generateRecipe } from '../services/geminiService';
import AdUnit from '../components/AdUnit';

const RecipeGenerator: React.FC = () => {
  useEffect(() => {
    document.title = "AI Yemek Tarifi Oluşturucu | ucretsizaraclar.com.tr";
  }, []);

  const [ingredients, setIngredients] = useState<string>('');
  const [useIngredients, setUseIngredients] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setRecipe('');
    try {
      const result = await generateRecipe(useIngredients ? ingredients : undefined);
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
          <ChefHat size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">AI Yemek Şefi</h1>
        <p className="text-slate-500">Elinizdeki malzemeleri söyleyin, size en uygun tarifi hazırlayalım.</p>
      </div>

      <div className="space-y-8">
        {/* Ayarlar Kartı */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setUseIngredients(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${useIngredients ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <ShoppingBasket size={18} /> Malzemelerime Göre
            </button>
            <button
              onClick={() => setUseIngredients(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${!useIngredients ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Sparkles size={18} /> Şefin Sürprizi (Rastgele)
            </button>
          </div>

          {useIngredients && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Elinizdeki Malzemeler</label>
                {ingredients && (
                  <button onClick={() => setIngredients('')} className="text-[10px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-wider">
                    <Trash2 size={12} /> Temizle
                  </button>
                )}
              </div>
              <textarea
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                placeholder="Örn: Tavuk göğsü, krema, mantar, köri, soğan..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <p className="text-[11px] text-slate-400">Malzemeleri virgülle ayırarak yazabilirsiniz.</p>
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={loading || (useIngredients && !ingredients.trim())}
            className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Utensils size={20} />}
            {loading ? 'Yapay Zeka Tarifi Hazırlıyor...' : 'Tarifi Oluştur'}
          </button>
        </div>

        {/* Sonuç Alanı */}
        {loading && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
               <p className="text-slate-400 italic">Şefimiz malzemeleri değerlendiriyor...</p>
             </div>
          </div>
        )}

        {recipe && !loading && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Özel Tarifiniz</span>
              <button onClick={handleCopy} className="text-orange-600 hover:text-orange-700 p-2 rounded-lg flex items-center gap-1 font-bold text-sm">
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <div className="p-8 md:p-12 prose prose-orange max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
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