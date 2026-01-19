import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import projectsData from "@/data/projects.json";

// Initialize OpenAI client only when API key is available
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Simple keyword-based response system (FREE - no API needed)
function getSimpleProjectResponse(question: string, projectId?: string): string {
  // If projectId is provided, filter to that project
  let relevantProjects = projectsData;
  if (projectId) {
    relevantProjects = projectsData.filter((p: any) => p.id === projectId);
    if (relevantProjects.length === 0) {
      return "I couldn't find that project in my portfolio data.";
    }
  }

  const questionLower = question.toLowerCase();
  const project = relevantProjects[0];

  // If asking about a specific project
  if (project) {
    // Tech stack questions
    if (questionLower.includes("tech") || questionLower.includes("technology") || questionLower.includes("stack") || questionLower.includes("built with") || questionLower.includes("languages")) {
      return `**${project.title}** was built using:\n\n${project.technologies?.map((t: string) => `• ${t}`).join("\n") || "No technologies listed"}\n\n${project.github ? `GitHub: ${project.github}` : ""}`;
    }

    // Description
    if (questionLower.includes("what is") || questionLower.includes("about") || questionLower.includes("description")) {
      return `**${project.title}**\n\n${project.description || "No description available."}`;
    }

    // Features
    if (questionLower.includes("feature") || questionLower.includes("what does") || questionLower.includes("can do")) {
      return project.features 
        ? `**Features of ${project.title}:**\n\n${project.features.map((f: any) => `• ${f}`).join("\n")}`
        : `No feature information available for ${project.title}.`;
    }

    // Company/Workplace
    if (questionLower.includes("company") || questionLower.includes("work") || questionLower.includes("where") || questionLower.includes("workplace")) {
      return project.company 
        ? `**${project.title}** was built at **${project.company}** (${project.year || "N/A"}).\n\n${project.domain ? `Domain: ${project.domain}` : ""}`
        : `**${project.title}** was built in ${project.year || "N/A"}.`;
    }

    // Default project response
    return `**${project.title}**\n\n${project.description || ""}\n\n**Technologies:** ${project.technologies?.join(", ") || "N/A"}\n\n${project.github ? `**GitHub:** ${project.github}` : ""}\n${project.live ? `**Live:** ${project.live}` : ""}\n\n${project.features ? `**Features:**\n${project.features.map((f: any) => `• ${f}`).join("\n")}` : ""}`;
  }

  // General project questions
  if (questionLower.includes("all project") || questionLower.includes("list") || questionLower.includes("show me")) {
    return `Here are all my projects:\n\n${projectsData.map((p: any) => 
      `**${p.title}**\n${p.description}\nTech: ${p.technologies?.join(", ") || "N/A"}\n${p.github ? `GitHub: ${p.github}` : ""}`
    ).join("\n\n---\n\n")}`;
  }

  return `I can answer questions about specific projects. Try asking:\n\n• "Tell me about [project name]"\n• "What technologies were used in [project name]?"\n• "What features does [project name] have?"\n• "Where did you build [project name]?"\n\nOr ask about all my projects!`;
}

// Call Google Gemini API using REST (new model gemini-2.0-flash-exp)
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
            maxOutputTokens: 800,
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
    const { question, projectId } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // If projectId is provided, validate it exists
    if (projectId) {
      const projectExists = projectsData.some((p: any) => p.id === projectId);
      if (!projectExists) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    }

    let relevantProjects = projectsData;
    if (projectId) {
      relevantProjects = projectsData.filter((p: any) => p.id === projectId);
    }

    const projectsJson = JSON.stringify(relevantProjects, null, 2);
    const systemPrompt = `You are an AI assistant specialized in answering technical questions about specific software projects. Explain projects like a senior engineer—focusing on architecture, technical decisions, challenges, and implementation details.`;

    // Try Gemini API (new model gemini-2.0-flash-exp)
    try {
      const geminiResponse = await callGeminiAPI(
        `${systemPrompt}\n\nProjects:\n${projectsJson}\n\nQuestion: ${question}`
      );
      if (geminiResponse) {
        return NextResponse.json({ answer: geminiResponse, projectId: projectId || null });
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
            { role: "user", content: `Projects: ${projectsJson}\n\nQuestion: ${question}` },
          ] as any,
          temperature: 0.7,
          max_tokens: 800,
        });

        const answer = completion.choices[0]?.message?.content;
        if (answer) {
          return NextResponse.json({ answer, projectId: projectId || null });
        }
      } catch (openaiError: any) {
        console.log("OpenAI unavailable, using fallback response:", openaiError.message);
      }
    }

    // Use the free keyword-based fallback
    const simpleResponse = getSimpleProjectResponse(question, projectId);
    return NextResponse.json({ answer: simpleResponse, projectId: projectId || null });

  } catch (error: any) {
    console.error("Project Q&A API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process question" },
      { status: 500 }
    );
  }
}

