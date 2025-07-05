import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set.");
}
const genAI = new GoogleGenerativeAI(apiKey); 

export default async function aiDataFinder(prompt: string, data: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const sysPromt = `You are an intelligent assistant that analyzes JSON API data and responds based on the user's prompt.
    Instructions:
    - Analyze the given JSON sample.
    - Use it to answer the user's request.
    - If the user asks for code (like JavaScript filter functions), return it as a **plain string** — do NOT use markdown (no backticks).
    - Do not explain your reasoning.
    - Only return the final answer.
    - try to give short and precise code.

    Prompt: "${prompt}" JSON data:${data}`;

    const result = await model.generateContent(sysPromt);
    const response = await result.response;
    const text = response.text();

    return { text };

    } catch (error) {
    console.error("AI Error:", error);
    return { text: "AI failed to generate a response." };
  }
}
