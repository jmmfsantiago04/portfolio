import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/lib/get-dictionary";

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
  const links = [
    { href: "#about", label: nav.about },
    { href: "#projects", label: nav.projects },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
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
