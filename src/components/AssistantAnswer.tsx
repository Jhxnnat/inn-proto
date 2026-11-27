import { Bookmark, Check, ExternalLink, Highlighter, Sparkles } from "lucide-react";
import { useDemo } from "../demo/DemoProvider";
import { books, citation } from "../data";
import { MiniCover } from "./MiniCover";

export function AssistantAnswer({ onOpenSource }: { onOpenSource: () => void }) {
  const { saved, setSaved } = useDemo();

  return (
    <div className="ai-message">
      <div className="answer-label">
        <Sparkles size={15} /> RESPUESTA
      </div>
      <p>
        La literatura sobre ética de la IA en la educación superior coincide en que estas
        herramientas pueden apoyar la revisión bibliográfica y la organización de ideas, pero no
        sustituyen el juicio del investigador. La <strong>transparencia</strong> sobre su uso y la
        verificación de las fuentes son criterios centrales.{" "}
        <button className="citation" onClick={onOpenSource}>
          1
        </button>
      </p>
      <p>
        Los estudios también advierten sobre sesgos en los modelos y la necesidad de declarar su uso
        en trabajos de grado. La integridad académica exige que la autoría, la interpretación y las
        citas sean responsabilidad del estudiante.{" "}
        <button className="citation" onClick={onOpenSource}>
          2
        </button>
      </p>
      <div className="source-strip">
        <button onClick={onOpenSource}>
          <MiniCover book={books[0]} />
          <span>
            <small>FUENTE 1</small>
            <strong>{books[0].title}</strong>
            <em>
              Cap. {citation.chapter} · pág. {citation.page}
            </em>
          </span>
          <ExternalLink size={16} />
        </button>
      </div>
      <div className="answer-actions">
        <button onClick={() => setSaved(!saved)}>
          {saved ? <Check size={16} /> : <Bookmark size={16} />}
          {saved ? "Guardado" : "Guardar"}
        </button>
        <button>
          <Highlighter size={16} /> Añadir nota
        </button>
      </div>
    </div>
  );
}
