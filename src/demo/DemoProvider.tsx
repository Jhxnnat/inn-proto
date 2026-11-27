import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import type { Book, Session, Tab } from "../data";

type DemoContextValue = {
  tab: Tab;
  setTab: (tab: Tab) => void;
  query: string;
  setQuery: (query: string) => void;
  submittedQuery: string;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  selectedSession: Session | null;
  setSelectedSession: (session: Session | null) => void;
  sourceOpen: boolean;
  setSourceOpen: (open: boolean) => void;
  saved: boolean;
  setSaved: (saved: boolean) => void;
  askAssistant: (event: FormEvent<HTMLFormElement>) => void;
  openAssistant: (question: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<Tab>("inicio");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function askAssistant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    setSubmittedQuery(query.trim());
    setTab("asistente");
    setQuery("");
  }

  function openAssistant(question: string) {
    setSubmittedQuery(question);
    setQuery("");
    setTab("asistente");
  }

  return (
    <DemoContext.Provider
      value={{
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
        saved,
        setSaved,
        askAssistant,
        openAssistant,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside a DemoProvider");
  return context;
}
