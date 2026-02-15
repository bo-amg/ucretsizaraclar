
import { GoogleGenAI } from "@google/genai";

export const callAI = async (prompt: string, modelName: string = 'gemini-3-flash-preview'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: { 
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    return response.text || "Bir yanıt oluşturulamadı.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Hizmet şu an kullanılamıyor, lütfen API anahtarınızı kontrol edin.";
  }
};

export interface SummarizeConfig {
  sentences: number;
  style: 'paragraph' | 'bullets';
  tone: 'professional' | 'simple' | 'creative' | 'academic';
}

export const summarizeText = (text: string, config: SummarizeConfig) => {
  const stylePrompt = config.style === 'bullets' ? 'maddeler halinde (bullet points)' : 'tek bir paragraf şeklinde';
  const toneMap = {
    professional: 'profesyonel ve ciddi',
    simple: 'herkesin anlayabileceği çok basit bir dille',
    creative: 'yaratıcı ve ilgi çekici',
    academic: 'akademik ve detaylı'
  };

  const prompt = `
    Aşağıdaki metni özetle:
    1. Özet tam olarak ${config.sentences} cümle uzunluğunda olsun.
    2. Özetin stili: ${stylePrompt}.
    3. Anlatım tonu: ${toneMap[config.tone]}.
    4. Dil: Türkçe.

    Metin:
    ${text}
  `;

  return callAI(prompt);
};

export const generateRecipe = (ingredients?: string) => {
  const prompt = ingredients?.trim() 
    ? `
      Sen profesyonel bir şefsin. Kullanıcının elinde şu malzemeler var: "${ingredients}". 
      GÖREVİN:
      1. Bu malzemeleri merkeze alan, israfı önleyen ve eldeki malzemelerle yapılabilecek en lezzetli "optimizasyonu" sağlayan bir tarif oluştur.
      2. Mümkünse eldeki tüm malzemeleri kullanmaya çalış ama ana malzemelere sadık kal.
      3. Tuz, su, yağ gibi her evde bulunabilecek temel malzemeleri kullanabilirsin.
      4. Tarifin bir "İsmi", "Hazırlanma Süresi", "Malzeme Listesi" ve "Adım Adım Hazırlanışı" olsun.
      5. Sonuç Markdown formatında olsun ve iştah açıcı bir dille yazılsın.
      6. Dil: Türkçe.
    `
    : `
      Bana rastgele, popüler ve herkesin evinde yapabileceği lezzetli bir yemek tarifi ver.
      Tarifin bir "İsmi", "Zorluk Derecesi", "Malzeme Listesi" ve "Hazırlanışı" olsun.
      Format: Markdown.
      Dil: Türkçe.
    `;
  
  return callAI(prompt);
};

export interface CVConfig {
  style: 'modern' | 'classic' | 'minimalist';
  tone: 'professional' | 'confident' | 'humble';
}

export const generateCV = (info: string, config: CVConfig) => {
  const stylePrompts = {
    modern: 'Modern, temiz ve çarpıcı bir düzen kullan. Bölümleri emojilerle veya belirgin başlıklarla ayır.',
    classic: 'Geleneksel, ciddi ve kurumsal bir düzen kullan. Standart CV formatına sadık kal.',
    minimalist: 'Sade, az ve öz bir tasarım kullan. Gereksiz detaylardan kaçın, profesyonelliğe odaklan.'
  };

  const tonePrompts = {
    professional: 'Resmi, profesyonel ve kurumsal bir dil kullan.',
    confident: 'Başarıları vurgulayan, iddialı ve güçlü bir liderlik dili kullan.',
    humble: 'Gelişime açık, işbirliğine yatkın ve dengeli bir dil kullan.'
  };

  const prompt = `
    Aşağıdaki bilgilere dayanarak mükemmel bir özgeçmiş (CV) taslağı oluştur:
    
    Tasarım Tarzı: ${stylePrompts[config.style]}
    Anlatım Tonu: ${tonePrompts[config.tone]}
    Dil: Türkçe
    Format: Markdown (Başlıklar, listeler ve kalın yazılarla zenginleştirilmiş)

    Kullanıcı Bilgileri:
    ${info}

    Lütfen profesyonel bir özet (summary), iş deneyimi, eğitim ve yetenekler bölümlerini mutlaka dahil et.
  `;

  return callAI(prompt, 'gemini-3-pro-preview');
};

export const generateExcelFormula = (desc: string) => 
  callAI(`Aşağıdaki açıklama için uygun Excel veya Google Sheets formülünü oluştur: ${desc}`);

export const generateImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });
    
    const candidates = response.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
