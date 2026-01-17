"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features?: string[];
  github?: string | null;
  live?: string | null;
  category: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  onSelectProject: (projectId: string) => void;
}

export default function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-blue-900/20 rounded-lg shadow-lg p-6 border border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-semibold text-[#e0e7ff]">
          {project.title}
        </h3>
        <span className="text-sm text-blue-300">{project.year}</span>
      </div>

      <p className="text-blue-200 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.features && project.features.length > 0 && (
        <ul className="text-sm text-blue-300 mb-4 list-disc list-inside space-y-1">
          {project.features.slice(0, 3).map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      )}

      <div className="flex gap-3 mt-6">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-900/30 text-blue-200 rounded-lg hover:bg-blue-900/50 transition-colors text-sm border border-blue-500/30"
          >
            GitHub
          </Link>
        )}
        {project.live && (
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm shadow-lg shadow-blue-500/50"
          >
            Live Demo
          </Link>
        )}
        <button
          onClick={() => onSelectProject(project.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-500/50"
        >
          Ask AI
        </button>
      </div>
    </motion.div>
  );
}
