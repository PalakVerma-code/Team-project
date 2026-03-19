// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

// const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// if (!geminiApiKey) {
//   throw new Error("GEMINI_API_KEY is not set.");
// }

// const genAI = new GoogleGenerativeAI(geminiApiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function generateLegalResponse(message: string): Promise<string> {
  //   const result = await model.generateContent(message);
  //   const response = await result.response;
  //   const text = response.text();

  //   if (!text) {
  //     throw new Error("Gemini returned an empty response.");
  //   }

  //   return text;

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {},
    },
  ];
  const config = {
    tools,
  };
  const model = "gemini-2.5-flash-lite";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let text = "";
  for await (const chunk of response) {
    console.log(chunk.text);
    text += chunk.text || "";
  }

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}
