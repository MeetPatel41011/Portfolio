"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MagneticButton } from "./MagneticButton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <MagneticButton
      as="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-emerald-400 outline-none backdrop-blur-sm transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </MagneticButton>
  );
}