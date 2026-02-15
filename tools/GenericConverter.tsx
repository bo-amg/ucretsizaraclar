
import React, { useState, useEffect } from 'react';
import { RefreshCw, Ruler, Scale, Thermometer, Clock, HardDrive, Wind, Maximize, Droplet, Zap, Gauge } from 'lucide-react';
import AdUnit from '../components/AdUnit';

interface Props { type: 'length' | 'weight' | 'temp' | 'data' | 'speed' | 'time' | 'area' | 'volume' | 'pressure' | 'energy' | 'power'; }

const GenericConverter: React.FC<Props> = ({ type }) => {
  const [val, setVal] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const config = {
    length: { title: 'Uzunluk Çevirici', icon: <Ruler />, units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mil: 1609.34, inch: 0.0254, fit: 0.3048, yarda: 0.9144 } },
    weight: { title: 'Ağırlık Çevirici', icon: <Scale />, units: { kg: 1, g: 0.001, mg: 0.000001, ton: 1000, lb: 0.453592, oz: 0.0283495 } },
    temp: { title: 'Sıcaklık Çevirici', icon: <Thermometer />, units: { C: 'C', F: 'F', K: 'K' } },
    data: { title: 'Veri Çevirici', icon: <HardDrive />, units: { MB: 1, B: 0.000001, KB: 0.001, GB: 1024, TB: 1048576, PB: 1073741824 } },
    speed: { title: 'Hız Çevirici', icon: <Wind />, units: { kmh: 1, mph: 1.60934, ms: 3.6, knot: 1.852 } },
    time: { title: 'Zaman Çevirici', icon: <Clock />, units: { h: 3600, m: 60, s: 1, gun: 86400, hafta: 604800, ay: 2592000, yil: 31536000 } },
    area: { title: 'Alan Çevirici', icon: <Maximize />, units: { m2: 1, km2: 1000000, cm2: 0.0001, hek: 10000, donum: 1000, akre: 4046.86 } },
    volume: { title: 'Hacim Çevirici', icon: <Droplet />, units: { litre: 1, ml: 0.001, m3: 1000, galon: 3.78541, pint: 0.473176 } },
    pressure: { title: 'Basınç Çevirici', icon: <Gauge />, units: { bar: 1, pascal: 0.00001, psi: 0.0689476, atm: 1.01325 } },
    energy: { title: 'Enerji Çevirici', icon: <Zap />, units: { joule: 1, cal: 4.184, kwh: 3600000, btu: 1055.06 } },
    power: { title: 'Güç Çevirici', icon: <Zap />, units: { watt: 1, kw: 1000, hp: 745.7 } },
  };

  const current = config[type];

  useEffect(() => {
    document.title = `${current.title} - Ücretsiz Birim Dönüştürme | ucretsizaraclar.com.tr`;
    const unitKeys = Object.keys(current.units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setResult(null);
  }, [type]);

  const convert = () => {
    const n = parseFloat(val);
    if (isNaN(n)) return;

    if (type === 'temp') {
      let c;
      if (fromUnit === 'C') c = n;
      else if (fromUnit === 'F') c = (n - 32) * 5/9;
      else c = n - 273.15;

      if (toUnit === 'C') setResult(c);
      else if (toUnit === 'F') setResult(c * 9/5 + 32);
      else setResult(c + 273.15);
    } else {
      const baseVal = n * (current.units as any)[fromUnit];
      setResult(baseVal / (current.units as any)[toUnit]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-4">{current.icon}</div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">{current.title}</h1>
        <p className="text-slate-500">Hassas ve anlık birim çevrimleri yapın.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <input 
            type="number" 
            placeholder="Değer..." 
            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-600"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <div className="flex gap-4">
            <select className="flex-grow p-4 bg-slate-50 border rounded-xl font-bold cursor-pointer" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
              {Object.keys(current.units).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <div className="flex items-center"><RefreshCw className="text-slate-300" /></div>
            <select className="flex-grow p-4 bg-slate-50 border rounded-xl font-bold cursor-pointer" value={toUnit} onChange={e => setToUnit(e.target.value)}>
              {Object.keys(current.units).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <button onClick={convert} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 transition-all">HESAPLA</button>
        </div>

        <div className="bg-slate-900 p-12 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><RefreshCw size={100}/></div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Dönüştürülen Sonuç</div>
          <div className="text-5xl font-black tabular-nums break-words">
            {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0'}
          </div>
          <div className="text-slate-500 font-bold mt-2 uppercase">{toUnit}</div>
        </div>
      </div>
      <AdUnit className="h-32 mt-12" />
    </div>
  );
};

export default GenericConverter;
