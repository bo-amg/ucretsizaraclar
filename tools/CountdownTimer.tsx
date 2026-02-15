
import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const CountdownTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Geri Sayaç | ucretsizaraclar.com.tr";
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(minutes * 60 + seconds);
    }
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-rose-50 text-rose-600 rounded-2xl mb-4">
          <Clock size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Geri Sayaç</h1>
        <p className="text-slate-500">Zamanınızı verimli kullanmak için geri sayım başlatın.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-grow">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Dakika</label>
                <input 
                  type="number" 
                  min="0"
                  max="59"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none text-2xl font-bold"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
              <div className="flex-grow">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Saniye</label>
                <input 
                  type="number" 
                  min="0"
                  max="59"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none text-2xl font-bold"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              {!isActive ? (
                <button 
                  onClick={startTimer}
                  className="flex-grow py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all flex items-center justify-center gap-2"
                >
                  <Play size={20} fill="currentColor" /> Başlat
                </button>
              ) : (
                <button 
                  onClick={() => setIsActive(false)}
                  className="flex-grow py-4 bg-slate-800 text-white font-black rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                >
                  <Pause size={20} fill="currentColor" /> Durdur
                </button>
              )}
              <button 
                onClick={resetTimer}
                className="px-6 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-12 rounded-3xl text-white shadow-xl flex flex-col items-center justify-center relative overflow-hidden h-[300px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-rose-600 transition-all duration-1000" style={{ width: timeLeft > 0 ? `${(timeLeft / (minutes * 60 + seconds)) * 100}%` : '0%' }}></div>
          <div className="text-8xl font-black tabular-nums tracking-tighter mb-4 animate-fade-in">
            {formatTime(timeLeft)}
          </div>
          {timeLeft === 0 && (minutes > 0 || seconds > 0) && (
            <div className="text-rose-400 font-bold uppercase tracking-widest animate-pulse">Süre Doldu!</div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <AdUnit className="h-32" />
      </div>
    </div>
  );
};

export default CountdownTimer;
