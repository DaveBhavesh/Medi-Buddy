import { useEffect, useState } from "react";

const KEY = "pmc-lang";

/**
 * English / Marathi selector. Remembers the choice and sets <html lang>. (Page copy is not
 * translated yet — this switches the language flag, ready for translated content.)
 */
export default function LanguageSelector({ label, options }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(KEY) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* storage unavailable: choice just isn't remembered */
    }
  }, [lang]);

  return (
    <div role="group" aria-label={label}>
      <h3 className="font-black text-white">{label}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.code}
            type="button"
            lang={o.code}
            aria-pressed={lang === o.code}
            onClick={() => setLang(o.code)}
            className={`min-h-10 rounded-full border px-4 text-sm font-bold transition-colors ${
              lang === o.code
                ? "border-amber-400 bg-amber-400 text-black"
                : "border-white/25 text-white hover:border-white/60"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
