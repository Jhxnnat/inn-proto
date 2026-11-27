import { useDemo } from "../demo/DemoProvider";
import { AssistantAnswer } from "./AssistantAnswer";

export function AssistantThread({
  onOpenSource,
  className = "",
}: {
  onOpenSource: () => void;
  className?: string;
}) {
  const { submittedQuery } = useDemo();

  return (
    <div className={`conversation ${className}`.trim()}>
      <div className="user-message">{submittedQuery}</div>
      <AssistantAnswer onOpenSource={onOpenSource} />
    </div>
  );
}
