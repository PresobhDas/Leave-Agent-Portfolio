import ChatWindow from "@/components/ChatWindow";
import TechBadge from "@/components/TechBadge";

const TECH_STACK = [
  { label: "Agentic AI",      color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  { label: "MCP Server",      color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { label: "Azure Functions", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
  { label: "Azure Cloud",     color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { label: "Next.js",         color: "bg-slate-500/20 text-slate-300 border-slate-500/30" },
];

const CARDS = [
  {
    icon: "🤖",
    title: "Agentic AI",
    desc: "Autonomous agent that reasons, plans, and takes multi-step actions to complete complex tasks.",
  },
  {
    icon: "🔌",
    title: "MCP Server",
    desc: "Model Context Protocol enables structured tool use and seamless external integrations.",
  },
  {
    icon: "☁️",
    title: "Azure Hosted",
    desc: "Deployed on Azure Function Apps for scalable, enterprise-grade reliability.",
  },
];

export default function Home() {
  return (
    <main style={{ backgroundColor: "#0f172a", minHeight: "100vh" }} className="flex flex-col">

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1e293b", backgroundColor: "#0f172a" }}
        className="sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: "#7c3aed" }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg">
              🤖
            </div>
            <div>
              <h1 className="font-bold text-white text-base leading-tight">
                Agentic AI + MCP Portfolio
              </h1>
              <p style={{ color: "#94a3b8" }} className="text-xs">Hosted on Azure Cloud</p>
            </div>
          </div>
          <div style={{ backgroundColor: "#052e16", border: "1px solid #166534" }}
            className="flex items-center gap-2 rounded-full px-3 py-1">
            <span style={{ backgroundColor: "#4ade80" }}
              className="w-2 h-2 rounded-full animate-pulse inline-block" />
            <span style={{ color: "#4ade80" }} className="text-xs font-medium">Live</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-6 w-full flex-1">
        <div className="text-center mb-8">
          <div style={{
            background: "linear-gradient(to right, #a78bfa, #60a5fa, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }} className="text-4xl font-extrabold mb-4">
            AI Agent Live Demo
          </div>
          <p style={{ color: "#94a3b8" }} className="text-sm max-w-xl mx-auto leading-relaxed">
            An agentic AI system connected to an MCP Server, deployed on Azure Functions.
            Type a question below to interact with the live agent.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TECH_STACK.map((t) => (
            <TechBadge key={t.label} label={t.label} color={t.color} />
          ))}
        </div>

        {/* Chat */}
        <ChatWindow />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {CARDS.map((c) => (
            <div key={c.title}
              style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
              className="rounded-2xl p-6 hover:border-violet-500 transition-colors duration-200">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-white text-sm mb-2">{c.title}</h3>
              <p style={{ color: "#94a3b8" }} className="text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1e293b" }} className="py-6 mt-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-2">
          <span style={{ color: "#64748b" }} className="text-xs">
            Built with Next.js · Tailwind CSS · Azure Static Web Apps
          </span>
          <a href="https://github.com/YOUR_GITHUB/YOUR_REPO"
            target="_blank" rel="noopener noreferrer"
            style={{ color: "#64748b" }}
            className="text-xs hover:text-violet-400 transition-colors">
            ⭐ View on GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}