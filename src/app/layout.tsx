import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Agent Portfolio",
  description: "Agentic AI system powered by MCP Server and Azure Functions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}