
import { GoogleGenAI } from "@google/genai";

export const callAI = async (prompt: string, modelName: string = 'gemini-3-flash-preview'): Promise<string> => {
  try {
    // Talimatlara göre doğrudan kullanım
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: { 
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    
    if (!response.text) {
      throw new Error("Boş yanıt");
    }
    
    return response.text;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Yapay zeka şu an yanıt veremiyor. Lütfen birkaç saniye sonra tekrar deneyin veya API anahtarının tanımlı olduğundan emin olun.";
  }
};

export const analyzeSpread = async (asset: string, marketPrice: number, banks: any[]) => {
  const bankData = banks.map(b => `${b.name}: Alış ${b.buy}, Satış ${b.sell}, Makas %${b.spreadPercent}`).join('\n');
  const prompt = `
    Sen bir finans analistisin. Kullanıcı şu anki ${asset} piyasasını takip ediyor.
    Piyasa (Ons/Spot) Fiyatı: ${marketPrice}
    Kullanıcının girdiği banka verileri:
    ${bankData}

    GÖREVİN:
    1. Hangi bankanın makas aralığı (spread) yatırımcı için en avantajlı?
    2. Mevcut makas oranları makul mü yoksa çok mu yüksek?
    3. Kullanıcıya bu bankalardan işlem yaparken neye dikkat etmesi gerektiğini 3 kısa madde ile açıkla.
    Dil: Türkçe. Yanıt profesyonel, kısa ve öz olsun. Markdown kullan.
  `;
  return callAI(prompt);
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
    ? `Sen profesyonel bir şefsin. Elimizdeki malzemeler: "${ingredients}". Bu malzemelerle yapılabilecek en lezzetli tarifi ver. Format: Markdown. Dil: Türkçe.`
    : `Bana rastgele, popüler ve herkesin evinde yapabileceği lezzetli bir yemek tarifi ver. Format: Markdown. Dil: Türkçe.`;
  
  return callAI(prompt);
};

export interface CVConfig {
  style: 'modern' | 'classic' | 'minimalist';
  tone: 'professional' | 'confident' | 'humble';
}

export const generateCV = (info: string, config: CVConfig) => {
  const prompt = `Aşağıdaki bilgilere dayanarak mükemmel bir özgeçmiş (CV) taslağı oluştur. Stil: ${config.style}, Ton: ${config.tone}. Dil: Türkçe. Format: Markdown.\n\nBilgiler:\n${info}`;
  return callAI(prompt, 'gemini-3-pro-preview');
};

export const generateExcelFormula = (desc: string) => 
  callAI(`Aşağıdaki açıklama için uygun Excel veya Google Sheets formülünü sadece formül olarak oluştur: ${desc}`);

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });
    
    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts || [];
    
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
