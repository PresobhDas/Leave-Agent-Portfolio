type Props = { label: string; color: string };

export default function TechBadge({ label, color }: Props) {
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${color}`}>
      {label}
    </span>
  );
}