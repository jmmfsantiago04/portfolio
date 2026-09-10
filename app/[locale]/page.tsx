import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/lib/get-dictionary";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/social-icons";
import { ProjectCard } from "@/components/project-card";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader
        locale={locale}
        nav={dictionary.nav}
        languageLabels={dictionary.languageSwitcher}
        themeLabels={dictionary.themeToggle}
      />

      <main className="relative mx-auto max-w-5xl px-6">
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/15 blur-3xl dark:bg-foreground/10 sm:size-[42rem]"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-primary">
              {dictionary.home.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              {dictionary.home.name}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              {dictionary.home.bio}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#projects" className={cn(buttonVariants({ size: "lg" }))}>
                {dictionary.home.ctaPrimary}
              </a>

              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {dictionary.home.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t border-border/70 py-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              {dictionary.about.title}
            </h2>

            <div>
              <p className="leading-7 text-muted-foreground">
                {dictionary.about.body}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {dictionary.about.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-primary/20 bg-accent px-3 py-1 text-sm text-accent-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-border/70 py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            {dictionary.projects.title}
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            {dictionary.projects.description}
          </p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {dictionary.projects.projects.map((project, index) => (
              <li key={project.title}>
                <ProjectCard project={project} priority={index < 2} />
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="scroll-mt-24 py-20">
          <div className="rounded-2xl border border-primary/25 bg-card p-8 text-card-foreground shadow-sm sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              {dictionary.contact.title}
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              {dictionary.contact.body}
            </p>

            <p className="mt-6">
              <span className="text-sm text-muted-foreground">
                {dictionary.contact.emailLabel}:{" "}
              </span>
              <a
                href={`mailto:${dictionary.contact.email}`}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {dictionary.contact.email}
              </a>
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={dictionary.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dictionary.contact.githubLabel}
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <GithubIcon />
              </a>

              <a
                href={dictionary.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dictionary.contact.linkedinLabel}
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-5xl px-6 py-8 text-sm text-muted-foreground">
          <p>
            {dictionary.home.name} · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
