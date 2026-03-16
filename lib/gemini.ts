import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
	throw new Error("GEMINI_API_KEY is not set.");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateLegalResponse(message: string): Promise<string> {
	const result = await model.generateContent(message);
	const response = await result.response;
	const text = response.text();

	if (!text) {
		throw new Error("Gemini returned an empty response.");
	}

	return text;
}
