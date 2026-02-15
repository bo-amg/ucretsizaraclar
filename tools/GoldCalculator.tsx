
import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, TrendingDown, RefreshCw, Calculator, DollarSign, Wallet, ArrowRight, LineChart, Info, ShieldCheck, AlertCircle, Calendar as CalendarIcon, History, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const GoldCalculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [amount, setAmount] = useState<string>('10');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [goldType, setGoldType] = useState<'gram' | 'ounce' | 'quarter'>('gram');
  const [currency, setCurrency] = useState<'TRY' | 'USD'>('TRY');

  const API_KEY = 'goldapi-wy0xcsmlo56an4-io';

  const fetchGoldPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.goldapi.io/api/XAU/${currency}`, {
        headers: {
          'x-access-token': API_KEY,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Güncel fiyat verisi alınamadı.');
      const data = await response.json();
      setLiveData(data);
    } catch (err) {
      setError('Canlı altın fiyatları şu an yüklenemiyor.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalPrice = async (date: string) => {
    if (!date) return;
    setHistoryLoading(true);
    const formattedDate = date.replace(/-/g, '');
    try {
      const response = await fetch(`https://www.goldapi.io/api/XAU/${currency}/${formattedDate}`, {
        headers: {
          'x-access-token': API_KEY,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Geçmiş tarihli veri bulunamadı.');
      const data = await response.json();
      setHistoricalData(data);
      
      if (data && (data.price_gram_24k || data.price)) {
        let price = data.price_gram_24k || 0;
        if (goldType === 'ounce') price = data.price || 0;
        if (goldType === 'quarter') price = (data.price_gram_24k || 0) * 1.75;
        setPurchasePrice(price.toFixed(2));
      }
    } catch (err) {
      console.error('History fetch error:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Altın Getirisi Hesaplama (Canlı) | ucretsizaraclar.com.tr";
    fetchGoldPrice();
  }, [currency]);

  useEffect(() => {
    if (purchaseDate) {
        fetchHistoricalPrice(purchaseDate);
    }
  }, [purchaseDate, goldType]);

  const calculateResults = () => {
    if (!liveData) return null;

    const currentPricePerGram = liveData.price_gram_24k || 0;
    const currentPricePerOunce = liveData.price || 0;
    const currentPricePerQuarter = currentPricePerGram * 1.75;

    let currentUnitPrice = currentPricePerGram;
    if (goldType === 'ounce') currentUnitPrice = currentPricePerOunce;
    else if (goldType === 'quarter') currentUnitPrice = currentPricePerQuarter;

    const totalCurrentValue = (parseFloat(amount) || 0) * currentUnitPrice;
    
    let profitLoss = 0;
    let profitPercentage = 0;
    if (purchasePrice && parseFloat(purchasePrice) > 0) {
      const totalInvestment = (parseFloat(amount) || 0) * (parseFloat(purchasePrice) || 0);
      profitLoss = totalCurrentValue - totalInvestment;
      profitPercentage = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
    }

    return {
      currentUnitPrice,
      totalCurrentValue,
      profitLoss,
      profitPercentage,
      lastUpdate: liveData.timestamp ? new Date(liveData.timestamp * 1000).toLocaleTimeString('tr-TR') : '--:--'
    };
  };

  const results = calculateResults();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-amber-50 text-amber-600 rounded-3xl mb-4 border border-amber-100 shadow-sm animate-pulse">
          <Coins size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Altın Yatırım <span className="text-amber-600">Robotu</span>
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Aldığınız tarihten bugüne altın kazancınızı <strong>Canlı GoldAPI</strong> verileriyle analiz edin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Miktar</label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 outline-none transition-all text-xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button 
              onClick={fetchGoldPrice}
              className="w-full py-5 bg-amber-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-xl shadow-amber-100"
            >
              <RefreshCw size={20} /> Piyasa Güncelle
            </button>
          </section>

          <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200 flex items-start gap-4">
            <AlertTriangle className="text-slate-400 shrink-0" size={24} />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              <strong>Yasal Uyarı:</strong> Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. API veri gecikmeleri, banka makas farkları veya piyasa oynaklığı nedeniyle sapmalar ve yanlışlıklar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir yasal sorumluluğu kabul etmez.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {results && (
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="text-center mb-10">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">GÜNCEL TOPLAM DEĞER</span>
                    <div className="text-6xl font-black tabular-nums tracking-tighter">
                      {(results.totalCurrentValue || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {currency}
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default GoldCalculator;
