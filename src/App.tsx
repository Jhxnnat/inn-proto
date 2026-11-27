import { useEffect, useState } from "react";
import { DemoSwitcher, type Device } from "./components/DemoSwitcher";
import { DemoProvider } from "./demo/DemoProvider";
import { PhoneDemo } from "./demo/PhoneDemo";
import { TabletDemo } from "./demo/TabletDemo";

const COMPACT_QUERY = "(max-width: 899px)";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function readDeviceFromHash(): Device {
  return window.location.hash === "#tablet" ? "tablet" : "phone";
}

function App() {
  const [device, setDevice] = useState<Device>(readDeviceFromHash);
  const isCompact = useMediaQuery(COMPACT_QUERY);
  const activeDevice: Device = isCompact ? "phone" : device;

  useEffect(() => {
    const syncFromHash = () => setDevice(readDeviceFromHash());
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function changeDevice(next: Device) {
    setDevice(next);
    const hash = next === "tablet" ? "#tablet" : "#movil";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }

  return (
    <main className="app-shell">
      <DemoSwitcher device={activeDevice} onChange={changeDevice} />
      <div className={`demo-stage ${activeDevice}`}>
        <DemoProvider>{activeDevice === "phone" ? <PhoneDemo /> : <TabletDemo />}</DemoProvider>
      </div>
    </main>
  );
}

export default App;
