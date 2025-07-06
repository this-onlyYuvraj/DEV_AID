# ⚙️ Dev Aid

**Dev Aid** is a lightweight developer tools platform that offers essential utilities like:

- 🌐 **API Illustrator**: Visualize any public API response.
- 🧠 **AI Data Filter**: Ask questions about API data using natural language.
- 🛠 **JSON Formatter**: Format and explore raw JSON input with a collapsible viewer.

## 📸 Preview

> A developer-first productivity tool built with simplicity in mind.

## 🔧 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript
- **AI:** Google Gemini or OpenAI (configurable)
- **Deployment:** Vercel

## 🛠 How to Use Locally

```bash
# 1. Clone the repository
git clone https://github.com/this-onlyYuvraj/DEV_AID.git
cd dev-aid

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env.local

# 🔐 Environment Variables
NEXT_PUBLIC_GEMINI_API_KEY=your api key here
GOOGLE_CLIENT_ID= your client id from google 
GOOGLE_CLIENT_SECRET= your client secret from google
AUTH_SECRET= "npm exec auth secret" use this in terminal for auth secret
DATABASE_URL= your database url

NEXT_PUBLIC_GEMINI_API_KEY= your gemini api key

here i am using prisma so if you are using it to then do
npx prisma migrate dev
npx prisma generate
then change the path in prisma.ts @prisma/client to @/app/generate/prisma/client

# 4. Run the project
npm run dev

if you get some error and browser tell to change hostname to "given_hostname" then go to next.config.ts and change it to:
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname:"given_hostname"}],
  },
};

