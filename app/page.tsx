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
  { icon: "🤖", title: "Agentic AI",   desc: "Autonomous agent that reasons, plans, and takes multi-step actions to complete complex tasks." },
  { icon: "🔌", title: "MCP Server",   desc: "Model Context Protocol enables structured tool use and seamless external integrations." },
  { icon: "☁️", title: "Azure Hosted", desc: "Deployed on Azure Function Apps for scalable, enterprise-grade reliability and performance." },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/50 text-lg">
              🤖
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Agentic AI + MCP Portfolio</h1>
              <p className="text-xs text-slate-400">Hosted on Azure Cloud</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-700/50 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Live</span>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI Agent Live Demo
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            An agentic AI system connected to an MCP Server, deployed on Azure Functions.
            Type a question below to interact with the live agent.
          </p>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TECH_STACK.map((t) => (
            <TechBadge key={t.label} {...t} />
          ))}
        </div>

        {/* Chat */}
        <ChatWindow />

        {/* About cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-violet-500/40 transition-colors duration-200"
            >
              <div className="text-2xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{c.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-5">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500">
          <span>Built with Next.js · Tailwind CSS · Azure Static Web Apps</span>
          
            href="https://github.com/PresobhDas/Leave-Agent-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
```

---

### `.env.local` ← **Never commit this to GitHub!**
```
AZURE_FUNCTION_URL=https://YOUR_FUNCTION_APP.azurewebsites.net/api/chat