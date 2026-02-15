
import React, { useState, useRef, useEffect } from 'react';
import { Maximize, Download, Upload, Loader2, ImageIcon } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const ImageResizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = "Görsel Boyut Küçültücü | Resim Yeniden Boyutlandır - ucretsizaraclar.com.tr";
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.src = ev.target?.result as string;
        img.onload = () => {
          setImage(img.src);
          setWidth(img.width);
          setHeight(img.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!image) return;
    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      if (canvas && ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        setLoading(false);
      }
    };
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'ucretsizaraclar-resized.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-pink-50 text-pink-600 rounded-3xl mb-4">
          <Maximize size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Görsel Boyut Küçültücü</h1>
        <p className="text-slate-500">Görsellerinizi anında yeniden boyutlandırın. Hızlı ve güvenli.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        {!image ? (
          <label className="flex flex-col items-center justify-center h-80 border-4 border-dashed border-slate-100 rounded-3xl cursor-pointer hover:bg-slate-50 transition-all group">
            <Upload size={48} className="text-slate-300 group-hover:text-pink-500 transition-colors mb-4" />
            <span className="font-bold text-slate-400">Görsel Seçmek İçin Tıklayın</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Genişlik (px)</label>
                <input type="number" value={width} onChange={e => setWidth(parseInt(e.target.value))} className="w-full p-4 bg-slate-50 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Yükseklik (px)</label>
                <input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value))} className="w-full p-4 bg-slate-50 border rounded-xl" />
              </div>
            </div>
            <button onClick={handleResize} className="w-full py-5 bg-pink-600 text-white font-black rounded-2xl shadow-lg">Uygula</button>
            
            <div className="flex flex-col items-center gap-4">
              <canvas ref={canvasRef} className="max-w-full h-auto rounded-xl border border-slate-200 shadow-sm" />
              <div className="flex gap-4 w-full">
                <button onClick={() => setImage(null)} className="flex-grow py-4 bg-slate-100 text-slate-500 font-bold rounded-xl">Değiştir</button>
                <button onClick={download} className="flex-grow py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  <Download size={20}/> İndir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <AdUnit className="mt-12 h-32" />
    </div>
  );
};

export default ImageResizer;
