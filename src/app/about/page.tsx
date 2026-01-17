import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import aboutData from "@/data/about.json";

export default function AboutPage() {
  const { skills, education, interests, bio, name, title, location, linkedin, github, leetcode, code360 } = aboutData;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#1a1f3a] to-[#0f172a] pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              <Image
                src="/images/profile.jpg"
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#e0e7ff] mb-2">
              {name}
            </h1>
            <p className="text-xl text-blue-400 mb-2">{title}</p>
            <p className="text-blue-200">{location}</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-blue-100 text-lg leading-relaxed">
            {bio}
          </p>
        </div>

        <div className="space-y-12">
          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold text-[#e0e7ff] mb-4">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h3 className="text-xl font-medium text-blue-200">
                  {edu.degree}
                </h3>
                <p className="text-blue-300">
                  {edu.school} • {edu.year}
                </p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold text-[#e0e7ff] mb-4">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">
                  Frameworks & Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">
                  Tools & Infrastructure
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-700/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">
                  AI/ML
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.ai_ml.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-800/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section>
            <h2 className="text-2xl font-semibold text-[#e0e7ff] mb-4">
              Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-900/30 text-blue-200 rounded-lg border border-blue-500/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Social Links */}
          <section>
            <h2 className="text-2xl font-semibold text-[#e0e7ff] mb-4">
              Connect With Me
            </h2>
            <div className="flex flex-wrap gap-4">
              {linkedin && (
                <Link
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50"
                >
                  LinkedIn
                </Link>
              )}
              {github && (
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-900/50 text-blue-200 rounded-lg hover:bg-blue-900/70 transition-colors border border-blue-500/30"
                >
                  GitHub
                </Link>
              )}
              {leetcode && (
                <Link
                  href={leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700/50 text-blue-200 rounded-lg hover:bg-blue-700/70 transition-colors border border-blue-500/30"
                >
                  LeetCode
                </Link>
              )}
              {code360 && (
                <Link
                  href={code360}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-800/50 text-blue-200 rounded-lg hover:bg-blue-800/70 transition-colors border border-blue-500/30"
                >
                  Code360
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
