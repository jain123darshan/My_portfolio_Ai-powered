import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Portfolio | AI-Powered Technical Portfolio",
  description: "A recruiter-grade portfolio showcasing engineering expertise with AI-powered interactive features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0f1e] text-[#e0e7ff]">
        {children}
      </body>
    </html>
  );
}
