import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STRINGS, SERVER_FR, type Lang, type StringKey } from "./strings";
import { CARDS_FR } from "./cards.fr";

export type { Lang, StringKey };

const STORAGE_KEY = "lsu_lang";
const LANGS: Lang[] = ["en", "fr"];

/** Language for this browser: ?lang=fr in the address wins, then the saved choice, then English. */
function detectLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
    if (fromUrl && (LANGS as string[]).includes(fromUrl)) return fromUrl as Lang;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  } catch {
    /* storage or URL not available */
  }
  return "en";
}

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Interface text by key, with {placeholders} filled in. */
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  /** A card's display text — the server always deals the English value. */
  tCard: (englishValue: string) => string;
  /** An error message the server sent in English. */
  tServer: (message: string) => string;
}

const Ctx = createContext<I18n | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  // Keep the tab title, description and <html lang> in the chosen language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = STRINGS[lang]["app.title"];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", STRINGS[lang]["app.metaDesc"]);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo<I18n>(() => ({
    lang,
    setLang,
    t: (key, vars) => {
      let s = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
      return s;
    },
    tCard: (v) => (lang === "fr" ? CARDS_FR[v] ?? v : v),
    tServer: (m) => (lang === "fr" ? SERVER_FR[m.replace(/’/g, "'")] ?? m : m),
  }), [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <LangProvider>");
  return ctx;
}

/** EN | FR switch — same link, the viewer picks their language. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("lang.label")}
      className={`inline-flex items-center rounded-md border bg-card text-xs font-semibold overflow-hidden ${className}`}>
      {LANGS.map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          data-testid={`lang-${l}`}
          className={`px-2.5 py-1.5 uppercase tracking-wide transition-colors ${
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}>
          {l}
        </button>
      ))}
    </div>
  );
}
