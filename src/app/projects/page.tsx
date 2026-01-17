"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [qaQuestion, setQaQuestion] = useState("");
  const [qaAnswer, setQaAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectQA = async (projectId: string) => {
    if (!qaQuestion.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/project-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: qaQuestion, projectId }),
      });

      const data = await response.json();
      setQaAnswer(data.answer || "Sorry, I couldn't generate a response.");
    } catch (error) {
      setQaAnswer("Error: Could not connect to the AI service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#1a1f3a] to-[#0f172a] pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#e0e7ff] mb-4">
          Projects
        </h1>
        <p className="text-xl text-blue-200 mb-12">
          A collection of technical projects showcasing engineering expertise and problem-solving.
          Ask me anything about any project—I&apos;ll explain it like a senior engineer would.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>

        {/* Project Q&A Section */}
        {selectedProject && (
          <div className="mt-12 p-6 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <h2 className="text-2xl font-semibold text-[#e0e7ff] mb-4">
              Ask about {projectsData.find((p) => p.id === selectedProject)?.title}
            </h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qaQuestion}
                  onChange={(e) => setQaQuestion(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleProjectQA(selectedProject)
                  }
                  placeholder="e.g., What architecture patterns did you use?"
                  className="flex-1 px-4 py-2 border border-blue-500/30 rounded-lg bg-blue-900/30 text-[#e0e7ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleProjectQA(selectedProject)}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 shadow-lg shadow-blue-500/50"
                >
                  {isLoading ? "..." : "Ask"}
                </button>
              </div>
              {qaAnswer && (
                <div className="p-4 bg-blue-900/30 rounded-lg">
                  <p className="text-blue-100 whitespace-pre-wrap">
                    {qaAnswer}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedProject(null);
                setQaQuestion("");
                setQaAnswer("");
              }}
              className="mt-4 text-sm text-blue-300 hover:text-blue-400"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
