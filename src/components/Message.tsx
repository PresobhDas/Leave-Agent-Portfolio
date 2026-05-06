type AgentMessage = {
  type: "human" | "ai" | "tool" | string;
  content: string;
};

type Props = {
  msg: {
    role: "user" | "assistant";
    content: string;
    confidence?: number;
  };
};

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
          <div
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "16px 16px 16px 4px",
              padding: "12px 14px",
            }}
          >
            {/* Answer */}
            <div
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#e2e8f0",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>

            {/* Confidence */}
            {msg.confidence !== undefined && (
              <div
                style={{
                  marginTop: "8px",
                  paddingTop: "8px",
                  borderTop: "1px solid #334155",
                  fontSize: "11px",
                  color: "#94a3b8",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Confidence</span>
                <span style={{ color: "#22c55e", fontWeight: 600 }}>
                  {msg.confidence.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}