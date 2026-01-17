import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import aboutData from "@/data/about.json";
import projectsData from "@/data/projects.json";
import resumeData from "@/data/resume.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt that grounds the AI in portfolio data only
const SYSTEM_PROMPT = `You are an AI assistant representing a portfolio website. Your role is to answer questions about the portfolio owner's background, projects, skills, and experience based ONLY on the provided portfolio data.

STRICT RULES:
- Answer questions ONLY using information from the portfolio data provided
- If information is not available in the portfolio data, say "I don't have that information in my portfolio data"
- Be professional, technical, and precise
- When discussing projects, reference specific technologies and achievements
- Act as a technical representative who knows the portfolio deeply

PORTFOLIO DATA:
${JSON.stringify({ about: aboutData, projects: projectsData, resume: resumeData }, null, 2)}

Remember: You are bound to this data. Do not make up information or use external knowledge beyond what's provided.`;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Prepare messages with system prompt
    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}
