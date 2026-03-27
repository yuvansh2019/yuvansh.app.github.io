
import { GoogleGenAI } from "@google/genai";
import { YUVANSH_INFO, PRICING_DATA } from "../constants";

export const getGeminiResponse = async (userMessage: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = "gemini-3-flash-preview";
  
  const pricingContext = PRICING_DATA.map(p => `${p.name}: ${p.price}`).join(', ');
  
  const systemInstruction = `
    You are the AI Assistant for Yuvansh, a world-class developer.
    Your tone should be professional, slightly eccentric (reflecting Yuvansh's bold pricing), and extremely helpful.
    
    Yuvansh's details:
    - Email: ${YUVANSH_INFO.email}
    - Phone: ${YUVANSH_INFO.phone}
    - Website: ${YUVANSH_INFO.website}
    
    Yuvansh's Pricing Guide:
    ${pricingContext}
    
    Key points about the pricing:
    - A "Pricing Page" service is worth $70 million.
    - An "Untaken Domain" service is $29,999 per year.
    - He builds Apps ($50), Browsers ($100), Super Apps ($150), and Super Browsers ($200).
    - Web Extensions are only $5.
    
    If the user asks "to make anything", talk about how Yuvansh can build it and relate it to the most relevant pricing tier.
    Be creative and enthusiastic about their ideas. Tell them what Yuvansh can make if they seem unsure.
  `;

  try {
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
      history: history.slice(0, -1).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      }))
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "I'm sorry, I couldn't process that. Yuvansh is likely busy building something worth 70 million dollars.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to Yuvansh's brain. Please try again later. (Error: " + (error instanceof Error ? error.message : 'Unknown') + ")";
  }
};
