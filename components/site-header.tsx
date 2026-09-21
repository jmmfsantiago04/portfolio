"use client";

import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/lib/get-dictionary";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  languageLabels: Dictionary["languageSwitcher"];
  themeLabels: Dictionary["themeToggle"];
};

export function SiteHeader({
  locale,
  nav,
  languageLabels,
  themeLabels,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: nav.about },
    { href: "#projects", label: nav.projects },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/75 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/50 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-3">
        <div className="flex min-w-0 items-center gap-6">
          <a
            href={`/${locale}`}
            className="shrink-0 font-semibold tracking-tight text-foreground"
          >
            {nav.home}
          </a>

          <nav aria-label={nav.label} className="flex items-center gap-4 text-sm">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} labels={languageLabels} />
          <ThemeToggle labels={themeLabels} />
        </div>
      </div>
    </header>
  );
}
