// utils/Gemini.js
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-1.5-flash';

const generationConfig = {
  temperature: 0.7,
  responseMimeType: 'text/plain',
};

const safetySettings = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_LOW_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
];

export async function streamChat(userInput) {
  const result = await ai.models.generateContentStream({
    model,
    contents: [
      {
        role: 'user',
        parts: [{ text: userInput }],
      },
    ],
    generationConfig,
    safetySettings,
  });

  return result;
}
