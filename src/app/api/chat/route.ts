import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import resumeData from "@/data/resume.json";

// Initialize OpenAI client only when API key is available
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Simple keyword-based response system (FREE - no API needed)
function getSimpleResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Greetings
  if (message.match(/^(hi|hello|hey|greetings)/)) {
    return `Hello! I'm the portfolio assistant. I can tell you about ${aboutData.name}'s skills, experience, projects, and background. What would you like to know?`;
  }

  // About/Skills
  if (message.includes("skill") || message.includes("technology") || message.includes("tech stack")) {
    return `Here are my key skills:\n\n**Languages:** ${aboutData.skills?.languages?.join(", ") || "N/A"}\n\n**Frameworks:** ${aboutData.skills?.frameworks?.join(", ") || "N/A"}\n\n**Tools:** ${aboutData.skills?.tools?.join(", ") || "N/A"}\n\n**AI/ML:** ${aboutData.skills?.ai_ml?.join(", ") || "N/A"}\n\nWould you like more details about any specific skill?`;
  }

  // Experience
  if (message.includes("experience") || message.includes("work") || message.includes("job") || message.includes("company")) {
    const exp = resumeData.experience?.map((e: any) => 
      `• **${e.role}** at ${e.company}\n  ${e.period}\n  ${e.description || ""}`
    ).join("\n\n") || "No experience listed";
    return `Here's my work experience:\n\n${exp}`;
  }

  // Education
  if (message.includes("education") || message.includes("degree") || message.includes("university") || message.includes("college")) {
    const edu = resumeData.education?.map((e: any) => 
      `• **${e.degree}** at ${e.institution}\n  ${e.period || ""}`
    ).join("\n\n") || "No education listed";
    return `Here's my education:\n\n${edu}`;
  }

  // Projects
  if (message.includes("project") || message.includes("work") || message.includes("built") || message.includes("made")) {
    const projects = projectsData.map((p: any) => 
      `**${p.title}**\n${p.description}\nTech: ${p.technologies?.join(", ") || "N/A"}\n${p.github ? `GitHub: ${p.github}` : ""}`
    ).join("\n\n---\n\n");
    return `Here are my projects:\n\n${projects}`;
  }

  // Contact
  if (message.includes("contact") || message.includes("email") || message.includes("reach")) {
    return `You can reach me through the contact form on this website, or via email at ${aboutData.email || "the email listed in the contact section"}.`;
  }

  // Default response
  return `I can help you learn more about my portfolio! Ask me about:\n\n• My **skills** and technologies\n• My **experience** and work history\n• My **projects** and what I've built\n• My **education** background\n• How to **contact** me\n\nWhat would you like to know?`;
}

// Call Google Gemini API using REST (new SDK uses API key from env)
async function callGeminiAPI(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const data = await response.json();
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return null;
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    const portfolioData = JSON.stringify({ about: aboutData, projects: projectsData, resume: resumeData }, null, 2);
    const systemPrompt = `You are an AI assistant representing a portfolio website. Answer questions about the portfolio owner's background, projects, skills, and experience based ONLY on the provided portfolio data. Be professional, technical, and precise.`;

    // Try Gemini API (new model gemini-2.0-flash-exp)
    try {
      const geminiResponse = await callGeminiAPI(
        `${systemPrompt}\n\nPortfolio Data:\n${portfolioData}\n\nUser Question: ${lastUserMessage.content}`
      );
      if (geminiResponse) {
        return NextResponse.json({ message: geminiResponse });
      }
    } catch (geminiError: any) {
      console.log("Gemini API failed:", geminiError.message);
      // Fall through to try other options
    }

    // Try OpenAI if available
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((msg: { role: string; content: string }) => ({
              role: msg.role,
              content: msg.content,
            })),
          ] as any,
          temperature: 0.7,
          max_tokens: 500,
        });

        const assistantMessage = completion.choices[0]?.message?.content;
        if (assistantMessage) {
          return NextResponse.json({ message: assistantMessage });
        }
      } catch (openaiError: any) {
        console.log("OpenAI unavailable, using fallback response:", openaiError.message);
      }
    }

    // Use the free keyword-based fallback
    const simpleResponse = getSimpleResponse(lastUserMessage.content);
    return NextResponse.json({ message: simpleResponse });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}

