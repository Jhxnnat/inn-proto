import { Sparkles } from "lucide-react";
import type { Session } from "../data";

export function SessionVisual({
  session,
  className = "",
  sparkleSize = 14,
}: {
  session: Session;
  className?: string;
  sparkleSize?: number;
}) {
  return (
    <div className={`session-visual ${session.accent} ${className}`.trim()}>
      <span>{session.icon}</span>
      <Sparkles size={sparkleSize} />
    </div>
  );
}
