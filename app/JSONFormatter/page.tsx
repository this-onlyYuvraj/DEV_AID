'use client';
import React, { useState } from 'react';
import DynamicRender from '@/components/DynamicRender';

export default function JSONFormatter() {
  const [rawJson, setRawJson] = useState<string>('');
  const [formattedJson, setFormattedJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setFormattedJson(parsed);
      setError(null);
    } catch (err) {
      setError('❌ Invalid JSON format');
      setFormattedJson(null);
    }
  };

  return (
    <div className=' bg-gray-950 h-screen '>
        <div className='flex justify-center'>
      <div className='flex flex-col justify-center bg-gray-950 rounded-2xl p-4 lg:w-1/2 md:w-[80%] sm:w-[90%]'>
        <h1 className='text-4xl font-extrabold mb-5 text-white'>JSON Formatter</h1>

        <div className='border-1 rounded-2xl p-5 flex flex-col bg-gray-900'>
          <textarea
            className='border-1 text-white rounded p-2 w-full min-h-[150px]'
            name='rawJson'
            placeholder='Enter Your Raw JSON Data'
            value={rawJson}
            onChange={e => setRawJson(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              onClick={handleFormat}
              className='border mt-4 w-1/3 p-2 rounded hover:bg-gray-950 cursor-pointer text-white'
            >
              Format JSON
            </button>
          </div>

          <div className="bg-gray-900 text-white p-5 rounded-xl mt-4">
            <h2 className="font-bold text-lg mb-2">Formatted JSON</h2>
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : formattedJson ? (
              <div className="bg-white text-black p-3 rounded overflow-x-auto max-h-[400px]">
                <DynamicRender data={formattedJson} />
              </div>
            ) : (
              <p className="bg-white font-bold rounded-sm h-8 flex px-3 items-center text-gray-500">
                No response yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}
