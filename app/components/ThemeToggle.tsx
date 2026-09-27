import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "./icons";

type Theme = "light" | "dark";

const THEME_KEY = "kc-theme";
const THEME_COLORS: Record<Theme, string> = {
  light: "#f6f1ee",
  dark: "#0a0708",
};

function hasExplicitChoice(): boolean {
  try {
    const s = localStorage.getItem(THEME_KEY);
    return s === "light" || s === "dark";
  } catch {
    return false;
  }
}

function current(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function apply(theme: Theme) {
  const html = document.documentElement;
  // Enable the contained color transition only for the flip, then remove it
  html.classList.add("theme-anim");
  html.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  window.setTimeout(() => html.classList.remove("theme-anim"), 600);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync with whatever the no-flash script already set on the html element,
  // then live-follow the OS scheme until the user makes an explicit choice.
  useEffect(() => {
    setTheme(current());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (hasExplicitChoice()) return;
      const next: Theme = e.matches ? "dark" : "light";
      const html = document.documentElement;
      html.classList.add("theme-anim");
      html.setAttribute("data-theme", next);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", THEME_COLORS[next]);
      window.setTimeout(() => html.classList.remove("theme-anim"), 600);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={`press group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-bone hover:border-red md:h-9 md:w-9 ${className}`}
    >
      <span className="relative h-4 w-4">
        <IconSun
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <IconMoon
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
