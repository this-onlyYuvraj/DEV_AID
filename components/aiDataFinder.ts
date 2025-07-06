import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set.");
}
const genAI = new GoogleGenerativeAI(apiKey); 

export default async function aiDataFinder(prompt: string, data: string, apiUrl:string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const sysPromt = `You are an intelligent assistant that analyzes JSON API data and responds based on the user's prompt.
    Instructions:
    - Analyze the provided JSON data thoroughly.
    - Respond concisely to the user's prompt.
    - If the user requests code (e.g., JavaScript filter functions), return only the code as a plain string — do NOT use markdown (no backticks, no code formatting).
    - If the user does NOT ask for code, respond only with the requested information.
    - Try to reference or use data relevant to the provided API URL if necessary.
    - Do not explain your reasoning.
    - Only return the final answer.

    Prompt: "${prompt}" JSON data:${data} api Url ${apiUrl}` ;

    const result = await model.generateContent(sysPromt);
    const response = await result.response;
    const text = response.text();

    return { text };

    } catch (error) {
    console.error("AI Error:", error);
    return { text: "AI failed to generate a response." };
  }
}
