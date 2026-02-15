import { GoogleGenAI } from "@google/genai";

export const callAI = async (prompt: string, modelName: string = 'gemini-3-flash-preview'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
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
    return "Hizmet şu an kullanılamıyor, lütfen API anahtarınızı Vercel Environment Variables kısmına eklediğinizden emin olun.";
  }
};

export const summarizeText = (text: string) => 
  callAI(`Lütfen aşağıdaki metni Türkçe olarak profesyonelce özetle:\n\n${text}`);

export const generateRandomRecipe = () => 
  callAI("Bana rastgele lezzetli bir yemek tarifi ver. Başlık, malzemeler ve yapılış olsun. Format Markdown olsun.");

export const generateExcelFormula = (desc: string) => 
  callAI(`Aşağıdaki açıklama için uygun Excel veya Google Sheets formülünü oluştur: ${desc}`);

export const generateCV = (info: string) => 
  callAI(`Şu bilgilere sahip bir kişi için profesyonel, modern ve etkileyici bir CV taslağı hazırla (Markdown formatında): \n\n${info}`);

export const generateImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });
    
    // Güvenli kontrol: candidates, content ve parts alanlarının varlığı doğrulanıyor
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