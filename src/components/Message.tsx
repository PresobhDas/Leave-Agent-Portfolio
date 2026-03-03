type MessageType = { role: "user" | "assistant"; content: string };

export default function Message({ msg }: { msg: MessageType }) {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: isUser ? "row-reverse" : "row", alignItems: "flex-end" }}>
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "bold",
        backgroundColor: isUser ? "#7c3aed" : "#1e293b",
        color: isUser ? "#fff" : "#a78bfa",
        border: isUser ? "none" : "1px solid #7c3aed",
      }}>
        {isUser ? "You" : "AI"}
      </div>
      <div style={{
        maxWidth: "75%",
        backgroundColor: isUser ? "#7c3aed" : "#0f172a",
        color: isUser ? "#fff" : "#e2e8f0",
        border: isUser ? "none" : "1px solid #334155",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        padding: "10px 14px",
        fontSize: "14px",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap",
      }}>
        {msg.content}
      </div>
    </div>
  );
}