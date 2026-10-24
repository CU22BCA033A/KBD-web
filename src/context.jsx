import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate, store, makeTime } from "./lib.js";

const Ctx = createContext(null);

export function SiteProvider({ children }) {
  const root = document.documentElement;
  const [lang, setLangState] = useState(root.getAttribute("data-lang") === "kn" ? "kn" : "en");
  const [theme, setThemeState] = useState(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
  const [consent, setConsentState] = useState(store("sgk-consent"));
  const [cookieOpen, setCookieOpen] = useState(() => { const c = store("sgk-consent"); return c !== "yes" && c !== "no"; });
  const [tick, setTick] = useState(0);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);
  const time = useMemo(() => makeTime(t, lang), [t, lang, tick]); // eslint-disable-line

  useEffect(() => { root.lang = lang; root.setAttribute("data-lang", lang); }, [lang]); // eslint-disable-line
  useEffect(() => { root.setAttribute("data-theme", theme); }, [theme]); // eslint-disable-line
  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 60000);
    const vis = () => { if (!document.hidden) setTick((x) => x + 1); };
    document.addEventListener("visibilitychange", vis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const value = {
    lang, t, time,
    setLang: (l) => { setLangState(l); store("sgk-lang", l); },
    theme, toggleTheme: () => setThemeState((th) => { const n = th === "dark" ? "light" : "dark"; store("sgk-theme", n); return n; }),
    consent, cookieOpen, setCookieOpen,
    setConsent: (v) => { store("sgk-consent", v); setConsentState(v); setCookieOpen(false); }
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useSite = () => useContext(Ctx);
