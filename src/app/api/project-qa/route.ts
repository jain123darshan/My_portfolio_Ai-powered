import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import projectsData from "@/data/projects.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for project-specific Q&A
const SYSTEM_PROMPT = `You are an AI assistant specialized in answering technical questions about specific software projects. Your role is to explain projects like a senior engineer would—focusing on architecture, technical decisions, challenges, and implementation details.

STRICT RULES:
- Answer questions ONLY about the projects in the provided data
- If asked about a project not in the data, say "I don't have information about that project"
- Explain technical concepts clearly but with depth
- Reference specific technologies, frameworks, and patterns used
- Discuss trade-offs and design decisions when relevant
- Be technical and precise, suitable for technical recruiters or engineers

PROJECTS DATA:
${JSON.stringify(projectsData, null, 2)}

When answering:
- Reference specific projects by name when relevant
- Explain the tech stack and why it was chosen
- Discuss implementation approaches and challenges
- Provide technical depth appropriate for engineering discussions`;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { question, projectId } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // If projectId is provided, filter to that project
    let relevantProjects = projectsData;
    if (projectId) {
      relevantProjects = projectsData.filter((p: any) => p.id === projectId);
      if (relevantProjects.length === 0) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    }

    const contextPrompt = projectId
      ? `Focus your answer on this specific project: ${JSON.stringify(relevantProjects[0], null, 2)}`
      : SYSTEM_PROMPT;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: contextPrompt },
        { role: "user", content: question },
      ] as any,
      temperature: 0.7,
      max_tokens: 800,
    });

    const answer = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      answer,
      projectId: projectId || null,
    });
  } catch (error: any) {
    console.error("Project Q&A API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process question" },
      { status: 500 }
    );
  }
}
