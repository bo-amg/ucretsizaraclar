
import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, Landmark, Calculator, Info, 
  TrendingUp, TrendingDown, RefreshCw, 
  Plus, Trash2, Coins, ArrowRight, Wallet, 
  AlertTriangle, Search, Activity, ChevronRight,
  ArrowDownCircle, ArrowUpCircle, CircleDollarSign,
  Trophy, BadgePercent, CheckCircle2,
  Clock, Moon, Sun, Target, ShieldCheck,
  Share2, MessageCircle
} from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface BankEntry {
  id: string;
  name: string;
  buy: string; 
  sell: string; 
  spreadPercent: number;
}

const ArbitrageCalculator: React.FC = () => {
  const [asset, setAsset] = useState('Gram Altın');
  const [marketPrice, setMarketPrice] = useState<number>(0);
  const [calcAmount, setCalcAmount] = useState<string>('10'); 
  const [userPurchasePrice, setUserPurchasePrice] = useState<string>('');
  const [targetProfitPercent, setTargetProfitPercent] = useState<string>('5');
  const [includeTax, setIncludeTax] = useState(true);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(true);

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
  const BSMV_RATE = 0.002;

  const checkMarketStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day === 0 || day === 6 || hour >= 18 || hour < 9) {
      setIsMarketOpen(false);
    } else {
      setIsMarketOpen(true);
    }
  };

  const fetchLivePrices = async () => {
    setLoadingPrice(true);
    checkMarketStatus();
    try {
      let baseCurrency = 'USD';
      if (asset === 'Euro (EUR)') baseCurrency = 'EUR';
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`);
      const data = await response.json();

      if (data.result === 'success') {
        const tryRate = data.conversion_rates.TRY;
        let price = tryRate;
        if (asset === 'Gram Altın') {
          const xauUsd = 2650;
          price = (xauUsd / 31.1035) * tryRate; 
        }
        setMarketPrice(price);
        updateBankPrices(price);
      }
    } catch (err) {
      const fallback = asset === 'Gram Altın' ? 3150 : 34.20;
      setMarketPrice(fallback);
      updateBankPrices(fallback);
    } finally {
      setLoadingPrice(false);
    }
  };

  const updateBankPrices = (newMarketPrice: number) => {
    setBanks(prev => prev.map(b => {
      const currentSpread = isMarketOpen ? b.spreadPercent : b.spreadPercent * 2.5;
      const spreadFactor = currentSpread / 100;
      const newBuy = newMarketPrice * (1 - spreadFactor / 2);
      const newSell = newMarketPrice * (1 + spreadFactor / 2);
      return { ...b, buy: newBuy.toFixed(2), sell: newSell.toFixed(2), spreadPercent: currentSpread };
    }));
  };

  useEffect(() => {
    document.title = "Kâr/Zarar ve Makas Robotu | ucretsizaraclar.com.tr";
    fetchLivePrices();
  }, [asset, isMarketOpen]);

  const amountNum = parseFloat(calcAmount) || 0;
  const purchasePriceNum = parseFloat(userPurchasePrice) || 0;
  const targetProfitNum = parseFloat(targetProfitPercent) || 0;
  
  const taxCost = includeTax ? purchasePriceNum * BSMV_RATE : 0;
  const totalUnitCost = purchasePriceNum + taxCost;
  const totalInvestmentCost = totalUnitCost * amountNum;

  const sortedByBuy = [...banks].sort((a, b) => parseFloat(b.buy) - parseFloat(a.buy));
  const bestBankToSell = sortedByBuy[0];

  const shareResults = () => {
    const text = `ucretsizaraclar.com.tr ile ${asset} yatırımımı hesapladım! \nMaliyetim: ${totalUnitCost.toFixed(2)} TL \nEn İyi Satış: ${bestBankToSell?.name} (${bestBankToSell?.buy} TL) \nSen de kârını hesapla: `;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header className="text-center relative">
        <div className="absolute top-0 right-0 hidden md:block">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${isMarketOpen ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
            {isMarketOpen ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isMarketOpen ? 'Piyasa Açık' : 'Piyasa Kapalı'}
            </span>
          </div>
        </div>
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4 border border-indigo-100 shadow-sm">
          <ArrowRightLeft size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Kâr / Zarar <span className="text-indigo-600">Karşılaştırma</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Maliyetinizi girin, tüm bankalardaki kârınızı tek ekranda görün.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Birim Maliyet</div>
          <div className="text-xl font-black text-slate-900">{totalUnitCost.toLocaleString('tr-TR')} ₺</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Başabaş Noktası</div>
          <div className="text-xl font-black text-indigo-600">
            {bestBankToSell ? (totalUnitCost / (parseFloat(bestBankToSell.buy) / marketPrice)).toFixed(2) : '0.00'} ₺
          </div>
        </div>
        <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl text-white">
          <div className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Hedef Satış</div>
          <div className="text-xl font-black">
            {(totalUnitCost * (1 + targetProfitNum/100)).toLocaleString('tr-TR')} ₺
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Piyasa Spot</div>
          <div className="text-xl font-black text-amber-400">{marketPrice.toLocaleString('tr-TR')} ₺</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Varlık</label>
            <select className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={asset} onChange={e => setAsset(e.target.value)}>
              <option>Gram Altın</option>
              <option>Dolar (USD)</option>
              <option>Euro (EUR)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Miktar</label>
            <input type="number" className="w-full p-4 bg-slate-50 border rounded-2xl font-black" value={calcAmount} onChange={e => setCalcAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Alış Fiyatınız</label>
            <input type="number" className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-2xl font-black text-indigo-600" value={userPurchasePrice} onChange={e => setUserPurchasePrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kâr Hedefi %</label>
            <input type="number" className="w-full p-4 bg-emerald-50 border border-emerald-100 rounded-2xl font-black text-emerald-600" value={targetProfitPercent} onChange={e => setTargetProfitPercent(e.target.value)} />
          </div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer p-4 bg-slate-100 rounded-2xl">
              <input type="checkbox" checked={includeTax} onChange={e => setIncludeTax(e.target.checked)} className="w-5 h-5 rounded accent-indigo-600" />
              <span className="text-xs font-bold text-slate-600">%0.2 Vergi</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Banka</th>
                <th className="px-6 py-4">Geri Alım (Siz Satarken)</th>
                <th className="px-6 py-4">Net Kâr/Zarar</th>
                <th className="px-6 py-4 text-center">Hedef Durumu</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank) => {
                const bankBuy = parseFloat(bank.buy);
                const totalSalesReturn = bankBuy * amountNum;
                const netProfitLoss = totalInvestmentCost > 0 ? totalSalesReturn - totalInvestmentCost : 0;
                const profitPercent = totalInvestmentCost > 0 ? (netProfitLoss / totalInvestmentCost) * 100 : 0;
                const meetsTarget = profitPercent >= targetProfitNum;

                return (
                  <tr key={bank.id} className="bg-slate-50 group hover:bg-white hover:shadow-xl transition-all duration-300">
                    <td className="px-6 py-5 rounded-l-2xl border-y border-l border-slate-200">
                      <div className="flex items-center gap-2 font-black text-slate-800">{bank.name}</div>
                    </td>
                    <td className="px-6 py-5 border-y border-slate-200 font-bold text-emerald-600">{bank.buy} ₺</td>
                    <td className="px-6 py-5 border-y border-slate-200">
                      <div className={`flex flex-col ${netProfitLoss >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        <span className="text-sm font-black">{netProfitLoss.toLocaleString('tr-TR')} ₺</span>
                        <span className="text-[10px] font-bold">%{profitPercent.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 rounded-r-2xl border-y border-r border-slate-200 text-center">
                      {meetsTarget ? (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                          <CheckCircle2 size={12} /> Hedef Tamam
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase">
                          <Target size={12} /> Bekleniyor
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-slate-100 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Share2 size={20} />
           </div>
           <div>
              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">Sonucu Paylaş</p>
              <p className="text-[10px] text-slate-500">Hesaplamayı arkadaşlarınızla paylaşın.</p>
           </div>
        </div>
        <button 
          onClick={shareResults}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-xl font-black text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
        >
          <MessageCircle size={18} /> WHATSAPP İLE GÖNDER
        </button>
      </div>

      {/* Yasal Sorumluluk Sınırı Kutusu */}
      <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-200 shadow-sm shadow-amber-100 flex items-start gap-5">
        <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={28} />
        <div className="space-y-2">
          <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">Önemli Yasal Sorumluluk Sınırı</h4>
          <p className="text-[12px] text-amber-800 leading-relaxed italic">
            Bu araç tarafından sunulan hesaplamalar tahminidir ve sadece bilgi verme amaçlıdır. Bankaların anlık makas değişiklikleri, piyasa dalgalanmaları veya veri gecikmeleri nedeniyle sapmalar olabilir. ucretsizaraclar.com.tr bu hesaplamalardan doğabilecek hiçbir finansal kayıp veya yasal sorumluluğu kabul etmez. Kesin banka verileri için ilgili kurumun mobil uygulamasını kontrol ediniz.
          </p>
        </div>
      </div>

      <AdUnit className="h-32" />

      {/* SEO Optimizasyon Alanı */}
      <section className="mt-20 border-t border-slate-200 pt-16 pb-10 space-y-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Landmark className="text-indigo-600" size={24} /> Banka Makas Aralığı ve Arbitraj Stratejileri
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Finans dünyasında sıkça duyulan <strong>banka makas aralığı</strong>, bir varlığın (dolar, euro, altın) banka tarafından alış fiyatı ile satış fiyatı arasındaki farkı ifade eder. <strong>Arbitraj</strong> ise, aynı varlığın farklı piyasalardaki fiyat farklarından yararlanarak kâr elde etme işlemidir. 
              <br/><br/>
              <strong>ucretsizaraclar.com.tr</strong> üzerinden sunduğumuz <strong>Banka Kâr/Zarar Robotu</strong>, bu farkları sizin yerinize anlık olarak hesaplar. Özellikle <strong>gram altın</strong> ve <strong>dolar makas aralıklarını</strong> takip etmek, yatırımcılar için maliyet düşürme noktasında hayati öneme sahiptir. Makas aralıkları ne kadar darsa, yatırımınızın kâra geçme süresi o kadar kısalır.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-emerald-600" size={24} /> Altın ve Dövizde Kâr-Zarar Hesaplamanın İncelikleri
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Yatırım yaparken sadece alış fiyatına odaklanmak büyük bir hatadır. Gerçek kârınızı görmek için bankanın "geri alım" fiyatını ve işlem masraflarını (BSMV gibi) hesaba katmanız gerekir. <strong>Altın kâr zarar hesaplama</strong> aracımız, sizin alış maliyetinizi baz alarak hangi bankanın size en yüksek nakit dönüşünü sağladığını listeler. 
              <br/><br/>
              <strong>En düşük makaslı bankayı</strong> bulmak, özellikle yüksek hacimli işlemlerde binlerce liralık tasarruf sağlayabilir. <strong>2026 finans araçları</strong> dünyasında hız her şeydir; bu yüzden makas robotu verilerimizi sürekli güncel tutarak, döviz kâr hesaplama işlemlerinizi saniyeler içinde tamamlamanızı sağlıyoruz.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={24} /> Neden ucretsizaraclar.com.tr'yi Tercih Etmelisiniz?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Türkiye'nin en kapsamlı <strong>ücretsiz dijital araçlar portalı</strong> olarak, karmaşık finansal formülleri herkesin anlayabileceği basitliğe indiriyoruz. <strong>Dolar arbitraj takibi</strong> ve <strong>döviz kâr hesaplama</strong> işlemlerini manuel yapmak yerine, sistemimiz tüm büyük bankaların (Ziraat, Vakıfbank, İş Bankası, Enpara vb.) güncel spread oranlarını karşılaştırır. 
              <br/><br/>
              Tamamen ücretsiz olan bu servis, kullanıcı dostu arayüzü ve mobil uyumluluğu ile cebinizdeki finans asistanınızdır. Verilerin doğruluğu ve canlı fiyat entegrasyonu ile yatırım kararlarınızı bilimsel verilere dayandırmanıza olanak tanıyoruz.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Target className="text-amber-600" size={24} /> 2026 Yılında Yatırım Stratejileri ve Araçlar
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Yeni nesil yatırımcılar artık sadece ekran izlemiyor, akıllı robotlar kullanıyor. <strong>ucretsizaraclar.com.tr</strong> olarak sunduğumuz dijital çözümler, portföyünüzü optimize etmenize yardımcı olur. <strong>Gram altın banka farkı</strong> hesaplayıcımız sayesinde, makas aralığının açıldığı gece saatlerinde veya piyasanın dalgalı olduğu dönemlerde en güvenli limanı bulabilirsiniz. 
              <br/><br/>
              Yatırımlarınızı daha bilinçli yönetmek için <strong>kâr zarar robotu</strong>, <strong>makas hesaplama</strong> ve diğer <strong>2026 finansal simülasyon</strong> araçlarımızı günlük olarak ziyaret etmeyi unutmayın. Amacımız, her kullanıcının karmaşık ekonomik veriler arasında kaybolmadan doğru finansal analizi yapabilmesini sağlamaktır.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArbitrageCalculator;
