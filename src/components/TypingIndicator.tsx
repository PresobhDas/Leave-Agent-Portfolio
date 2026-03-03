export default function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "12px 16px" }}>
      {[0, 150, 300].map((delay) => (
        <span key={delay} style={{
          width: "8px", height: "8px", borderRadius: "50%",
          backgroundColor: "#a78bfa", display: "inline-block",
          animation: "bounce 1s infinite",
          animationDelay: `${delay}ms`,
        }} />
      ))}
    </div>
  );
}