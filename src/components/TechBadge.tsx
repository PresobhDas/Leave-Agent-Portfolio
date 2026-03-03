type Props = { label: string; color: string };

export default function TechBadge({ label }: Props) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: 500,
      padding: "4px 12px", borderRadius: "999px",
      backgroundColor: "rgba(124,58,237,0.15)",
      color: "#c4b5fd",
      border: "1px solid rgba(124,58,237,0.3)",
      display: "inline-block",
    }}>
      {label}
    </span>
  );
}