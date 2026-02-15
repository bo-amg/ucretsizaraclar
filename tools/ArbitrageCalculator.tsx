
import React, { useState, useEffect } from 'react';
import { analyzeSpread } from '../services/geminiService';
import { 
  ArrowRightLeft, Landmark, Calculator, Info, 
  TrendingUp, TrendingDown, Loader2, Sparkles, 
  Plus, Trash2, Coins, ArrowRight, Wallet, 
  ShieldCheck, AlertTriangle, Search, BrainCircuit, RefreshCw,
  ArrowDownCircle, ArrowUpCircle, CircleDollarSign,
  Clock, ShieldAlert, BadgePercent, Gem, Activity
} from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface BankEntry {
  id: string;
  name: string;
  buy: string;
  sell: string;
  spreadAmount: number;
  spreadPercent: number;
}

const ArbitrageCalculator: React.FC = () => {
  const [asset, setAsset] = useState('Gram Altın');
  const [marketPrice, setMarketPrice] = useState<number>(0);
  const [calcAmount, setCalcAmount] = useState<string>('10'); 
  const [userPurchasePrice, setUserPurchasePrice] = useState<string>('');
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [banks, setBanks] = useState<BankEntry[]>([
    { id: '1', name: 'Ziraat Bankası', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 1.85 },
    { id: '2', name: 'Vakıfbank', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 1.90 },
    { id: '3', name: 'İş Bankası', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 2.10 },
    { id: '4', name: 'Garanti BBVA', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 2.90 },
    { id: '5', name: 'Yapı Kredi', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 2.80 },
    { id: '6', name: 'Akbank', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 2.75 },
    { id: '7', name: 'Kuveyt Türk', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 0.90 },
    { id: '8', name: 'Enpara', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 1.20 },
    { id: '9', name: 'QNB Finansbank', buy: '0', sell: '0', spreadAmount: 0, spreadPercent: 2.60 },
  ]);

  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);

  const API_KEY = '0c010fa4fca4920270bc4ee3';

  const fetchLivePrices = async () => {
    setLoadingPrice(true);
    setError(null);
    try {
      let baseCurrency = 'USD';
      if (asset === 'Euro (EUR)') baseCurrency = 'EUR';
      
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
      const data = await response.json();

      if (data.result === 'success') {
        const tryRate = data.conversion_rates.TRY;
        let price = tryRate;

        if (asset === 'Gram Altın') {
          const xauUsd = data.conversion_rates.XAU || 2350; 
          const usdTry = data.conversion_rates.TRY;
          price = (xauUsd / 31.1035) * usdTry; 
        }
        
        setMarketPrice(price);
        updateBankPrices(price);
      } else {
        throw new Error("Veri alınamadı");
      }
    } catch (err) {
      setError("Piyasa fiyatı şu an çekilemiyor.");
      const fallback = asset === 'Gram Altın' ? 3150 : asset === 'Dolar (USD)' ? 34.20 : 37.10;
      setMarketPrice(fallback);
      updateBankPrices(fallback);
    } finally {
      setLoadingPrice(false);
    }
  };

  const updateBankPrices = (newMarketPrice: number) => {
    setBanks(prev => prev.map(b => {
      const spreadFactor = b.spreadPercent / 100;
      const newBuy = newMarketPrice * (1 - spreadFactor/2);
      const newSell = newMarketPrice * (1 + spreadFactor/2);
      return {
        ...b,
        buy: newBuy.toFixed(2),
        sell: newSell.toFixed(2),
        spreadAmount: newSell - newBuy
      };
    }));
  };

  useEffect(() => {
    document.title = "Canlı Banka Makas Aralığı Hesaplama 2026 | ucretsizaraclar.com.tr";
    fetchLivePrices();
  }, [asset]);

  const updateBankField = (id: string, field: keyof BankEntry, value: string) => {
    setBanks(prev => prev.map(bank => {
      if (bank.id === id) {
        const updated = { ...bank, [field]: value };
        const b = parseFloat(updated.buy);
        const s = parseFloat(updated.sell);
        const amount = s - b;
        const percent = (b > 0) ? (amount / b) * 100 : 0;
        return { ...updated, spreadAmount: amount, spreadPercent: percent };
      }
      return bank;
    }));
  };

  const addBank = () => {
    setBanks([...banks, { 
      id: Date.now().toString(), 
      name: 'Yeni Banka', 
      buy: marketPrice.toFixed(2), 
      sell: (marketPrice * 1.02).toFixed(2), 
      spreadAmount: marketPrice * 0.02, 
      spreadPercent: 2.0 
    }]);
  };

  const removeBank = (id: string) => {
    setBanks(banks.filter(b => b.id !== id));
  };

  const handleAIAnalysis = async () => {
    setLoadingAI(true);
    try {
      const result = await analyzeSpread(asset, marketPrice, banks);
      setAiAnalysis(result);
    } catch (error) {
      setAiAnalysis("Analiz sırasında bir hata oluştu.");
    } finally {
      setLoadingAI(false);
    }
  };

  const sortedBySell = [...banks].sort((a, b) => parseFloat(a.sell) - parseFloat(b.sell));
  const bestBank = sortedBySell[0];
  const amountNum = parseFloat(calcAmount) || 0;
  const purchasePriceNum = parseFloat(userPurchasePrice) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-12">
      {/* Hero Header */}
      <header className="text-center">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <ArrowRightLeft size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Banka <span className="text-indigo-600">Makas Aralığı</span> Hesaplama
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Türkiye'deki tüm bankaların <strong>anlık altın ve döviz makas aralıklarını</strong> karşılaştırın. 2026 piyasa verileriyle en kârlı arbitraj fırsatlarını yakalayın.
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Yatırım Aracı</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                >
                  <option>Gram Altın</option>
                  <option>Dolar (USD)</option>
                  <option>Euro (EUR)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">İşlem Tutarı ({asset.split(' ')[0]})</label>
                <div className="relative">
                  <input 
                    type="number"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">ADET</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Sizin Alış Fiyatınız</label>
                <div className="relative">
                  <input 
                    type="number"
                    placeholder="Örn: 3100"
                    className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-2xl font-black text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-indigo-300"
                    value={userPurchasePrice}
                    onChange={(e) => setUserPurchasePrice(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-300 uppercase">₺</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Canlı Spot</label>
                   <button onClick={fetchLivePrices} className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-1">
                     {loadingPrice ? <Loader2 size={10} className="animate-spin" /> : <RefreshCw size={10} />}
                   </button>
                </div>
                <div className={`w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl font-black text-xl text-amber-400 flex items-center justify-between transition-all ${loadingPrice ? 'opacity-50' : 'opacity-100'}`}>
                  <span>{marketPrice > 0 ? marketPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '...'} ₺</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Landmark size={18} className="text-indigo-600" /> Banka Karşılaştırma Listesi
                </h3>
                <button 
                  onClick={addBank}
                  className="text-xs font-bold flex items-center gap-1 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl hover:bg-amber-100 transition-colors"
                >
                  <Plus size={14} /> Yeni Banka
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-4 pb-2">Banka Adı</th>
                      <th className="px-4 pb-2">Alış/Satış (Adet)</th>
                      <th className="px-4 pb-2">Makas Oranı</th>
                      <th className="px-4 pb-2">Toplam Maliyet ({calcAmount})</th>
                      <th className="px-4 pb-2 text-right">Durum (Kâr/Zarar)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banks.map((bank) => {
                      const totalSell = parseFloat(bank.sell) * amountNum;
                      const totalUserValue = parseFloat(bank.buy) * amountNum;
                      const userInitialCost = purchasePriceNum * amountNum;
                      const profitLoss = userInitialCost > 0 ? totalUserValue - userInitialCost : null;
                      
                      return (
                        <tr key={bank.id} className="bg-slate-50 group hover:bg-white hover:shadow-md transition-all">
                          <td className="px-4 py-4 rounded-l-2xl border-y border-l border-slate-100">
                            <input 
                              className="bg-transparent font-bold text-slate-700 w-full outline-none"
                              value={bank.name}
                              onChange={(e) => updateBankField(bank.id, 'name', e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-4 border-y border-slate-100">
                            <div className="space-y-1">
                              <input type="number" className="bg-transparent font-black text-emerald-600 text-xs w-full outline-none" value={bank.buy} onChange={(e) => updateBankField(bank.id, 'buy', e.target.value)} />
                              <input type="number" className="bg-transparent font-black text-rose-600 text-xs w-full outline-none" value={bank.sell} onChange={(e) => updateBankField(bank.id, 'sell', e.target.value)} />
                            </div>
                          </td>
                          <td className="px-4 py-4 border-y border-slate-100">
                            <div className={`inline-flex px-2 py-1 rounded-lg text-[10px] font-black ${bank.spreadPercent < 1.0 ? 'bg-emerald-100 text-emerald-700' : bank.spreadPercent < 2.0 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                               %{bank.spreadPercent.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-4 py-4 border-y border-slate-100">
                            <div className="font-black text-slate-900 text-sm">{totalSell.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Banka'dan Alış</div>
                          </td>
                          <td className="px-4 py-4 rounded-r-2xl border-y border-r border-slate-100 text-right">
                            {profitLoss !== null ? (
                              <div className={`flex flex-col items-end ${profitLoss >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                <div className="text-sm font-black flex items-center gap-1">
                                  {profitLoss >= 0 ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                                  {profitLoss.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-tighter">Satış Getirisi</div>
                              </div>
                            ) : (
                              <span className="text-[10px] font-black text-slate-300 uppercase">Fiyat Girin</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <button 
              onClick={handleAIAnalysis}
              disabled={loadingAI || banks.length === 0 || marketPrice === 0}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50"
            >
              {loadingAI ? <Loader2 className="animate-spin" /> : <Sparkles className="text-amber-400" />}
              {loadingAI ? 'AI Piyasa Verilerini Karşılaştırıyor...' : 'Yapay Zeka İle Akıllı Analiz Yap'}
            </button>
          </section>
        </div>

        {/* Right Side (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Top Choice Card */}
          <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group shrink-0">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500"><TrendingUp size={140} /></div>
            <div className="relative z-10">
              <span className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] block mb-2">Şu Anki En Avantajlı Banka</span>
              <h3 className="text-3xl font-black mb-2 truncate">{bestBank?.name || '---'}</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black">%{bestBank?.spreadPercent.toFixed(2) || '0.00'}</span>
                <span className="text-sm font-bold text-indigo-200 mb-2">Makas</span>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 text-[11px] leading-relaxed italic">
                "{calcAmount} {asset.split(' ')[0]}" alırken en düşük maliyeti bu kurum sunuyor.
              </div>
            </div>
          </div>

          {/* AI Analysis Result Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[400px]">
            <div className="p-6 bg-slate-900 text-white flex items-center gap-3">
              <BrainCircuit size={20} className="text-indigo-400" />
              <h3 className="font-black text-sm uppercase tracking-widest">Akıllı Yatırım Yorumu</h3>
            </div>
            <div className="p-8 flex-grow">
              {aiAnalysis ? (
                <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed animate-fade-in">
                  <div dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br/>') }} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 opacity-30">
                  <Sparkles size={48} className="text-amber-500 animate-pulse" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Analiz İçin Butona Basın</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Financial Information Section */}
      <section className="mt-12 space-y-16">
        {/* Knowledge Base */}
        <div className="bg-white p-10 md:p-16 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
            <Info size={36} className="text-indigo-600" /> Banka Makas Aralığı Nedir?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
            <div className="space-y-6">
              <p>
                <strong>Banka makas aralığı</strong> (spread), bir finansal enstrümanın (altın, dolar, euro vb.) banka tarafından belirlenen alım fiyatı ile satım fiyatı arasındaki farktır. Bankalar, sundukları bu hizmet karşılığında bu farktan gelir elde ederler. Yatırımcılar için <strong>en düşük makas aralığına sahip banka</strong>, kâra geçme süresini doğrudan kısaltan en önemli faktördür.
              </p>
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <h4 className="font-black text-indigo-900 mb-2 flex items-center gap-2">
                  <BadgePercent size={20} /> Ortalama Oranlar
                </h4>
                <p className="text-sm">
                  Türkiye piyasasında normal şartlarda döviz makasları %0.1 ile %0.5, altın makasları ise %0.5 ile %1.5 arasında "uygun" kabul edilir. %2 üzerindeki oranlar genellikle "geniş makas" olarak nitelendirilir.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Neden Makas Aralığı Değişir?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Clock className="text-amber-500 shrink-0" size={20} />
                  <span><strong>Mesai Saatleri:</strong> Bankalar hafta içi 09:00 - 17:00 saatleri dışında risk maliyeti nedeniyle makasları %5-%10 seviyelerine kadar açabilir.</span>
                </li>
                <li className="flex gap-3">
                  <Activity className="text-emerald-500 shrink-0" size={20} />
                  <span><strong>Piyasa Volatilitesi:</strong> Beklenmedik ekonomik gelişmelerde bankalar kendilerini korumak için alış-satış farkını artırır.</span>
                </li>
                <li className="flex gap-3">
                  <Landmark className="text-indigo-500 shrink-0" size={20} />
                  <span><strong>Banka Politikası:</strong> Katılım bankaları genellikle daha dar altın makasları sunarken, özel bankalar kampanyalı dönemlerde dövizde rekabetçi olabilir.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Arbitrage & 2026 Strategy */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12"><BrainCircuit size={300} /></div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Sparkles className="text-amber-400" /> 2026 Arbitraj Stratejileri
            </h2>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-4">
              <p>
                Arbitraj, aynı varlığın farklı piyasalardaki fiyat farkından yararlanarak risksiz kâr elde etme işlemidir. 2026 yılında dijital bankacılığın gelişmesiyle birlikte bankalar arası fiyat farkları saniyeler içinde değişmektedir. 
              </p>
              <h4 className="text-white font-bold">Kârınızı Artırmak İçin İpuçları:</h4>
              <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                <li className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="block text-amber-400 font-black mb-1">Düşük Spread Takibi</span>
                  Hangi bankanın gram altın makas aralığı bugün en düşükse o bankaya odaklanın.
                </li>
                <li className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="block text-indigo-400 font-black mb-1">Makas Robotu Kullanımı</span>
                  Yapay zeka destekli analiz aracımızla bankaların sunduğu fiyatların spot piyasaya olan uzaklığını ölçün.
                </li>
                <li className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="block text-emerald-400 font-black mb-1">Kademeli Alım Satım</span>
                  Tek seferde yüksek makasla işlem yapmak yerine, piyasanın sakin olduğu saatlerde parçalı işlemler yapın.
                </li>
                <li className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="block text-rose-400 font-black mb-1">Gece İşlemlerinden Kaçının</span>
                  Bankaların gece kuru (makas açma) politikasından korunmak için 17:30 sonrası işlem yapmamaya özen gösterin.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-xl">
              <Gem size={24} className="text-indigo-600" /> Sıkça Sorulan Sorular
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-800">En az makas aralığı hangi bankada?</h4>
                <p className="text-xs text-slate-500 italic">Genellikle Kuveyt Türk, Enpara ve Vakıfbank altın işlemlerinde; İş Bankası ve Ziraat Bankası döviz işlemlerinde rekabetçidir.</p>
              </div>
              <div className="space-y-2 border-t pt-4">
                <h4 className="text-sm font-bold text-slate-800">Hafta sonu altın makas aralığı neden açılır?</h4>
                <p className="text-xs text-slate-500 italic">Küresel piyasalar kapalıyken bankalar oluşabilecek ani kur ataklarına karşı kendilerini emniyete almak için makas farkını artırırlar.</p>
              </div>
              <div className="space-y-2 border-t pt-4">
                <h4 className="text-sm font-bold text-slate-800">Altın makas hesaplama nasıl yapılır?</h4>
                <p className="text-xs text-slate-500 italic">(Satış Fiyatı - Alış Fiyatı) / Alış Fiyatı * 100 formülü ile yüzde bazında makas oranını bulabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Content Cloud */}
        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
           <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Finansal Terimler Sözlüğü</h4>
           <div className="flex flex-wrap gap-x-12 gap-y-6 text-[11px] font-bold text-slate-500 uppercase">
             <span>Altın Arbitraj</span>
             <span>Dolar Alım Satım Farkı</span>
             <span>Euro Makas Aralığı</span>
             <span>Mesai Dışı Kur</span>
             <span>Spot Piyasa Fiyatı</span>
             <span>Valörlü İşlem</span>
             <span>Parite Karşılaştırma</span>
             <span>2026 Döviz Tahminleri</span>
             <span>Dijital Bankacılık Kurları</span>
             <span>Banka Komisyon Oranları</span>
           </div>
        </div>
      </section>

      <AdUnit className="h-32" />
    </div>
  );
};

export default ArbitrageCalculator;
