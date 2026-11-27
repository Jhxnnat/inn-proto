import type { Book } from "../data";

export function MiniCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div className={`book-cover ${book.cover} ${large ? "book-cover-large" : ""}`}>
      <div className="cover-mark" />
      <span>{book.author.split(" ").slice(-1)}</span>
      <strong>{book.title}</strong>
    </div>
  );
}
