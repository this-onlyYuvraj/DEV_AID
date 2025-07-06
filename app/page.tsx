

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-4">
        Welcome to <span className="text-blue-500" style={{fontFamily:"vamos"}}>DEVAID</span>
      </h1>
      <p className="text-lg text-center max-w-xl mb-8 text-gray-300">
        A collection of powerful, developer-friendly tools starting with:
      </p>

      <ul className="space-y-4 text-center text-gray-200">
        <li>
          🚀 <span className="font-semibold">API Illustrator</span> — Instantly visualize and explore any public API URL with a beautiful UI.
        </li>
        <li>
          🧩 <span className="font-semibold">JSON Formatter</span> — Format and beautify your JSON in seconds.
        </li>
        <li>
          🛠️ <span className="italic text-gray-400">More tools coming soon...</span>
        </li>
      </ul>

      <div
        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition duration-300"
      >
        Explore Tools
      </div>
    </main>
  );
}
