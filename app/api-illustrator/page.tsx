'use client';

import { useState } from 'react';
import aiDataFinder from '@/components/aiDataFinder';
import apifinder from '@/components/apiFinder';
import DynamicRender from '@/components/DynamicRender';

export default function GetApi() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');


  const handleApiSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const apiUrl = (form.elements.namedItem('apiUrl') as HTMLInputElement)?.value;
    setApiUrl(apiUrl)
    const apiKey = (form.elements.namedItem('apiKey') as HTMLInputElement)?.value;

    try {
      const result = await apifinder(apiUrl, apiKey);
      setApiUrl(apiUrl)
      setApiResponse(result);
      setError(null);
      setAiAnswer(''); // Clear previous AI result
    } catch (err: any) {
      setError(err.message);
      setApiResponse(null);
      setAiAnswer('');
    }
  };

  const handleAiQuery = async () => {
    if (!prompt || !apiResponse ) return;

    const stringifiedData = JSON.stringify(Array.isArray(apiResponse) ? apiResponse.slice(0, 10) : apiResponse);
    const result = await aiDataFinder(prompt, stringifiedData, apiUrl);
    setAiAnswer(result?.text ?? 'No answer generated.');
  };

  return (
    <div className="flex justify-center bg-gray-950 ">
      <div className="flex flex-col justify-center border-none border-2 bg-gray-950 rounded-2xl p-4 lg:w-1/2 md:w-[80%] sm:w-[90%]">
        

        {/* Input Section */}
        <form onSubmit={handleApiSubmit} className="border rounded-xl p-5 flex flex-col bg-gray-900 mb-4">
          <h1 className="text-2xl font-extrabold mb-5 text-white">🌐 API ILLUSTRATOR</h1>
          <h2 className="text-lg text-white font-bold mb-2">Enter API Details</h2>
          <div className="flex mb-3">
            <input
              className="border font-bold bg-gray-900 text-white rounded-sm p-2 w-full"
              name="apiUrl"
              type="text"
              placeholder="API URL"
              required
            />
          </div>
          <input
            className="border bg-gray-900 font-bold text-white p-2 rounded-sm mb-3"
            type="text"
            name="apiKey"
            placeholder="API Key (if required)"
          />
          <button
            className="bg-blue-600 font-bold text-white p-2 rounded-sm hover:bg-blue-700 cursor-pointer"
            type="submit"
          >
            Fetch API Response
          </button>
        </form>

        {/* API Response Section */}
        <div className="bg-gray-900 text-white p-5 rounded-xl mb-4">
          <h2 className="font-bold text-lg mb-2">API Response</h2>
          {error && <p className="text-red-400">{error}</p>}
          {apiResponse ? (
            <div className="bg-gray-900 text-black p-3 rounded overflow-x-auto max-h-[400px]">
              <DynamicRender data={apiResponse} />
            </div>
          ) : (
            <p className="bg-gray-900 font-bold rounded-sm h-8 flex px-3 items-center text-gray-500">No response yet.</p>
          )}
        </div>

        {/* AI Prompt Section */}
        <div className="bg-gray-900  text-white p-5 rounded-xl">
          <h2 className="font-bold text-lg mb-2">Ask AI to Filter the Data</h2>
          <div className="flex mb-3">
            <input
              type="text"
              placeholder="e.g., Show only items with status false"
              className="p-2 font-bold rounded-sm bg-gray-900 w-full text-white"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white mx-2 p-2 rounded-md hover:bg-blue-700 cursor-pointer"
              type="button"
              onClick={handleAiQuery}
            >
              Ask AI
            </button>
          </div>
          <textarea
            className="p-3 bg-gray-900 font-bold text-[17px] text-white rounded-sm w-full h-40 "
            placeholder="AI answer will appear here..."
            value={aiAnswer}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
