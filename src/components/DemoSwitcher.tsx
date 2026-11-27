import { BookMarked, Smartphone, Tablet } from "lucide-react";

export type Device = "phone" | "tablet";

export function DemoSwitcher({
  device,
  onChange,
}: {
  device: Device;
  onChange: (device: Device) => void;
}) {
  return (
    <header className="demo-bar">
      <div className="demo-bar-inner">
        <div className="demo-bar-brand">
          <span className="demo-brand-icon">
            <BookMarked size={16} strokeWidth={2.2} />
          </span>
          <div>
            <strong>Biblioteca UTB</strong>
            <small>Prototipo interactivo</small>
          </div>
        </div>

        <div className="demo-switch" role="group" aria-label="Elegir demo de dispositivo">
          <button
            type="button"
            className={device === "phone" ? "active" : ""}
            aria-pressed={device === "phone"}
            onClick={() => onChange("phone")}
          >
            <Smartphone size={15} />
            Móvil
          </button>
          <button
            type="button"
            className={device === "tablet" ? "active" : ""}
            aria-pressed={device === "tablet"}
            onClick={() => onChange("tablet")}
          >
            <Tablet size={15} />
            Tablet
          </button>
        </div>

        <span className="demo-bar-spec" aria-live="polite">
          {device === "phone" ? "390 × 844" : "1024 × 768"}
        </span>
      </div>
    </header>
  );
}
