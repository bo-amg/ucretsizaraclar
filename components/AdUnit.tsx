
import React, { useEffect } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', className = "", style }) => {
  useEffect(() => {
    // AdSense script tetikleyici
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]);

  // Eğer slot ID yoksa veya geliştirme aşamasındaysanız şık bir placeholder gösterir
  if (!slot) {
    return (
      <div 
        className={`relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/50 flex flex-col items-center justify-center group transition-all duration-500 ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        <div className="absolute top-2 right-3">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sponsored</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-60 transition-opacity">
          <div className="w-12 h-1 bg-slate-200 rounded-full animate-pulse"></div>
          <p className="text-[11px] font-medium text-slate-400">Reklam Alanı</p>
          <div className="w-8 h-1 bg-slate-200 rounded-full animate-pulse delay-75"></div>
        </div>

        {/* Arka plan dekorasyonu */}
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-500/5 rounded-full blur-xl"></div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-violet-500/5 rounded-full blur-xl"></div>
      </div>
    );
  }

  return (
    <div className={`ad-container my-6 w-full overflow-hidden flex justify-center ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-YOUR_CLIENT_ID" // Buraya kendi AdSense ID'nizi ekleyeceksiniz
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
