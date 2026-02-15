
import React, { useState, useEffect } from 'react';
import { Bitcoin, Calculator, Calendar, TrendingUp, TrendingDown, RefreshCw, ArrowRightLeft, Info, AlertTriangle, Coins, Wallet, ArrowRight, Activity, Search } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const POPULAR_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
];

const CryptoCalculator: React.FC = () => {
  useEffect(() => {
    document.title = "Kripto Getiri Hesaplama | Geçmişten Bugüne ROI Analizi";
  }, []);

  const [coinId, setCoinId] = useState('bitcoin');
  const [amount, setAmount] = useState<string>('1');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [saleMode, setSaleMode] = useState<'current' | 'date'>('current');
  const [saleDate, setSaleDate] = useState<string>('');
  const [salePrice, setSalePrice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Tarihe göre fiyat getirme fonksiyonu
  const fetchPriceForDate = async (date: string, setPrice: (p: string) => void) => {
    if (!date) return;
    setLoading(true);
    try {
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${formattedDate}&localization=false`);
      const data = await response.json();
      if (data.market_data?.current_price?.usd) {
        setPrice(data.market_data.current_price.usd.toString());
      }
    } catch (err) {
      console.error("Fiyat çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  // Güncel fiyatı getirme fonksiyonu
  const fetchCurrentPrice = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
      const data = await response.json();
      if (data[coinId]?.usd) {
        setSalePrice(data[coinId].usd.toString());
      }
    } catch (err) {
      console.error("Güncel fiyat hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (purchaseDate) fetchPriceForDate(purchaseDate, setPurchasePrice);
  }, [purchaseDate, coinId]);

  useEffect(() => {
    if (saleMode === 'current') fetchCurrentPrice();
    else if (saleDate) fetchPriceForDate(saleDate, setSalePrice);
  }, [saleMode, saleDate, coinId]);

  const calculateROI = () => {
    const buy = parseFloat(purchasePrice);
    const sell = parseFloat(salePrice);
    const qty = parseFloat(amount);

    if (isNaN(buy) || isNaN(sell) || isNaN(qty)) return;

    const investment = buy * qty;
    const finalValue = sell * qty;
    const profit = finalValue - investment;
    const roi = (profit / investment) * 100;
    const multiplier = sell / buy;

    setResult({ investment, finalValue, profit, roi, multiplier });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex p-4 bg-orange-50 text-orange-600 rounded-3xl mb-4 border border-orange-100 shadow-sm">
          <Bitcoin size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Kripto Getiri <span className="text-orange-600">Hesaplama</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Geçmişte aldığınız kripto paraların <strong>bugünkü değerini</strong> veya iki tarih arasındaki performansını analiz edin.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Giriş Alanı */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Coins size={16} className="text-orange-600" /> Kripto Para Seçin
              </label>
              <div className="grid grid-cols-4 gap-2">
                {POPULAR_COINS.map(c => (
                  <button 
                    key={c.id}
                    onClick={() => { setCoinId(c.id); setResult(null); }}
                    className={`p-2 rounded-xl border-2 text-[10px] font-black transition-all ${coinId === c.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                  >
                    {c.symbol}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Miktar</label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all font-black text-xl"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alım Tarihi</label>
                <input 
                  type="date"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alım Fiyatı (USD)</label>
                <input 
                  type="number"
                  className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-orange-600"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Fiyat bekleniyor..."
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                <button 
                  onClick={() => setSaleMode('current')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${saleMode === 'current' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400'}`}
                >
                  GÜNCEL FİYATLA
                </button>
                <button 
                  onClick={() => setSaleMode('date')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${saleMode === 'date' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400'}`}
                >
                  TARİH SEÇEREK
                </button>
              </div>

              {saleMode === 'date' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satış Tarihi</label>
                    <input 
                      type="date"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      value={saleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Satış Fiyatı (USD)</label>
                    <input 
                      type="number"
                      className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {saleMode === 'current' && (
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-800">Güncel Piyasa Değeri:</span>
                  <span className="text-lg font-black text-indigo-600">{loading ? '...' : `$${parseFloat(salePrice).toLocaleString()}`}</span>
                </div>
              )}
            </div>

            <button 
              onClick={calculateROI}
              disabled={loading || !purchasePrice || !salePrice}
              className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Activity size={20} />}
              Hesaplamayı Başlat
            </button>
          </section>
        </div>

        {/* Sonuç Alanı */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Bitcoin size={240} /></div>
                
                <div className="relative z-10 text-center">
                  <header className="mb-10 pb-6 border-b border-white/10">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] block mb-2">Net Kâr / Zarar Durumu</span>
                    <div className={`text-7xl font-black tabular-nums tracking-tighter ${result.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {result.profit >= 0 ? '+' : ''}{result.profit.toLocaleString('en-US', { maximumFractionDigits: 2 })} $
                    </div>
                  </header>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">ROI (Getiri)</div>
                      <div className={`text-2xl font-black ${result.roi >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        %{result.roi.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Kat Sayısı</div>
                      <div className="text-2xl font-black text-orange-400">{result.multiplier.toFixed(2)}x</div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5 col-span-2 md:col-span-1">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Toplam Değer</div>
                      <div className="text-2xl font-black">${result.finalValue.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                 <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                   <TrendingUp size={18} className="text-orange-600" /> Yatırım Analizi
                 </h4>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm border-b pb-3">
                     <span className="text-slate-500">İlk Yatırım Tutarı:</span>
                     <span className="font-bold text-slate-900">${result.investment.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm border-b pb-3">
                     <span className="text-slate-500">Alınan Fiyat ({purchaseDate}):</span>
                     <span className="font-bold text-slate-900">${parseFloat(purchasePrice).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Satış Fiyatı:</span>
                     <span className="font-bold text-slate-900">${parseFloat(salePrice).toLocaleString()}</span>
                   </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                 <Search size={48} className="text-orange-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Verileri Girin</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Kripto paranızı ve alış tarihinizi seçin, ne kadar kazandığınızı veya kaybettiğinizi anında analiz edelim.
               </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-200 shadow-sm flex items-start gap-4 mb-16">
        <AlertTriangle className="text-amber-600 shrink-0" size={24} />
        <div>
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest mb-1">Yasal Uyarı</h4>
          <p className="text-[11px] text-amber-800 leading-relaxed italic">
            Bu araç tarafından sağlanan veriler CoinGecko API'sinden alınmaktadır. Kripto varlıkların fiyatları borsalar arası farklılık gösterebilir. Hesaplamalar tamamen tahminidir, finansal tavsiye değildir. ucretsizaraclar.com.tr oluşabilecek kayıplardan sorumlu değildir.
          </p>
        </div>
      </div>

      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default CryptoCalculator;
