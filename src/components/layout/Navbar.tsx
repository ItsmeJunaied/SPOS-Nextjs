"use client";

import Link from "next/link";
import { Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-system", label: "Our System" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/request-demo", label: "Demo" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-4 z-40 mx-auto max-w-7xl px-5">
      <div className="flex items-center justify-between rounded-full border border-[var(--border)] bg-[var(--card)]/70 backdrop-blur-xl px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] ring-1 ring-[var(--background)]/40">
        <Link href="/" className="flex items-center gap-2 font-bold pl-2">
          <span className="size-8 rounded-full bg-[var(--primary)] grid place-items-center text-[var(--primary-foreground)] shadow-md">
            <Sparkles className="size-4" />
          </span>
          <span className="tracking-tight text-base">Salonix</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 text-sm bg-[var(--muted)]/40 rounded-full p-1 border border-[var(--border)]/50">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3.5 py-1.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="size-8 rounded-full grid place-items-center hover:bg-[var(--muted)] transition cursor-pointer text-[var(--foreground)]"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          )}
          <Link href="/login" className="text-sm px-3 py-1.5 rounded-full hover:bg-[var(--muted)] font-medium">
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="text-sm inline-flex items-center gap-1.5 pl-4 pr-1.5 py-1.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 font-semibold transition"
          >
            Get Started
            <span className="size-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] grid place-items-center">
              <Sparkles className="size-3" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
