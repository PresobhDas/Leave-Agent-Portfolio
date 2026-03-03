"use client";

import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

type MessageType = { role: "user" | "assistant"; content: string };

const AZURE_URL = "https://leave-policy-agent-aaavdzbuf3bcexej.westus2-01.azurewebsites.net/agent";

const SUGGESTED = [
  "What can this AI agent do?",
  "How does the MCP server work?",
  "What problems does this project solve?",
  "What is the tech stack?",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageType[]>([{
    role: "assistant",
    content: "👋 Hi! I'm the AI agent behind this portfolio. Ask me anything about the architecture, tech stack, or what problems this system solves!",
  }]);
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
      const res = await fetch(AZURE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inp_query: userText }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const reply =
        data?.response || data?.output || data?.answer ||
        data?.result || data?.message || JSON.stringify(data);
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
    <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "16px", overflow: "hidden" }}
      className="shadow-2xl">

      {/* Messages */}
      <div className="chat-scroll overflow-y-auto p-4 space-y-4" style={{ height: "400px" }}>
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && (
          <div className="flex gap-3 items-end">
            <div style={{ backgroundColor: "#334155", border: "1px solid #7c3aed", color: "#a78bfa" }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              AI
            </div>
            <div style={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
              className="rounded-2xl rounded-bl-none">
              <TypingIndicator />
            </div>
          </div>
        )}
        {error && (
          <div style={{ color: "#f87171", backgroundColor: "#1a0a0a", border: "1px solid #7f1d1d" }}
            className="text-center text-xs rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}
              style={{ backgroundColor: "#0f172a", border: "1px solid #334155", color: "#cbd5e1", borderRadius: "999px" }}
              className="text-xs px-3 py-1.5 hover:border-violet-500 hover:text-violet-300 transition-all duration-150">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ borderTop: "1px solid #334155" }} className="p-3 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something about this project..."
          style={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "12px",
            color: "#f8fafc",
            padding: "10px 16px",
            fontSize: "14px",
            outline: "none",
            flex: 1,
          }}
        />
        <button onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          style={{
            backgroundColor: input.trim() && !loading ? "#7c3aed" : "#334155",
            borderRadius: "12px",
            width: "42px",
            height: "42px",
            border: "none",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}>
          ➤
        </button>
      </div>
    </div>
  );
}