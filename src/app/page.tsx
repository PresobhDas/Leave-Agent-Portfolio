"use client";

import { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState<"chat" | "evaluation">("chat");
  const [selectedUser, setSelectedUser] = useState<string>("");
  type AgentMessage = {
    type: "human" | "ai" | "tool" | string;
    content: string;
  };

  type MessageType = {
    role: "user" | "assistant";
    content: string;
    agentMessages?: AgentMessage[];
  };

  const [messages, setMessages] = useState<MessageType[]>([
    
    {
      role: "assistant",
      content:
        "👋 Hi! I'm the AI agent behind this portfolio. Ask me anything about the architecture, tech stack, or what problems this system solves!",
    },
  ]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [metrics, setMetrics] = useState<{
  faithfulness: number;
  relevancy: number;
  } | null>(null);

const [metricsLoading, setMetricsLoading] = useState(false);
const [metricsError, setMetricsError] = useState<string | null>(null);
useEffect(() => {
  if (!selectedUser) return;

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);

      // 🔥 BACKEND API (placeholder)
      const res = await fetch(
        `https://leave-agent-api.ashyglacier-369787e5.westus2.azurecontainerapps.io/history?user_id=${selectedUser}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      /**
       * Expected response:
       * [
       *   { question: "...", answer: "..." }
       * ]
       */

      const historyMessages = data.flatMap((item: any) => [
        {
          role: "user",
          content: item.question,
        },
        {
          role: "assistant",
          content: item.answer,
        },
      ]);

      setMessages(
        historyMessages.length > 0
          ? historyMessages
          : [
              {
                role: "assistant",
                content: "No previous history found for this user.",
              },
            ]
      );

    } catch (err) {
      console.error("History fetch failed", err);

      setMessages([
        {
          role: "assistant",
          content: "⚠️ Failed to load chat history.",
        },
      ]);
    } finally {
      setHistoryLoading(false);
    }
  };

  fetchHistory();
}, [selectedUser]);

  return (
    <main style={{ backgroundColor: "#0f172a", minHeight: "100vh" }} className="flex flex-col">

      {/* Header */}
      <header
        style={{ borderBottom: "1px solid #1e293b", backgroundColor: "#0f172a" }}
        className="sticky top-0 z-10 backdrop-blur"
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: "#7c3aed" }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg"
            >
              🤖
            </div>
            <div>
              <h1 className="font-bold text-white text-base leading-tight">
                Agentic AI + MCP Portfolio
              </h1>
              <p style={{ color: "#94a3b8" }} className="text-xs">
                Hosted on Azure Cloud
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            {/* 1. Dropdown */}
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#fff",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "12px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">Select User</option>
              <option value="E1001">E1001</option>
              <option value="E1002">E1002</option>
              <option value="E1003">E1003</option>
              <option value="HRUser">HRUser</option>
              <option value="HRAdmin">HRAdmin</option>
            </select>

            {/* 2. Live Badge (unchanged) */}
            <div
              style={{ backgroundColor: "#052e16", border: "1px solid #166534" }}
              className="flex items-center gap-2 rounded-full px-3 py-1"
            >
              <span
                style={{ backgroundColor: "#4ade80" }}
                className="w-2 h-2 rounded-full animate-pulse inline-block"
              />
              <span style={{ color: "#4ade80" }} className="text-xs font-medium">
                Live
              </span>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-6 w-full flex-1">

        {/* Hero */}
        <div className="text-center mb-8">
          <div
            style={{
              background: "linear-gradient(to right, #a78bfa, #60a5fa, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="text-4xl font-extrabold mb-4"
          >
            AI Agent Live Demo
          </div>
          <p
            style={{ color: "#94a3b8" }}
            className="text-sm max-w-xl mx-auto leading-relaxed"
          >
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

        {/* Tabs */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setActiveTab("chat")}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: activeTab === "chat" ? "#7c3aed" : "#1e293b",
              border: "1px solid #334155",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Chat Window
          </button>

          <button
            onClick={() => setActiveTab("evaluation")}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: activeTab === "evaluation" ? "#7c3aed" : "#1e293b",
              border: "1px solid #334155",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Evaluation
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "chat" && (
          <ChatWindow
            messages={messages}
            setMessages={setMessages}
            selectedUser={selectedUser}
          />
        )}

        {activeTab === "evaluation" && (
          <div
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#fff", marginBottom: "16px" }}>
              Evaluation Metrics
            </h2>

            {/* Refresh Button */}
            <button
              onClick={async () => {
                try {
                  setMetricsLoading(true);
                  setMetricsError(null);

                  const res = await fetch("https://leave-agent-api.ashyglacier-369787e5.westus2.azurecontainerapps.io/evaluate"); // 🔥 replace

                  if (!res.ok) throw new Error();

                  const data = await res.json();

                  setMetrics({
                    faithfulness: data.faithfulness,
                    relevancy: data.relevancy,
                  });

                } catch (err) {
                  console.error(err);
                  setMetricsError("Failed to fetch metrics");
                } finally {
                  setMetricsLoading(false);
                }
              }}
              style={{
                backgroundColor: "#10b981",
                borderRadius: "12px",
                padding: "10px 16px",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Refresh Metrics
            </button>

            {/* Placeholder */}
            <div style={{ marginTop: "20px" }}>
              {metricsLoading && (
                <div style={{ color: "#94a3b8", fontSize: "12px" }}>
                  Loading metrics...
                </div>
              )}

              {metricsError && (
                <div style={{ color: "#f87171", fontSize: "12px" }}>
                  {metricsError}
                </div>
              )}

              {metrics && (
                <div className="flex justify-center gap-6 mt-4">

                  {/* Faithfulness */}
                  <div
                    style={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      padding: "16px",
                      minWidth: "120px",
                    }}
                  >
                    <div style={{ color: "#a78bfa", fontSize: "12px" }}>
                      Faithfulness
                    </div>
                    <div style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>
                      {metrics.faithfulness.toFixed(2)}
                    </div>
                  </div>

                  {/* Relevancy */}
                  <div
                    style={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      padding: "16px",
                      minWidth: "120px",
                    }}
                  >
                    <div style={{ color: "#38bdf8", fontSize: "12px" }}>
                      Relevancy
                    </div>
                    <div style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>
                      {metrics.relevancy.toFixed(2)}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {CARDS.map((c) => (
            <div
              key={c.title}
              style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
              className="rounded-2xl p-6 hover:border-violet-500 transition-colors duration-200"
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-white text-sm mb-2">
                {c.title}
              </h3>
              <p style={{ color: "#94a3b8" }} className="text-xs leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ borderTop: "1px solid #1e293b" }}
        className="py-6 mt-10"
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-2">
          <span style={{ color: "#64748b" }} className="text-xs">
            Built with Next.js · Tailwind CSS · Azure Static Web Apps
          </span>
          <a
            href="https://github.com/YOUR_GITHUB/YOUR_REPO"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#64748b" }}
            className="text-xs hover:text-violet-400 transition-colors"
          >
            ⭐ View on GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}