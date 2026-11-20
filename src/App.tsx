import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Bookmark,
  Check,
  CircleUserRound,
  ExternalLink,
  FileText,
  Highlighter,
  Home,
  Library,
  MessageCircleQuestion,
  Mic,
  MoreHorizontal,
  PanelsTopLeft,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  StickyNote,
  TextQuote,
  X,
} from "lucide-react";

type Tab = "inicio" | "sesiones" | "biblioteca" | "asistente";
type NavItem = {
  id: Tab | "perfil";
  label: string;
  icon: typeof Home;
  special?: boolean;
};

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  format: "EPUB" | "PDF";
  progress?: number;
  category: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "Ética de la inteligencia artificial",
    author: "Luciano Floridi",
    cover: "cover-history",
    format: "PDF",
    progress: 68,
    category: "Ética",
  },
  {
    id: 2,
    title: "Metodología de la investigación",
    author: "Roberto Hernández Sampieri",
    cover: "cover-time",
    format: "EPUB",
    category: "Metodología",
  },
  {
    id: 3,
    title: "La sociedad red",
    author: "Manuel Castells",
    cover: "cover-cosmos",
    format: "EPUB",
    category: "Comunicación",
  },
  {
    id: 4,
    title: "Patrimonio documental y digitalización",
    author: "Consejo Internacional de Archivos",
    cover: "cover-forest",
    format: "PDF",
    category: "Archivística",
  },
  {
    id: 5,
    title: "Lectura y universidad",
    author: "Observatorio UTB",
    cover: "cover-time",
    format: "PDF",
    category: "Educación",
  },
];

const suggestions = [
  "¿Qué dice la bibliografía sobre ética en IA?",
  "Resume las notas de mi tesis",
  "Compara dos artículos de investigación",
];

const sessions = [
  {
    id: 1,
    title: "Tesis: Ética académica e IA generativa",
    description:
      "Autoría, integridad y evaluación en trabajos de grado con inteligencia artificial.",
    sources: 6,
    notes: 12,
    updated: "Hace 18 min",
    accent: "session-cyan",
    icon: "IA",
    sourceIds: [1, 2, 3],
    note: "La IA puede apoyar la revisión bibliográfica, pero la autoría, la interpretación y las citas deben ser verificables por el estudiante.",
  },
  {
    id: 2,
    title: "Proyecto: Hábitos de lectura en la UTB",
    description:
      "Encuesta sobre acceso, uso y preferencias de lectura en la comunidad universitaria.",
    sources: 4,
    notes: 8,
    updated: "Ayer",
    accent: "session-indigo",
    icon: "HL",
    sourceIds: [2, 5],
    note: "Los datos preliminares muestran que el formato digital gana terreno en lecturas obligatorias, pero el préstamo físico sigue siendo clave para la investigación.",
  },
  {
    id: 3,
    title: "Artículo: Patrimonio documental digital",
    description:
      "Archivo, metadatos y preservación de colecciones históricas de la universidad.",
    sources: 9,
    notes: 15,
    updated: "8 jun",
    accent: "session-teal",
    icon: "PD",
    sourceIds: [3, 4],
    note: "Digitalizar no es preservar: se necesitan metadatos, derechos de uso y un plan de conservación a largo plazo.",
  },
];

const emptySession = {
  id: 4,
  title: "Nuevo trabajo de investigación",
  description: "Organiza fuentes, notas y avances de tu proyecto académico.",
  sources: 0,
  notes: 0,
  updated: "Ahora",
  accent: "session-cyan",
  icon: "TI",
  sourceIds: [] as number[],
  note: "Aún no hay notas destacadas. Añade una fuente para comenzar tu investigación.",
};

const navItems: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "sesiones", label: "Investigación", icon: PanelsTopLeft },
  { id: "asistente", label: "Preguntar", icon: MessageCircleQuestion, special: true },
  { id: "biblioteca", label: "Biblioteca", icon: Library },
  { id: "perfil", label: "Perfil", icon: CircleUserRound },
];

function MiniCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div className={`book-cover ${book.cover} ${large ? "book-cover-large" : ""}`}>
      <div className="cover-mark" />
      <span>{book.author.split(" ").slice(-1)}</span>
      <strong>{book.title}</strong>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState<Tab>("inicio");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[number] | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.querySelector(".screen")?.scrollTo({ top: 0 });
  }, [tab, selectedSession]);

  function askAssistant(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setSubmittedQuery(query.trim());
    setTab("asistente");
    setQuery("");
  }

  return (
    <main className="app-shell">
      <div className="mobile-app">
        <header className="topbar">
          <button className="brand" onClick={() => setTab("inicio")} aria-label="Ir al inicio">
            <span className="brand-icon">
              <BookMarked size={19} strokeWidth={2.2} />
            </span>
            <span>Biblioteca UTB</span>
          </button>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Buscar"
              onClick={() => {
                setSelectedSession(null);
                setTab("sesiones");
              }}
            >
              <Search size={20} />
            </button>
            <button className="avatar" aria-label="Abrir perfil">
              LM
            </button>
          </div>
        </header>

        <div className="screen">
          {tab === "inicio" && (
            <section className="page enter">
              <form className="ask-card" onSubmit={askAssistant}>
                <div className="ask-heading">
                  <span className="ai-orb">
                    <Sparkles size={17} />
                  </span>
                  <div>
                    <strong>Asistente de investigación</strong>
                    <small>Pregunta en tu biblioteca</small>
                  </div>
                  <span className="status-dot">En línea</span>
                </div>
                <div className="ask-input-wrap">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Pregunta, compara o investiga..."
                    aria-label="Pregunta al asistente"
                  />
                  <button type="button" className="mic-button" aria-label="Usar micrófono">
                    <Mic size={18} />
                  </button>
                  <button type="submit" className="send-button" aria-label="Enviar pregunta">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="suggestions">
                  {suggestions.slice(0, 2).map((item) => (
                    <button key={item} type="button" onClick={() => setQuery(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </form>

              <div className="section-heading">
                <div>
                  <span className="eyebrow">TU LECTURA</span>
                  <h2>Continúa donde lo dejaste</h2>
                </div>
                <button aria-label="Más opciones">
                  <MoreHorizontal size={21} />
                </button>
              </div>

              <button className="continue-card" onClick={() => setSelectedBook(books[0])}>
                <MiniCover book={books[0]} />
                <div className="continue-copy">
                  <span className="format-pill">{books[0].format}</span>
                  <h3>{books[0].title}</h3>
                  <p>{books[0].author}</p>
                  <div className="progress-label">
                    <span>Capítulo 6 de 9</span>
                    <strong>68%</strong>
                  </div>
                  <div className="progress">
                    <span style={{ width: "68%" }} />
                  </div>
                  <span className="continue-cta">
                    <BookOpen size={15} /> Continuar leyendo
                  </span>
                </div>
              </button>

              <div className="section-heading books-title">
                <div>
                  <span className="eyebrow">TU INVESTIGACIÓN</span>
                  <h2>Investigaciones recientes</h2>
                </div>
                <button
                  className="text-link"
                  onClick={() => {
                    setSelectedSession(null);
                    setTab("sesiones");
                  }}
                >
                  Ver todo
                </button>
              </div>
              <div className="recent-sessions">
                {sessions.slice(0, 2).map((session) => (
                  <button
                    className={`recent-session ${session.accent}`}
                    key={session.id}
                    onClick={() => {
                      setSelectedSession(session);
                      setTab("sesiones");
                    }}
                  >
                    <span className="session-monogram">{session.icon}</span>
                    <strong>{session.title}</strong>
                    <small>
                      {session.sources} fuentes · {session.updated}
                    </small>
                    <span className="session-arrow">
                      <ArrowRight size={15} />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {tab === "sesiones" && !selectedSession && (
            <section className="page enter">
              <div className="sessions-heading">
                <div className="page-title">
                  <span className="eyebrow">TRABAJOS ACADÉMICOS</span>
                  <h1>Investigación</h1>
                  <p>Organiza fuentes, notas y avances de tus proyectos de investigación.</p>
                </div>
                <button
                  className="new-session"
                  aria-label="Crear un trabajo de investigación"
                  onClick={() => setSelectedSession(emptySession)}
                >
                  <Plus size={19} />
                </button>
              </div>
              <label className="session-search">
                <Search size={19} />
                <input placeholder="Buscar en tus investigaciones" />
              </label>

              <div className="session-list-heading">
                <strong>Recientes</strong>
                <span>{sessions.length} trabajos</span>
              </div>
              <div className="session-list">
                {sessions.map((session) => (
                  <button
                    className="session-card"
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className={`session-visual ${session.accent}`}>
                      <span>{session.icon}</span>
                      <Sparkles size={14} />
                    </div>
                    <div className="session-card-copy">
                      <div>
                        <strong>{session.title}</strong>
                        <MoreHorizontal size={17} />
                      </div>
                      <p>{session.description}</p>
                      <footer>
                        <span>
                          <FileText size={13} /> {session.sources} fuentes
                        </span>
                        <span>
                          <StickyNote size={13} /> {session.notes} notas
                        </span>
                        <time>{session.updated}</time>
                      </footer>
                    </div>
                  </button>
                ))}
              </div>
              <button
                className="create-session-card"
                onClick={() => setSelectedSession(emptySession)}
              >
                <span>
                  <Plus size={20} />
                </span>
                <div>
                  <strong>Nuevo trabajo de investigación</strong>
                  <small>Añade fuentes académicas, PDF, EPUB o un registro OPDS</small>
                </div>
                <ArrowRight size={18} />
              </button>
            </section>
          )}

          {tab === "sesiones" && selectedSession && (
            <section className="session-detail enter">
              <div className="session-detail-head">
                <button
                  onClick={() => setSelectedSession(null)}
                  aria-label="Volver a las investigaciones"
                >
                  <ArrowLeft size={20} />
                </button>
                <span>TRABAJO DE INVESTIGACIÓN</span>
                <button aria-label="Más opciones">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="session-hero">
                <div className={`session-visual ${selectedSession.accent}`}>
                  <span>{selectedSession.icon}</span>
                  <Sparkles size={15} />
                </div>
                <h1>{selectedSession.title}</h1>
                <p>{selectedSession.description}</p>
                <div>
                  <span>
                    <FileText size={14} /> {selectedSession.sources} fuentes
                  </span>
                  <span>
                    <StickyNote size={14} /> {selectedSession.notes} notas
                  </span>
                </div>
              </div>
              <div className="session-actions">
                <button
                  onClick={() => {
                    setSubmittedQuery("Resume los avances de este trabajo de investigación");
                    setTab("asistente");
                  }}
                >
                  <Sparkles size={18} />
                  <span>
                    <strong>Conversar</strong>
                    <small>Pregunta a tus fuentes</small>
                  </span>
                  <ArrowRight size={16} />
                </button>
                <button>
                  <Plus size={18} />
                  <span>
                    <strong>Añadir fuente</strong>
                    <small>PDF, EPUB, web u OPDS</small>
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="session-section-title">
                <strong>Fuentes</strong>
                <button>Ver todas</button>
              </div>
              <div className="session-sources">
                {books
                  .filter((book) => selectedSession.sourceIds.includes(book.id))
                  .map((book) => (
                    <button key={book.id} onClick={() => setSelectedBook(book)}>
                      <MiniCover book={book} />
                      <span>
                        <strong>{book.title}</strong>
                        <small>{book.author}</small>
                        <em>{book.format}</em>
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                {selectedSession.sourceIds.length === 0 && (
                  <button className="empty-source">
                    <Plus size={18} />
                    <span>
                      <strong>Añade tu primera fuente</strong>
                      <small>Selecciona un libro, archivo o enlace</small>
                    </span>
                  </button>
                )}
              </div>
              <div className="session-section-title">
                <strong>Notas destacadas</strong>
                <button>Nueva nota</button>
              </div>
              <div className="session-note">
                <Highlighter size={17} />
                <p>{selectedSession.note}</p>
                <small>Editado {selectedSession.updated.toLowerCase()}</small>
              </div>
            </section>
          )}

          {tab === "biblioteca" && (
            <section className="page enter">
              <div className="page-title">
                <span className="eyebrow">TU ESPACIO</span>
                <h1>Mi biblioteca</h1>
                <p>Lecturas, notas y documentos en un solo lugar.</p>
              </div>
              <div className="stats-row">
                <div>
                  <strong>12</strong>
                  <span>Libros</span>
                </div>
                <div>
                  <strong>28</strong>
                  <span>Notas</span>
                </div>
                <div>
                  <strong>7h</strong>
                  <span>Lectura</span>
                </div>
              </div>
              <div className="library-tabs">
                <button className="active">En curso</button>
                <button>Guardados</button>
                <button>Terminados</button>
              </div>
              <div className="library-list">
                {books.slice(0, 3).map((book, index) => (
                  <button key={book.id} onClick={() => setSelectedBook(book)}>
                    <MiniCover book={book} />
                    <div>
                      <span className="format-pill">{book.format}</span>
                      <strong>{book.title}</strong>
                      <small>{book.author}</small>
                      <div className="progress">
                        <span style={{ width: `${[68, 32, 15][index]}%` }} />
                      </div>
                    </div>
                    <MoreHorizontal size={18} />
                  </button>
                ))}
              </div>
            </section>
          )}

          {tab === "asistente" && (
            <section className="assistant-page enter">
              <div className="assistant-head">
                <span className="ai-orb large">
                  <Sparkles size={21} />
                </span>
                <div>
                  <h1>Asistente IA</h1>
                  <p>Investigación guiada por la ética académica</p>
                </div>
                <button className="icon-button" aria-label="Ajustes">
                  <Settings2 size={19} />
                </button>
              </div>

              {!submittedQuery ? (
                <div className="assistant-empty">
                  <span>
                    <TextQuote size={29} />
                  </span>
                  <h2>Investiga con tu biblioteca</h2>
                  <p>
                    Haz preguntas, compara ideas y encuentra respuestas respaldadas por tus libros
                    y por criterios de ética académica.
                  </p>
                  <div>
                    {suggestions.map((item) => (
                      <button key={item} onClick={() => setSubmittedQuery(item)}>
                        {item}
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="conversation">
                  <div className="user-message">{submittedQuery}</div>
                  <div className="ai-message">
                    <div className="answer-label">
                      <Sparkles size={15} /> RESPUESTA
                    </div>
                    <p>
                      La literatura sobre ética de la IA en la educación superior coincide en que
                      estas herramientas pueden apoyar la revisión bibliográfica y la organización
                      de ideas, pero no sustituyen el juicio del investigador. La{" "}
                      <strong>transparencia</strong> sobre su uso y la verificación de las fuentes
                      son criterios centrales.{" "}
                      <button className="citation" onClick={() => setSourceOpen(true)}>
                        1
                      </button>
                    </p>
                    <p>
                      Los estudios también advierten sobre sesgos en los modelos y la necesidad de
                      declarar su uso en trabajos de grado. La integridad académica exige que la
                      autoría, la interpretación y las citas sean responsabilidad del estudiante.{" "}
                      <button className="citation" onClick={() => setSourceOpen(true)}>
                        2
                      </button>
                    </p>
                    <div className="source-strip">
                      <button onClick={() => setSourceOpen(true)}>
                        <MiniCover book={books[0]} />
                        <span>
                          <small>FUENTE 1</small>
                          <strong>{books[0].title}</strong>
                          <em>Cap. 3 · pág. 48</em>
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
                </div>
              )}
              <form className="assistant-composer" onSubmit={askAssistant}>
                <button type="button" aria-label="Adjuntar fuente">
                  <BookOpen size={19} />
                </button>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pregunta sobre tus fuentes..."
                />
                <button type="submit" className="composer-send" aria-label="Enviar">
                  <Send size={17} />
                </button>
              </form>
            </section>
          )}
        </div>

        <nav className="bottom-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${tab === item.id ? "active" : ""} ${item.special ? "special" : ""}`}
              onClick={() => {
                if (item.id === "perfil") return;
                if (item.id === "sesiones") setSelectedSession(null);
                setTab(item.id);
              }}
            >
              <span>
                <item.icon size={item.special ? 21 : 20} />
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {selectedBook && (
          <div className="modal-backdrop" onClick={() => setSelectedBook(null)}>
            <section className="reader-modal" onClick={(event) => event.stopPropagation()}>
              <div className="reader-toolbar">
                <button onClick={() => setSelectedBook(null)} aria-label="Cerrar lector">
                  <ArrowLeft size={20} />
                </button>
                <span>{selectedBook.format} · CAPÍTULO 3</span>
                <button aria-label="Más opciones">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <article className="reader-content">
                <span className="chapter-number">03</span>
                <h1>Ética y responsabilidad en la investigación</h1>
                <p className="lead">
                  El uso de la inteligencia artificial en la academia exige transparencia,
                  verificación y responsabilidad sobre las fuentes.
                </p>
                <p>
                  La IA puede acelerar la revisión bibliográfica y la organización de ideas, pero no
                  reemplaza el juicio del investigador ni la lectura crítica de las fuentes.
                </p>
                <p className="highlighted">
                  Declarar el uso de herramientas de IA y verificar cada cita es parte de la
                  integridad académica.
                </p>
                <p>
                  La biblioteca universitaria acompaña estos procesos con formación en
                  alfabetización informacional y acceso a fuentes confiables.
                </p>
              </article>
              <div className="reader-footer">
                <div className="progress">
                  <span style={{ width: "41%" }} />
                </div>
                <div>
                  <span>Página 48 de 214</span>
                  <span>41%</span>
                </div>
                <nav>
                  <button>
                    <TextQuote size={19} />
                    <small>Texto</small>
                  </button>
                  <button>
                    <Highlighter size={19} />
                    <small>Resaltar</small>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      setSubmittedQuery("¿Qué significa este fragmento?");
                      setTab("asistente");
                    }}
                  >
                    <Sparkles size={19} />
                    <small>Preguntar</small>
                  </button>
                  <button>
                    <Bookmark size={19} />
                    <small>Marcar</small>
                  </button>
                </nav>
              </div>
            </section>
          </div>
        )}

        {sourceOpen && (
          <div className="modal-backdrop source-backdrop" onClick={() => setSourceOpen(false)}>
            <section className="source-sheet" onClick={(event) => event.stopPropagation()}>
              <div className="sheet-handle" />
              <div className="source-head">
                <div>
                  <span className="eyebrow">FUENTE CITADA</span>
                  <h2>Contexto original</h2>
                </div>
                <button onClick={() => setSourceOpen(false)} aria-label="Cerrar">
                  <X size={20} />
                </button>
              </div>
              <div className="source-book">
                <MiniCover book={books[0]} />
                <div>
                  <strong>{books[0].title}</strong>
                  <span>{books[0].author}</span>
                  <small>Capítulo 3 · Página 48</small>
                </div>
              </div>
              <blockquote>
                “El uso de sistemas de inteligencia artificial en la investigación debe ser
                transparente, verificable y compatible con la responsabilidad académica del autor.”
              </blockquote>
              <button
                className="primary-button"
                onClick={() => {
                  setSourceOpen(false);
                  setSelectedBook(books[0]);
                }}
              >
                <BookOpen size={17} /> Abrir en el lector
              </button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
