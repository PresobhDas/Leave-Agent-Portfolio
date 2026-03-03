type AgentMessage = {
  type: "human" | "ai" | "tool" | string;
  content: string;
};

type Props = {
  msg: {
    role: "user" | "assistant";
    content: string;
    agentMessages?: AgentMessage[];
  };
};

function AgentMessageBlock({ messages }: { messages: AgentMessage[] }) {
  const visibleMessages = messages.filter(
    (m) => m.type === "ai" || m.type === "tool"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {visibleMessages.map((m, i) => {
        const isAI = m.type === "ai";
        const isTool = m.type === "tool";

        return (
          <div key={i} style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: isAI
              ? "1px solid rgba(124,58,237,0.4)"
              : "1px solid rgba(14,165,233,0.4)",
          }}>
            {/* Header bar */}
            <div style={{
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: isAI
                ? "rgba(124,58,237,0.2)"
                : "rgba(14,165,233,0.2)",
            }}>
              <span style={{ fontSize: "14px" }}>
                {isAI ? "🤖" : "🔧"}
              </span>
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isAI ? "#c4b5fd" : "#7dd3fc",
              }}>
                {isAI ? "AI Message" : "Tool Message"}
              </span>
              <div style={{
                flex: 1,
                height: "1px",
                backgroundColor: isAI
                  ? "rgba(124,58,237,0.3)"
                  : "rgba(14,165,233,0.3)",
                marginLeft: "4px",
              }} />
            </div>

            {/* Content */}
            <div style={{
              padding: "12px 14px",
              fontSize: "13px",
              lineHeight: "1.7",
              color: isAI ? "#e2e8f0" : "#bae6fd",
              backgroundColor: isAI
                ? "rgba(15,23,42,0.8)"
                : "rgba(8,47,73,0.5)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
              {m.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Message({ msg }: Props) {
  const isUser = msg.role === "user";

  // User message — simple chat bubble
  if (isUser) {
    return (
      <div style={{ display: "flex", gap: "12px", flexDirection: "row-reverse", alignItems: "flex-end" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          flexShrink: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "11px", fontWeight: "bold",
          backgroundColor: "#7c3aed", color: "#fff",
        }}>
          You
        </div>
        <div style={{
          maxWidth: "75%",
          backgroundColor: "#7c3aed", color: "#fff",
          borderRadius: "16px 16px 4px 16px",
          padding: "10px 14px", fontSize: "14px",
          lineHeight: "1.6", whiteSpace: "pre-wrap",
        }}>
          {msg.content}
        </div>
      </div>
    );
  }

  // Assistant message — show full agent trace
  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: "row", alignItems: "flex-start" }}>
      {/* AI Avatar */}
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%",
        flexShrink: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "11px", fontWeight: "bold",
        backgroundColor: "#1e293b", color: "#a78bfa",
        border: "1px solid #7c3aed", marginTop: "4px",
      }}>
        AI
      </div>

      {/* Agent message blocks */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {msg.agentMessages && msg.agentMessages.length > 0 ? (
          <AgentMessageBlock messages={msg.agentMessages} />
        ) : (
          <div style={{
            backgroundColor: "#0f172a", color: "#e2e8f0",
            border: "1px solid #334155",
            borderRadius: "16px 16px 16px 4px",
            padding: "10px 14px", fontSize: "14px",
            lineHeight: "1.6", whiteSpace: "pre-wrap",
          }}>
            {msg.content}
          </div>
        )}
      </div>
    </div>
  );
}