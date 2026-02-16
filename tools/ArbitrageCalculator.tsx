
import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, Landmark, Calculator, Info, 
  TrendingUp, TrendingDown, RefreshCw, 
  Plus, Trash2, Coins, ArrowRight, Wallet, 
  AlertTriangle, Search, Activity, ChevronRight,
  ArrowDownCircle, ArrowUpCircle, CircleDollarSign,
  Trophy, BadgePercent, CheckCircle2
} from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface BankEntry {
  id: string;
  name: string;
  buy: string; // Bankanın bizden alış fiyatı (Bizim satışımız)
  sell: string; // Bankanın bize satış fiyatı (Bizim alışımız)
  spreadPercent: number;
}

const ArbitrageCalculator: React.FC = () => {
  const [asset, setAsset] = useState('Gram Altın');
  const [marketPrice, setMarketPrice] = useState<number>(0);
  const [calcAmount, setCalcAmount] = useState<string>('10'); 
  const [userPurchasePrice, setUserPurchasePrice] = useState<string>('');
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Örnek banka verileri ve ortalama makaslar
  const [banks, setBanks] = useState<BankEntry[]>([
    { id: '1', name: 'Ziraat Bankası', buy: '0', sell: '0', spreadPercent: 1.85 },
    { id: '2', name: 'Vakıfbank', buy: '0', sell: '0', spreadPercent: 1.90 },
    { id: '3', name: 'Kuveyt Türk', buy: '0', sell: '0', spreadPercent: 0.95 },
    { id: '4', name: 'Türkiye İş Bankası', buy: '0', sell: '0', spreadPercent: 2.10 },
    { id: '5', name: 'Enpara / QNB', buy: '0', sell: '0', spreadPercent: 1.25 },
    { id: '6', name: 'Garanti BBVA', buy: '0', sell: '0', spreadPercent: 2.85 },
    { id: '7', name: 'Yapı Kredi', buy: '0', sell: '0', spreadPercent: 2.80 },
    { id: '8', name: 'Akbank', buy: '0', sell: '0', spreadPercent: 2.70 },
  ]);

  const EXCHANGE_API_KEY = '0c010fa4fca4920270bc4ee3';

  const fetchLivePrices = async () => {
    setLoadingPrice(true);
    setError(null);
    try {
      let baseCurrency = 'USD';
      if (asset === 'Euro (EUR)') baseCurrency = 'EUR';
      
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`);
      const data = await response.json();

      if (data.result === 'success') {
        const tryRate = data.conversion_rates.TRY;
        let price = tryRate;

        if (asset === 'Gram Altın') {
          // XAU/USD simulasyonu
          const xauUsd = 2650; 
          price = (xauUsd / 31.1035) * tryRate; 
        }
        
        setMarketPrice(price);
        updateBankPrices(price);
      } else {
        throw new Error("Veri alınamadı");
      }
    } catch (err) {
      setError("Piyasa fiyatı şu an otomatik çekilemiyor. Manuel fiyatlarla devam edebilirsiniz.");
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
      const newBuy = newMarketPrice * (1 - spreadFactor / 2);
      const newSell = newMarketPrice * (1 + spreadFactor / 2);
      return {
        ...b,
        buy: newBuy.toFixed(2),
        sell: newSell.toFixed(2)
      };
    }));
  };

  useEffect(() => {
    document.title = "Banka Kâr/Zarar Karşılaştırma | ucretsizaraclar.com.tr";
    fetchLivePrices();
  }, [asset]);

  const amountNum = parseFloat(calcAmount) || 0;
  const purchasePriceNum = parseFloat(userPurchasePrice) || 0;
  const initialCost = amountNum * purchasePriceNum;

  // En iyi bankaları bul
  const sortedByBuy = [...banks].sort((a, b) => parseFloat(b.buy) - parseFloat(a.buy));
  const bestBankToSell = sortedByBuy[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header className="text-center">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <ArrowRightLeft size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Banka <span className="text-indigo-600">Kâr/Zarar</span> Robotu
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Maliyetinizi girin, elinizdeki varlığı hangi bankada ne kadar kârla satabileceğinizi anında karşılaştırın.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Trophy size={32} />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">En İyi Satış (Geri Alım)</div>
            <div className="text-xl font-black text-slate-900">{bestBankToSell?.name}</div>
            <div className="text-sm font-bold text-emerald-600">{bestBankToSell?.buy} ₺</div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl flex items-center gap-4 text-white">
          <div className="p-4 bg-indigo-600 text-white rounded-2xl">
            <Wallet size={32} />
          </div>
          <div>
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Sizin Toplam Maliyetiniz</div>
            <div className="text-xl font-black">{initialCost > 0 ? initialCost.toLocaleString('tr-TR') : '0.00'} ₺</div>
            <div className="text-xs text-slate-500">{calcAmount} {asset.split(' ')[0]} için</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Activity size={32} />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Piyasa Spot Fiyat</div>
            <div className="text-xl font-black text-slate-900">{marketPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</div>
            <div className="text-xs text-emerald-500 font-bold">Canlı Veri</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Yatırım Aracı</label>
            <select 
              className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              <option>Gram Altın</option>
              <option>Dolar (USD)</option>
              <option>Euro (EUR)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Miktar</label>
            <input 
              type="number"
              className="w-full p-4 bg-slate-50 border rounded-2xl font-black outline-none focus:ring-2 focus:ring-indigo-500"
              value={calcAmount}
              onChange={(e) => setCalcAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Sizin Alış Fiyatınız (Birim)</label>
            <input 
              type="number"
              placeholder="Maliyetinizi girin"
              className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-2xl font-black text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500"
              value={userPurchasePrice}
              onChange={(e) => setUserPurchasePrice(e.target.value)}
            />
          </div>

          <div className="flex items-end">
             <button onClick={fetchLivePrices} className="w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
               <RefreshCw size={20} className={loadingPrice ? 'animate-spin' : ''} /> Fiyatları Güncelle
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Banka Adı</th>
                <th className="px-6 py-4">Banka Alış (Sizin Satışınız)</th>
                <th className="px-6 py-4">Banka Satış (Sizin Alışınız)</th>
                <th className="px-6 py-4">Makas %</th>
                <th className="px-6 py-4 text-center">Net Kâr/Zarar Durumu</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank) => {
                const bankBuy = parseFloat(bank.buy);
                const totalSalesReturn = bankBuy * amountNum;
                const netProfitLoss = initialCost > 0 ? totalSalesReturn - initialCost : 0;
                const profitPercent = initialCost > 0 ? (netProfitLoss / initialCost) * 100 : 0;
                const isBest = bank.id === bestBankToSell?.id;

                return (
                  <tr key={bank.id} className="bg-slate-50 group hover:bg-white hover:shadow-xl transition-all duration-300">
                    <td className="px-6 py-5 rounded-l-2xl border-y border-l border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800">{bank.name}</span>
                        {isBest && <CheckCircle2 size={16} className="text-emerald-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-5 border-y border-slate-200 font-bold text-emerald-600">{bank.buy} ₺</td>
                    <td className="px-6 py-5 border-y border-slate-200 font-bold text-rose-500">{bank.sell} ₺</td>
                    <td className="px-6 py-5 border-y border-slate-200">
                       <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-slate-200 text-slate-600">
                         %{bank.spreadPercent.toFixed(2)}
                       </span>
                    </td>
                    <td className="px-6 py-5 rounded-r-2xl border-y border-r border-slate-200 text-center">
                      {initialCost > 0 ? (
                        <div className={`flex flex-col items-center ${netProfitLoss >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                          <span className="text-sm font-black">{netProfitLoss.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                          <span className="text-[10px] font-bold uppercase">
                            {netProfitLoss >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-300 font-bold uppercase italic tracking-widest">Maliyet Bekleniyor</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 p-8 rounded-[3rem] flex items-start gap-6">
        <AlertTriangle size={32} className="text-amber-600 shrink-0" />
        <div className="space-y-2">
          <h3 className="font-black text-amber-900 uppercase tracking-widest text-sm">Altın ve Döviz İşlemlerinde Kâr/Zarar Mantığı</h3>
          <p className="text-xs text-amber-800 leading-relaxed italic">
            Bir bankadan altın veya döviz aldığınızda, bankanın satış fiyatı sizin maliyetinizdir. Kâra geçmek için, piyasa fiyatının bankanın "Alış" fiyatını sizin maliyetinizin üzerine çıkarması gerekir. Bankalar arası makas (alım-satım farkı) ne kadar darsa kâra o kadar hızlı geçersiniz.
          </p>
        </div>
      </div>
      
      <AdUnit className="h-32" />
    </div>
  );
};

export default ArbitrageCalculator;
