import { CircleUserRound, Home, Library, MessageCircleQuestion, PanelsTopLeft } from "lucide-react";

export type Tab = "inicio" | "sesiones" | "biblioteca" | "asistente";
export type NavItem = {
  id: Tab | "perfil";
  label: string;
  icon: typeof Home;
  special?: boolean;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  format: "EPUB" | "PDF";
  progress?: number;
  category: string;
};

export type Session = {
  id: number;
  title: string;
  description: string;
  sources: number;
  notes: number;
  updated: string;
  accent: string;
  icon: string;
  sourceIds: number[];
  note: string;
};

export const books: Book[] = [
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

export const suggestions = [
  "¿Qué dice la bibliografía sobre ética en IA?",
  "Resume las notas de mi tesis",
  "Compara dos artículos de investigación",
];

export const sessions: Session[] = [
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
    description: "Archivo, metadatos y preservación de colecciones históricas de la universidad.",
    sources: 9,
    notes: 15,
    updated: "8 jun",
    accent: "session-teal",
    icon: "PD",
    sourceIds: [3, 4],
    note: "Digitalizar no es preservar: se necesitan metadatos, derechos de uso y un plan de conservación a largo plazo.",
  },
];

export const emptySession: Session = {
  id: 4,
  title: "Nuevo trabajo de investigación",
  description: "Organiza fuentes, notas y avances de tu proyecto académico.",
  sources: 0,
  notes: 0,
  updated: "Ahora",
  accent: "session-cyan",
  icon: "TI",
  sourceIds: [],
  note: "Aún no hay notas destacadas. Añade una fuente para comenzar tu investigación.",
};

export const navItems: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "sesiones", label: "Investigación", icon: PanelsTopLeft },
  { id: "asistente", label: "Preguntar", icon: MessageCircleQuestion, special: true },
  { id: "biblioteca", label: "Biblioteca", icon: Library },
  { id: "perfil", label: "Perfil", icon: CircleUserRound },
];

export const citation = {
  page: 48,
  chapter: 3,
  quote:
    "El uso de sistemas de inteligencia artificial en la investigación debe ser transparente, verificable y compatible con la responsabilidad académica del autor.",
};
