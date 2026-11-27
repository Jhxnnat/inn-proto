import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Bookmark,
  FileText,
  Highlighter,
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

const FRAME_WIDTH = 1056;
const FRAME_HEIGHT = 800;
const libraryProgress = [68, 32, 15, 54, 20];

function useFitScale(width: number, height: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const next = Math.min(1, element.clientWidth / width, element.clientHeight / height);
      setScale(next > 0 ? next : 1);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width, height]);

  return { ref, scale };
}

export function TabletDemo() {
  const { tab, setTab, selectedBook, setSelectedBook, sourceOpen, setSourceOpen, openAssistant } =
    useDemo();
  const { ref: slotRef, scale } = useFitScale(FRAME_WIDTH, FRAME_HEIGHT);
  const screenRef = useRef<HTMLElement>(null);

  useEffect(() => {
    screenRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <div className="tablet-stage">
      <div className="tablet-slot" ref={slotRef}>
        <div
          className="tablet-frame"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <span className="tablet-camera" aria-hidden="true" />
          <div className="tablet-app">
            <aside className="tablet-sidebar">
              <button
                className="tablet-brand"
                onClick={() => setTab("inicio")}
                aria-label="Ir al inicio"
              >
                <span className="brand-icon">
                  <BookMarked size={18} strokeWidth={2.2} />
                </span>
                <span>
                  <strong>Biblioteca UTB</strong>
                  <small>Universidad Tecnológica</small>
                </span>
              </button>

              <div className="tablet-nav-wrap">
                <span className="tablet-menu-label">MENÚ</span>
                <nav className="tablet-nav" aria-label="Navegación principal">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      className={`${tab === item.id ? "active" : ""} ${
                        item.special ? "special" : ""
                      }`}
                      onClick={() => {
                        if (item.id === "perfil") return;
                        setTab(item.id);
                      }}
                    >
                      <span className="nav-icon">
                        <item.icon size={18} />
                      </span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="tablet-sidebar-goal">
                <span className="eyebrow">META SEMANAL</span>
                <div className="t-goal-row">
                  <strong>7h</strong>
                  <span>de 10h de lectura</span>
                </div>
                <div className="progress">
                  <span style={{ width: "70%" }} />
                </div>
                <small>Te faltan 3 horas para completar tu meta.</small>
              </div>

              <div className="tablet-sidebar-foot">
                <div className="tablet-sidebar-note">
                  <Sparkles size={14} />
                  <span>Respuestas con fuentes verificables y criterio ético.</span>
                </div>
                <div className="tablet-user">
                  <span className="avatar">LM</span>
                  <div>
                    <strong>Laura Martínez</strong>
                    <small>Estudiante · UTB</small>
                  </div>
                </div>
              </div>
            </aside>

            <div className="tablet-main">
              <header className="tablet-topbar">
                <label className="tablet-search">
                  <Search size={17} />
                  <input
                    placeholder="Buscar en la biblioteca..."
                    aria-label="Buscar en la biblioteca"
                  />
                </label>
                <div className="tablet-topbar-actions">
                  <button className="icon-button" aria-label="Ajustes">
                    <Settings2 size={18} />
                  </button>
                  <button className="avatar" aria-label="Abrir perfil">
                    LM
                  </button>
                </div>
              </header>

              <main
                className={`tablet-screen ${
                  tab === "sesiones" || tab === "asistente" ? "is-fixed" : ""
                }`}
                ref={screenRef}
              >
                {tab === "inicio" && <TabletHome />}
                {tab === "sesiones" && <TabletResearch />}
                {tab === "biblioteca" && <TabletLibrary />}
                {tab === "asistente" && <TabletAssistant />}
              </main>
            </div>

            {selectedBook && (
              <div className="modal-backdrop t-backdrop" onClick={() => setSelectedBook(null)}>
                <section
                  className="t-reader"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Leyendo ${selectedBook.title}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="t-reader-main">
                    <div className="reader-toolbar t-reader-toolbar">
                      <button onClick={() => setSelectedBook(null)} aria-label="Cerrar lector">
                        <ArrowLeft size={20} />
                      </button>
                      <span>{selectedBook.format} · CAPÍTULO 3</span>
                      <button aria-label="Más opciones">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    <article className="reader-content t-reader-content">
                      <ReaderArticle />
                    </article>
                    <div className="t-reader-footer">
                      <div className="progress">
                        <span style={{ width: "41%" }} />
                      </div>
                      <div>
                        <span>Página 48 de 214</span>
                        <span>41%</span>
                      </div>
                    </div>
                  </div>

                  <aside className="t-reader-rail">
                    <div className="t-reader-book">
                      <MiniCover book={selectedBook} />
                      <div>
                        <strong>{selectedBook.title}</strong>
                        <span>{selectedBook.author}</span>
                        <small>{selectedBook.format} · Capítulo 3 de 9</small>
                      </div>
                    </div>
                    <div className="t-reader-actions">
                      <button className="active">
                        <TextQuote size={18} />
                        <small>Texto</small>
                      </button>
                      <button>
                        <Highlighter size={18} />
                        <small>Resaltar</small>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBook(null);
                          openAssistant("¿Qué significa este fragmento?");
                        }}
                      >
                        <Sparkles size={18} />
                        <small>Preguntar</small>
                      </button>
                      <button>
                        <Bookmark size={18} />
                        <small>Marcar</small>
                      </button>
                    </div>
                    <div className="t-reader-note">
                      <span className="eyebrow">NOTA DESTACADA</span>
                      <p>
                        Declarar el uso de herramientas de IA y verificar cada cita es parte de la
                        integridad académica.
                      </p>
                      <small>Subrayado en la página {citation.page}</small>
                    </div>
                    <button
                      className="primary-button t-reader-cta"
                      onClick={() => {
                        setSelectedBook(null);
                        openAssistant("¿Qué significa este fragmento?");
                      }}
                    >
                      <Sparkles size={17} /> Preguntar sobre este capítulo
                    </button>
                  </aside>
                </section>
              </div>
            )}

            {sourceOpen && (
              <div className="modal-backdrop t-backdrop" onClick={() => setSourceOpen(false)}>
                <section
                  className="t-source-dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Contexto original de la fuente"
                  onClick={(event) => event.stopPropagation()}
                >
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
      </div>
    </div>
  );
}

function TabletHome() {
  const { query, setQuery, askAssistant, setSelectedBook, setSelectedSession, setTab } = useDemo();

  return (
    <section className="t-page enter">
      <div className="page-title t-page-title">
        <span className="eyebrow">BIBLIOTECA UTB</span>
        <h1>Inicio</h1>
        <p>Tu lectura y tu investigación, en un solo lugar.</p>
      </div>

      <form className="ask-card t-ask" onSubmit={askAssistant}>
        <div className="ask-heading">
          <span className="ai-orb">
            <Sparkles size={17} />
          </span>
          <div>
            <strong>Asistente de investigación</strong>
          </div>
        </div>
        <div className="ask-input-wrap">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pregunta, compara o investiga..."
            aria-label="Pregunta al asistente"
          />
          <button type="submit" className="send-button" aria-label="Enviar pregunta">
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="suggestions">
          {suggestions.map((item) => (
            <button key={item} type="button" onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>
      </form>

      <div className="t-home-grid">
        <div className="t-home-main">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TU LECTURA</span>
              <h2>Continúa donde lo dejaste</h2>
            </div>
            <button aria-label="Más opciones">
              <MoreHorizontal size={21} />
            </button>
          </div>

          <button className="continue-card t-continue" onClick={() => setSelectedBook(books[0])}>
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

          <div className="section-heading">
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
          <div className="recent-sessions t-recent">
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
        </div>

        <aside className="t-rail">
          <section className="t-rail-card">
            <span className="eyebrow">TU ACTIVIDAD</span>
            <div className="stats-row t-stats">
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
          </section>

          <section className="t-rail-card">
            <div className="t-rail-head">
              <span className="eyebrow">RECOMENDADO</span>
              <button className="text-link" onClick={() => setTab("biblioteca")}>
                Ver todo
              </button>
            </div>
            <div className="t-rail-books">
              {books.slice(3, 5).map((book) => (
                <button key={book.id} onClick={() => setSelectedBook(book)}>
                  <MiniCover book={book} />
                  <strong>{book.title}</strong>
                  <small>{book.author}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="t-rail-card t-rail-quote">
            <span className="ai-orb">
              <Sparkles size={16} />
            </span>
            <p>La ética académica comienza por citar y verificar tus fuentes.</p>
          </section>
        </aside>
      </div>
    </section>
  );
}

function TabletResearch() {
  const { selectedSession, setSelectedSession, setSelectedBook, openAssistant } = useDemo();
  const activeSession = selectedSession ?? sessions[0];
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0 });
  }, [activeSession.id]);

  return (
    <section className="t-research enter">
      <aside className="t-research-list">
        <div className="t-research-list-head">
          <div className="page-title">
            <span className="eyebrow">TRABAJOS ACADÉMICOS</span>
            <h1>Investigación</h1>
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
          <Search size={18} />
          <input placeholder="Buscar en tus investigaciones" />
        </label>

        <div className="t-research-meta">
          <strong>Recientes</strong>
          <span>{sessions.length} trabajos</span>
        </div>

        <div className="t-session-scroll">
          <div className="t-session-items">
            {sessions.map((session) => (
              <button
                key={session.id}
                className={`t-session-item ${activeSession.id === session.id ? "active" : ""}`}
                onClick={() => setSelectedSession(session)}
              >
                <span className={`t-session-avatar ${session.accent}`}>{session.icon}</span>
                <span className="t-session-copy">
                  <strong>{session.title}</strong>
                  <small>
                    {session.sources} fuentes · {session.updated}
                  </small>
                </span>
              </button>
            ))}
            <button
              className={`t-session-item t-session-new ${
                activeSession.id === emptySession.id ? "active" : ""
              }`}
              onClick={() => setSelectedSession(emptySession)}
            >
              <span className="t-session-avatar">
                <Plus size={16} />
              </span>
              <span className="t-session-copy">
                <strong>Nuevo trabajo de investigación</strong>
                <small>Fuentes, notas y avances</small>
              </span>
            </button>
          </div>
        </div>
      </aside>

      <div className="t-research-detail" ref={detailRef}>
        <div className="t-detail-top">
          <span>TRABAJO DE INVESTIGACIÓN</span>
          <button aria-label="Más opciones">
            <MoreHorizontal size={19} />
          </button>
        </div>

        <div className="t-detail-body">
          <div className="t-detail-hero">
            <SessionVisual session={activeSession} className="t-detail-visual" sparkleSize={15} />
            <div className="t-detail-title">
              <h2>{activeSession.title}</h2>
              <p>{activeSession.description}</p>
              <div className="t-detail-meta">
                <span>
                  <FileText size={14} /> {activeSession.sources} fuentes
                </span>
                <span>
                  <StickyNote size={14} /> {activeSession.notes} notas
                </span>
                <span className="t-detail-updated">
                  Actualizado {activeSession.updated.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="t-detail-actions">
            <button
              className="t-detail-primary"
              onClick={() => openAssistant("Resume los avances de este trabajo de investigación")}
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

          <div className="t-detail-section">
            <div className="session-section-title">
              <strong>Fuentes</strong>
              <button>Ver todas</button>
            </div>
            <div className="session-sources t-detail-sources">
              {books
                .filter((book) => activeSession.sourceIds.includes(book.id))
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
              {activeSession.sourceIds.length === 0 && (
                <button className="empty-source">
                  <Plus size={18} />
                  <span>
                    <strong>Añade tu primera fuente</strong>
                    <small>Selecciona un libro, archivo o enlace</small>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="t-detail-section">
            <div className="session-section-title">
              <strong>Notas destacadas</strong>
              <button>Nueva nota</button>
            </div>
            <div className="session-note">
              <Highlighter size={17} />
              <p>{activeSession.note}</p>
              <small>Editado {activeSession.updated.toLowerCase()}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabletLibrary() {
  const { setSelectedBook } = useDemo();

  return (
    <section className="t-page t-library enter">
      <div className="t-library-head">
        <div className="page-title">
          <span className="eyebrow">TU ESPACIO</span>
          <h1>Mi biblioteca</h1>
          <p>Lecturas, notas y documentos en un solo lugar.</p>
        </div>
        <div className="t-library-meta">
          <span>
            <strong>12</strong> libros
          </span>
          <span>
            <strong>28</strong> notas
          </span>
          <span>
            <strong>7h</strong> lectura
          </span>
        </div>
      </div>

      <div className="library-tabs t-library-tabs">
        <button className="active">En curso</button>
        <button>Guardados</button>
        <button>Terminados</button>
      </div>

      <div className="t-library-grid">
        {books.map((book, index) => (
          <button key={book.id} className="t-library-book" onClick={() => setSelectedBook(book)}>
            <MiniCover book={book} />
            <div className="t-library-book-info">
              <span className="format-pill">{book.format}</span>
              <strong>{book.title}</strong>
              <small>{book.author}</small>
              <div className="progress">
                <span style={{ width: `${libraryProgress[index]}%` }} />
              </div>
            </div>
          </button>
        ))}
        <button className="t-library-add">
          <span>
            <Plus size={20} />
          </span>
          <strong>Importar catálogo OPDS</strong>
          <small>Añade una biblioteca externa</small>
        </button>
      </div>
    </section>
  );
}

function TabletAssistant() {
  const {
    query,
    setQuery,
    askAssistant,
    submittedQuery,
    openAssistant,
    setSourceOpen,
    setSelectedBook,
    setSelectedSession,
    setTab,
  } = useDemo();

  return (
    <section className="t-assistant enter">
      <div className="t-assistant-main">
        <div className="t-assistant-head">
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

        <div className="t-assistant-scroll">
          {!submittedQuery ? (
            <div className="assistant-empty t-assistant-empty">
              <span>
                <TextQuote size={29} />
              </span>
              <h2>Investiga con tu biblioteca</h2>
              <p>
                Haz preguntas, compara ideas y encuentra respuestas respaldadas por tus libros y por
                criterios de ética académica.
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
            <AssistantThread className="t-conversation" onOpenSource={() => setSourceOpen(true)} />
          )}
        </div>

        <form className="t-composer" onSubmit={askAssistant}>
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
      </div>

      <aside className="t-assistant-side">
        <span className="eyebrow">CONTEXTO</span>
        <h2>Fuentes de la respuesta</h2>
        <p className="t-side-intro">
          Cada respuesta se apoya en tu biblioteca. Abre una fuente para revisar el contexto
          original.
        </p>

        <div className="t-side-sources">
          {books.slice(0, 2).map((book, index) => (
            <button
              key={book.id}
              onClick={() => {
                if (index === 0) setSourceOpen(true);
                else setSelectedBook(book);
              }}
            >
              <MiniCover book={book} />
              <span>
                <small>
                  {index === 0
                    ? `CAP. ${citation.chapter} · PÁG. ${citation.page}`
                    : "APOYO METODOLÓGICO"}
                </small>
                <strong>{book.title}</strong>
                <em>{book.author}</em>
              </span>
            </button>
          ))}
        </div>

        <div className="t-ethics">
          <span className="ai-orb">
            <Sparkles size={15} />
          </span>
          <div>
            <strong>Ética académica</strong>
            <p>
              Las respuestas son apoyo a tu investigación: verifica siempre las citas y declara el
              uso de IA.
            </p>
          </div>
        </div>

        <div className="t-side-session">
          <span className="eyebrow">SESIÓN VINCULADA</span>
          <button
            onClick={() => {
              setSelectedSession(sessions[0]);
              setTab("sesiones");
            }}
          >
            <span className="t-side-session-icon">IA</span>
            <span>
              <strong>{sessions[0].title}</strong>
              <small>
                {sessions[0].sources} fuentes · {sessions[0].notes} notas
              </small>
            </span>
            <ArrowRight size={15} />
          </button>
        </div>
      </aside>
    </section>
  );
}
