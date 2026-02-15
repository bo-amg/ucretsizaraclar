
import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, TrendingDown, RefreshCw, Calculator, DollarSign, Wallet, ArrowRight, LineChart, Info, ShieldCheck, AlertCircle, Calendar as CalendarIcon, History, ArrowRightLeft, AlertTriangle, Loader2 } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const GoldCalculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [amount, setAmount] = useState<string>('10');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [currency, setCurrency] = useState<'TRY' | 'USD'>('TRY');

  // Sağladığınız API Key: 0c010fa4fca4920270bc4ee3
  // CollectAPI için auth formatı
  const API_KEY = 'apikey 0c010fa4fca4920270bc4ee3';

  const fetchGoldPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      // CollectAPI Altın Verileri
      const response = await fetch(`https://api.collectapi.com/economy/goldPrice`, {
        headers: {
          'content-type': 'application/json',
          'authorization': API_KEY
        }
      });
      
      if (!response.ok) throw new Error('Güncel fiyat verisi alınamadı.');
      const data = await response.json();
      
      if (data.success) {
        const gramGold = data.result.find((r: any) => r.name === "Gram Altın");
        setLiveData({
          price: parseFloat(gramGold.buying.replace(',', '.')),
          sellPrice: parseFloat(gramGold.selling.replace(',', '.')),
          timestamp: new Date().getTime() / 1000
        });
      } else {
        throw new Error('API Hatası');
      }
    } catch (err) {
      setError('Anlık altın fiyatları şu an yüklenemiyor. Lütfen daha sonra tekrar deneyin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Canlı Altın Getirisi Hesaplama | ucretsizaraclar.com.tr";
    fetchGoldPrice();
  }, [currency]);

  const calculateResults = () => {
    if (!liveData) return null;

    const currentPricePerGram = liveData.price || 0;
    const totalCurrentValue = (parseFloat(amount) || 0) * currentPricePerGram;
    
    let profitLoss = 0;
    let profitPercentage = 0;
    if (purchasePrice && parseFloat(purchasePrice) > 0) {
      const totalInvestment = (parseFloat(amount) || 0) * (parseFloat(purchasePrice) || 0);
      profitLoss = totalCurrentValue - totalInvestment;
      profitPercentage = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
    }

    return {
      currentUnitPrice: currentPricePerGram,
      totalCurrentValue,
      profitLoss,
      profitPercentage,
      lastUpdate: new Date(liveData.timestamp * 1000).toLocaleTimeString('tr-TR')
    };
  };

  const results = calculateResults();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-amber-50 text-amber-600 rounded-3xl mb-4 border border-amber-100 shadow-sm">
          <Coins size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Anlık Altın <span className="text-amber-600">Yatırım Takibi</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          CollectAPI altyapısı ile <strong>canlı altın fiyatlarını</strong> takip edin ve kâr/zarar analizinizi saniyeler içinde yapın.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Toplam Gram Miktarı</label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 outline-none transition-all text-2xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Alış Fiyatınız (1 Gram İçin)</label>
              <input 
                type="number"
                placeholder="Örn: 2450.50"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 outline-none transition-all font-bold"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>

            <button 
              onClick={fetchGoldPrice}
              className="w-full py-5 bg-amber-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-xl shadow-amber-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <RefreshCw size={20} />}
              Canlı Fiyatları Güncelle
            </button>
          </section>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 text-sm font-bold animate-in fade-in zoom-in">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200 flex items-start gap-4">
            <AlertTriangle className="text-slate-400 shrink-0" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              Hesaplamalar piyasa alış-satış farklarını içermez. ucretsizaraclar.com.tr finansal tavsiye vermez. Veriler güvenilir kaynaklardan alınsa da yatırım kararlarınızı doğrulamalısınız.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {results ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Coins size={240} /></div>
                <div className="relative z-10 text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">PORTFÖYÜNÜZÜN GÜNCEL DEĞERİ</span>
                  <div className="text-7xl font-black tabular-nums tracking-tighter mb-4">
                    {(results.totalCurrentValue || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                  </div>
                  <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-black text-sm ${results.profitLoss >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                    {results.profitLoss >= 0 ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                    {results.profitLoss >= 0 ? '+' : ''}{results.profitLoss.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺ (%{results.profitPercentage.toFixed(2)})
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Anlık Gram Fiyatı</span>
                  <div className="text-2xl font-black text-slate-900">{results.currentUnitPrice.toLocaleString('tr-TR')} ₺</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Son Güncelleme</span>
                  <div className="text-2xl font-black text-indigo-600">{results.lastUpdate}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <Calculator size={64} className="text-slate-100 mb-6" />
               <h3 className="text-2xl font-black text-slate-900 mb-2">Altın Portföyünüzü İzleyin</h3>
               <p className="text-slate-400 text-sm max-w-sm">
                 Elinizdeki gram altın miktarını ve alış fiyatınızı girerek bugünkü kârınızı saniyeler içinde hesaplayın.
               </p>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default GoldCalculator;
