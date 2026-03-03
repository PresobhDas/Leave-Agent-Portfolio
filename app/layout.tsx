import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leave Application Agent Portfolio | Presobh",
  description:
    "Agentic AI system powered by MCP Server and Azure Functions. Built as a portfolio project.",
  openGraph: {
    title: "AI Agent Portfolio",
    description: "Live demo of an Agentic AI + MCP Server hosted on Azure.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}