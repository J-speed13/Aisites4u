import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = (): Chat | null => {
  const ai = getAIClient();
  if (!ai) return null;

  const systemInstruction = `
    You are the core intelligence of 'AI SITE 4U'. 
    You are a sophisticated, helpful, and highly capable AI assistant.
    
    Your Personality:
    - Professional yet accessible.
    - Concise and articulate.
    - Enthusiastic about technology and problem-solving.

    Your Capabilities:
    - You can write and debug code.
    - You can explain complex topics simply.
    - You can write creatively.
    
    Constraints:
    - If asked about your underlying model, simply state you are a custom AI model developed for AI SITE 4U. Do not mention Google or Gemini.
    - Keep responses formatted nicely (use Markdown).
  `;

  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    const initialized = initializeChat();
    if (!initialized) {
      return "Error: API Key not found. Please verify your configuration.";
    }
  }
  
  try {
    const result: GenerateContentResponse = await chatSession!.sendMessage({ message });
    return result.text || "No response received.";
  } catch (error) {
    console.error("API Error:", error);
    // Attempt to re-initialize on error if session is stale
    chatSession = null;
    return "Connection interrupted. Please try again.";
  }
};

export const generateAppCode = async (prompt: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "<!-- Error: API Key Missing -->";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `
          You are an expert Frontend AI Builder. 
          Your task is to generate a COMPLETE, SINGLE-FILE HTML application based on the user's description.
          
          Rules:
          1. Return ONLY the raw HTML string. Do NOT wrap it in markdown code blocks (no \`\`\`html).
          2. Include all CSS in <style> tags and JS in <script> tags within the HTML.
          3. Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>.
          4. Make the UI modern, clean, and responsive.
          5. Ensure the application is functional (e.g., if asked for a calculator, buttons must work).
          6. Do not include any explanation text, just the code.
        `
      }
    });
    
    let code = response.text || "";
    // Cleanup if model accidentally adds markdown
    code = code.replace(/```html/g, '').replace(/```/g, '');
    return code;
  } catch (error) {
    console.error("Builder Error:", error);
    return `<html><body><h1 style="color:red">Build Error</h1><p>The AI could not generate this app.</p></body></html>`;
  }
};