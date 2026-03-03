type MessageType = { role: "user" | "assistant"; content: string };

export default function Message({ msg }: { msg: MessageType }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
          ${isUser
            ? "bg-violet-600 text-white"
            : "bg-slate-700 text-violet-300 border border-violet-500/40"}`}
      >
        {isUser ? "You" : "AI"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? "bg-violet-600 text-white rounded-br-sm"
            : "bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-sm"}`}
      >
        {msg.content}
      </div>
    </div>
  );
}