import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Bookmark,
  FileText,
  Highlighter,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  StickyNote,
  TextQuote,
  X,
} from "lucide-react";
import { AssistantThread } from "../components/AssistantThread";
import { MiniCover } from "../components/MiniCover";
import { ReaderArticle } from "../components/ReaderArticle";
import { SessionVisual } from "../components/SessionVisual";
import { books, citation, emptySession, navItems, sessions, suggestions } from "../data";
import { useDemo } from "./DemoProvider";

export function PhoneDemo() {
  const {
    tab,
    setTab,
    query,
    setQuery,
    submittedQuery,
    selectedBook,
    setSelectedBook,
    selectedSession,
    setSelectedSession,
    sourceOpen,
    setSourceOpen,
    askAssistant,
    openAssistant,
  } = useDemo();
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    screenRef.current?.scrollTo({ top: 0 });
  }, [tab, selectedSession]);

  return (
    <div className="phone-frame">
      <span className="phone-camera" aria-hidden="true" />
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

        <div className="screen" ref={screenRef}>
          {tab === "inicio" && (
            <section className="page enter">
              <form className="ask-card" onSubmit={askAssistant}>
                <div className="ask-heading">
                  <span className="ai-orb">
                    <Sparkles size={17} />
                  </span>
                  <div>
                    <strong>Asistente de Investigación Primo</strong>
                  </div>
                </div>
                <div className="ask-input-wrap">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Pregunta, compara o investiga..."
                    aria-label="Pregunta al Asistente de Investigación Primo"
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
                    <SessionVisual session={session} />
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
                <SessionVisual session={selectedSession} sparkleSize={15} />
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
                  onClick={() =>
                    openAssistant("Resume los avances de este trabajo de investigación")
                  }
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
                  <h1>Asistente de Investigación Primo</h1>
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
                    Haz preguntas, compara ideas y encuentra respuestas respaldadas por tus libros y
                    por criterios de ética académica.
                  </p>
                  <div>
                    {suggestions.map((item) => (
                      <button key={item} onClick={() => openAssistant(item)}>
                        {item}
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <AssistantThread onOpenSource={() => setSourceOpen(true)} />
              )}

              <form className="assistant-composer" onSubmit={askAssistant}>
                <button type="button" aria-label="Adjuntar fuente">
                  <BookOpen size={19} />
                </button>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pregunta sobre tus fuentes..."
                  aria-label="Preguntar sobre tus fuentes"
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
                <ReaderArticle />
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
                      openAssistant("¿Qué significa este fragmento?");
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
                  <small>
                    Capítulo {citation.chapter} · Página {citation.page}
                  </small>
                </div>
              </div>
              <blockquote>“{citation.quote}”</blockquote>
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
    </div>
  );
}
