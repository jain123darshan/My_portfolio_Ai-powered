# My Portfolio

Welcome to the source code for my personal portfolio. This project is a modern, responsive web application built with **Next.js 14** and **TypeScript**, designed to showcase my work as a Software Engineer specializing in **Java Backend** and **Artificial Intelligence**.

 ✨ Key Features

- **AI Chat Widget:** A custom assistant powered by Google Gemini (free) or OpenAI that answers questions about my background.
- **Modern UI:** Styled with Tailwind CSS and Framer Motion for smooth interactions.
- **Project Showcase:** A dynamic display of my work in Microservices, Distributed Systems, and Computer Vision using Python and OpenCV.
- **Core Sections:** About, Projects, Resume, and Contact Form.
- **Project Q&A Bot:** Context-aware answers for specific projects.
- **Free AI Support:** Works without API keys using keyword-based responses!

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Google Gemini API / OpenAI API
- **Deployment**: Vercel

## 🌐 Live Deployment

The portfolio is live and deployed on Vercel:

- **Production URL:** [https://my-portfolio-ai-powered.vercel.app](https://my-portfolio-ai-powered.vercel.app)
- **Direct URL:** [https://my-portfolio-ai-powered-hbaa53jda-jain123darshans-projects.vercel.app](https://my-portfolio-ai-powered-hbaa53jda-jain123darshans-projects.vercel.app)

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jain123darshan/My_portfolio_Ai-powered.git
   cd My_portfolio_Ai-powered
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables (Optional):**
   
   Create a `.env.local` file in the root directory. The chatbot works **FREE without any API keys** using keyword-based responses!
   
   ```bash
   # Option 1: Google Gemini API (FREE tier available)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Option 2: OpenAI API (optional)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   **Get Free Gemini API Key:**
   - Visit: [Google AI Studio](https://aistudio.google.com/)
   - Sign in and create an API key
   - 15 requests/minute free, 1M tokens/month

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 🤖 AI Support

The portfolio supports multiple AI backends:

| AI Provider | Cost | Setup Required | Features |
|-------------|------|----------------|----------|
| **Keyword Fallback** | Free | None | Basic Q&A from portfolio data |
| **Google Gemini** | Free tier | API key | Advanced AI responses |
| **OpenAI** | Paid | API key | Advanced AI responses |

### Priority Order:
1. Google Gemini API (if `GEMINI_API_KEY` is set)
2. OpenAI API (if `OPENAI_API_KEY` is set)
3. Keyword-based fallback (always works free!)

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # Chat widget API
│   │   │   └── project-qa/route.ts # Project Q&A API
│   │   ├── about/
│   │   ├── projects/
│   │   ├── resume/
│   │   └── page.tsx               # Home page
│   ├── components/
│   │   ├── ChatWidget.tsx         # AI chat widget
│   │   ├── Hero.tsx
│   │   └── ...
│   └── data/
│       ├── about.json             # Portfolio data
│       ├── projects.json
│       └── resume.json
└── public/
```

## 📄 License

[MIT](LICENSE)

