"use client";

import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

type MessageType = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What can this AI agent do?",
  "How does the MCP server work?",
  "What problems does this project solve?",
  "What is the tech stack?",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm the AI agent behind this portfolio. Ask me anything about the architecture, tech stack, or what problems this system solves!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    setError(null);
    const updated: MessageType[] = [...messages, { role: "user", content: userText }];
    setMessages(updated);
    setLoading(true);

    try {
      // Calls our Next.js proxy → /api/chat → Azure Function
      const res = await fetch("https://leave-policy-agent-aaavdzbuf3bcexej.westus2-01.azurewebsites.net/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      const reply = data?.message || data?.content || data?.response || "No response received.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("⚠️ Could not reach the AI backend. Please try again shortly.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
      {/* Messages */}
      <div className="chat-scroll h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        {loading && (
          <div className="flex gap-3 items-end">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-violet-500/40 flex items-center justify-center text-xs font-bold text-violet-300">
              AI
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions — only shown at start */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-xs bg-slate-800 hover:bg-violet-900/40 border border-slate-700 hover:border-violet-500/50 text-slate-300 hover:text-violet-300 rounded-full px-3 py-1.5 transition-all duration-150"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="border-t border-slate-800 p-3 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something about this project..."
          className="flex-1 bg-slate-800 border border-slate-700 focus:border-violet-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-150"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-lg shadow-violet-900/40"
          aria-label="Send message"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}