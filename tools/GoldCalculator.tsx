
import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, TrendingDown, RefreshCw, Calculator, DollarSign, Wallet, ArrowRight, LineChart, Info, ShieldCheck, AlertCircle, Calendar as CalendarIcon, History, ArrowRightLeft } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const GoldCalculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Input states
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
    // GoldAPI date format: YYYYMMDD
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
      
      // Tarih seçildiğinde birim fiyatı o güne göre güncelle
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
        {/* Giriş Paneli */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
            
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
              {(['TRY', 'USD'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${currency === curr ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {curr === 'TRY' ? 'Türk Lirası (₺)' : 'Amerikan Doları ($)'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calculator size={16} className="text-amber-600" /> Altın Türü
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gram', name: 'Gram' },
                  { id: 'quarter', name: 'Çeyrek' },
                  { id: 'ounce', name: 'Ons (XAU)' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setGoldType(type.id as any)}
                    className={`p-3 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${goldType === type.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-100 text-slate-400'}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Yatırım Miktarı ({goldType === 'gram' ? 'Gram' : goldType === 'quarter' ? 'Adet' : 'Ons'})</label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 outline-none transition-all text-xl font-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-3">
                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <CalendarIcon size={16} className="text-amber-600" /> Alış Tarihi
                 </label>
                 <div className="relative group">
                    <input 
                      type="date"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm font-bold cursor-pointer"
                      value={purchaseDate}
                      max={new Date().toISOString().split('T')[0]}
                      // @ts-ignore
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                 </div>
               </div>
               <div className="space-y-3">
                 <label className="text-sm font-bold text-slate-700">Birim Alış Fiyatı ({currency})</label>
                 <input 
                   type="number"
                   placeholder="Örn: 2450.00"
                   className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 outline-none transition-all text-sm font-bold ${historyLoading ? 'opacity-50 animate-pulse text-amber-600' : ''}`}
                   value={purchasePrice}
                   onChange={(e) => setPurchasePrice(e.target.value)}
                 />
               </div>
            </div>

            <button 
              onClick={fetchGoldPrice}
              disabled={loading}
              className="w-full py-5 bg-amber-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-xl shadow-amber-100 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" /> : <RefreshCw size={20} />}
              Piyasayı Güncelle
            </button>
          </section>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start gap-3 text-xs font-medium">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}
        </div>

        {/* Sonuç Paneli */}
        <div className="lg:col-span-7 space-y-6">
          {results && liveData ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><LineChart size={240} /></div>
                
                <div className="relative z-10">
                  <header className="mb-8 pb-6 border-b border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> CANLI KUR: {results.lastUpdate}
                      </span>
                      <h3 className="text-2xl font-black capitalize">Portföy Performansı</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Güncel Birim Fiyat</span>
                      <div className="text-xl font-bold text-amber-500">{(results.currentUnitPrice || 0).toLocaleString('tr-TR')} {currency === 'TRY' ? '₺' : '$'}</div>
                    </div>
                  </header>

                  <div className="text-center mb-10 bg-white/5 py-10 rounded-[2rem] border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">GÜNCEL TOPLAM DEĞER</span>
                    <div className="text-6xl font-black tabular-nums tracking-tighter">
                      {(results.totalCurrentValue || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl text-amber-500">{currency === 'TRY' ? '₺' : '$'}</span>
                    </div>
                  </div>

                  {purchasePrice && parseFloat(purchasePrice) > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-6 rounded-3xl border ${results.profitLoss >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                        <div className="text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                          {results.profitLoss >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                          {results.profitLoss >= 0 ? 'Toplam Kâr' : 'Toplam Zarar'}
                        </div>
                        <div className="text-2xl font-black">
                          {results.profitLoss >= 0 ? '+' : ''}{(results.profitLoss || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {currency === 'TRY' ? '₺' : '$'}
                        </div>
                      </div>
                      <div className={`p-6 rounded-3xl border ${results.profitLoss >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                        <div className="text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                          Yüzdesel Getiri
                        </div>
                        <div className="text-2xl font-black">
                          {results.profitLoss >= 0 ? '+' : ''}{(results.profitPercentage || 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {purchaseDate && historicalData && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between">
                        <h4 className="font-black text-slate-900 flex items-center gap-2">
                            <History size={20} className="text-amber-600" /> Tarihsel Analiz Dökümü
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(purchaseDate).toLocaleDateString('tr-TR')} Tarihli Veri</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="text-[9px] font-black text-slate-400 uppercase mb-1">O Günün Fiyatı</div>
                            <div className="text-sm font-black text-slate-800">
                                {goldType === 'gram' ? (historicalData.price_gram_24k || 0).toLocaleString() : 
                                 goldType === 'ounce' ? (historicalData.price || 0).toLocaleString() : 
                                 ((historicalData.price_gram_24k || 0) * 1.75).toLocaleString()} {currency}
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <ArrowRightLeft className="text-amber-200 hidden md:block" />
                            <TrendingUp className="text-amber-400 md:hidden" />
                        </div>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center justify-center text-center">
                            <div className="text-[9px] font-black text-amber-600 uppercase mb-1">Bugünün Fiyatı</div>
                            <div className="text-sm font-black text-amber-900">
                                {(results.currentUnitPrice || 0).toLocaleString()} {currency}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                        <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-indigo-700 leading-relaxed italic">
                            Altın aldığınız tarihi takvimden seçtiğinizde, <strong>GoldAPI</strong> o günün kapanış fiyatını otomatik olarak getirir. Bu sayede manuel fiyat girmenize gerek kalmadan net kârınızı görebilirsiniz.
                        </p>
                    </div>
                </div>
              )}

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-amber-600" /> Piyasa Genel Durumu
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LBMA Global Verileri</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Ons (XAU)', value: liveData.price, unit: currency === 'TRY' ? '₺' : '$' },
                    { label: 'Gram (24K)', value: liveData.price_gram_24k, unit: currency === 'TRY' ? '₺' : '$' },
                    { label: 'Gram (22K)', value: liveData.price_gram_22k, unit: currency === 'TRY' ? '₺' : '$' },
                    { label: 'Gümüş (XAG)', value: liveData.silver_price || 'N/A', unit: currency === 'TRY' ? '₺' : '$' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[9px] font-black text-slate-400 uppercase mb-1">{item.label}</div>
                      <div className="text-sm font-black text-slate-900">{(typeof item.value === 'number' ? item.value : 0).toLocaleString('tr-TR')} {item.unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12">
               <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                 <LineChart size={48} className="text-amber-200" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Yatırımınızı Analiz Edin</h3>
               <p className="text-slate-500 text-sm max-w-sm">
                 Altın miktarınızı girin ve takvimden alış tarihinizi seçin. Yapay zeka destekli tarihsel kur verileriyle getirinizi saniyeler içinde hesaplayalım.
               </p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <Info size={32} className="text-amber-600" /> Altın Yatırımı Bilgi Merkezi
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Neden Tarih Seçmeliyim?</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Geçmiş tarihli fiyatları hatırlamak zordur. Tarih seçtiğinizde o günün küresel ons ve gram altın kapanış değerleri GoldAPI üzerinden çekilerek size en yakın kâr/zarar sonucunu verir.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Makas Farkı Nedir?</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Spot piyasa verileri global borsa değeridir. Yerel kuyumcular ve bankalar, kendi giderlerini karşılamak için alış ve satış fiyatı arasında bir fark (makas) uygularlar.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Veri Güvenilirliği</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Hesaplamalarımızda <strong>GoldAPI</strong> altyapısı ile global emtia borsalarından (LBMA, COMEX) çekilen anlık ve tarihsel veriler kullanılır.
            </p>
          </div>
        </div>
      </section>

      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default GoldCalculator;
