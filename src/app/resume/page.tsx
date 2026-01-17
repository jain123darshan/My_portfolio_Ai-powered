import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import resumeData from "@/data/resume.json";

export default function ResumePage() {
  const { experience, certifications, education, achievements, contact } = resumeData;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#1a1f3a] to-[#0f172a] pt-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#e0e7ff] mb-12">
          Resume
        </h1>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#e0e7ff] mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="border-l-4 border-blue-500 pl-6 pb-8 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-[#e0e7ff]">
                      {exp.position}
                    </h3>
                    <p className="text-lg text-blue-400">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-blue-300 text-sm mt-1 md:mt-0">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-blue-200 mb-4 mt-2">
                  {exp.description}
                </p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-blue-300">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx}>{achievement}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-1 bg-blue-900/30 text-blue-200 text-xs rounded border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#e0e7ff] mb-8">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20"
                >
                  <h3 className="text-lg font-medium text-[#e0e7ff]">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-200 mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-blue-300 text-sm mt-1">
                    {edu.duration} {edu.score && `• ${edu.score}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#e0e7ff] mb-8">
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20"
                >
                  <h3 className="text-lg font-medium text-[#e0e7ff]">
                    {cert.name}
                  </h3>
                  {cert.issuer && (
                    <p className="text-blue-300">
                      {cert.issuer} {cert.year && `• ${cert.year}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#e0e7ff] mb-8">
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-500"
                >
                  <p className="text-[#e0e7ff]">{achievement}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Information */}
        {contact && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#e0e7ff] mb-8">
              Contact
            </h2>
            <div className="space-y-2">
              {contact.email && (
                <p className="text-blue-200">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p className="text-blue-200">
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-blue-400 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              )}
            </div>
          </section>
        )}

        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-semibold text-[#e0e7ff] mb-8">
            Get in Touch
          </h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
