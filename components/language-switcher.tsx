import { Fragment } from "react";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/lib/get-dictionary";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: Dictionary["languageSwitcher"];
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  return (
    <nav aria-label={labels.label} className="flex items-center gap-3 text-sm">
      <span className="hidden text-muted-foreground sm:inline">
        {labels.label}:
      </span>

      {locales.map((targetLocale, index) => {
        const isCurrent = targetLocale === locale;
        const className = isCurrent
          ? "font-medium text-primary"
          : "text-muted-foreground hover:text-foreground";

        return (
          <Fragment key={targetLocale}>
            {index > 0 ? <span className="text-border">|</span> : null}
            {isCurrent ? (
              <span aria-current="page" className={className}>
                {labels[targetLocale]}
              </span>
            ) : (
              <Link
                href={`/${targetLocale}`}
                prefetch={false}
                className={className}
              >
                {labels[targetLocale]}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
