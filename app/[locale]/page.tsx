import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/lib/get-dictionary";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/social-icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

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
    <div className="relative min-h-screen text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffe6c4]/45 via-[#fff6e8]/30 to-[#ffe6c4]/25 dark:from-brand/18 dark:via-brand/10 dark:to-brand/14" />

        {/* hero — centered, wide radius, softer color */}
        <div className="absolute left-1/2 top-[-4rem] size-[70rem] -translate-x-1/2 rounded-full bg-brand/30 blur-[100px] dark:bg-brand/20 sm:size-[80rem]" />
        <div className="absolute left-1/2 top-[2rem] size-[58rem] -translate-x-1/2 rounded-full bg-primary/16 blur-[100px] dark:bg-primary/14 sm:size-[68rem]" />

        {/* mid */}
        <div className="absolute left-1/2 top-[38%] size-[70rem] -translate-x-1/2 rounded-full bg-brand/26 blur-[100px] dark:bg-brand/16 sm:size-[80rem]" />
        <div className="absolute left-1/2 top-[44%] size-[58rem] -translate-x-1/2 rounded-full bg-primary/14 blur-[100px] dark:bg-primary/12 sm:size-[68rem]" />

        {/* lower */}
        <div className="absolute left-1/2 top-[70%] size-[70rem] -translate-x-1/2 rounded-full bg-brand/24 blur-[100px] dark:bg-brand/15 sm:size-[80rem]" />
        <div className="absolute left-1/2 top-[76%] size-[58rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[100px] dark:bg-primary/10 sm:size-[68rem]" />

        <div className="absolute left-1/2 bottom-[-12rem] size-[64rem] -translate-x-1/2 rounded-full bg-brand/22 blur-[110px] dark:bg-brand/14 sm:size-[72rem]" />
      </div>
      <div className="relative z-10">
      <SiteHeader
        locale={locale}
        nav={dictionary.nav}
        languageLabels={dictionary.languageSwitcher}
        themeLabels={dictionary.themeToggle}
      />

      <main className="relative mx-auto max-w-5xl px-6">
        <section className="relative py-20 sm:py-28">
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="inline-flex rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-sm font-semibold tracking-wide text-brand-foreground dark:border-brand/50 dark:bg-brand/25 dark:text-brand">
              {dictionary.home.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
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
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-brand/40 hover:border-brand hover:bg-brand/10",
                )}
              >
                {dictionary.home.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t border-border/70 py-20">
          <Reveal>
            <div className="rounded-xl border border-border/60 bg-card/70 px-5 py-5 shadow-sm backdrop-blur-sm sm:px-6 dark:bg-card/50">
              <div className="mb-4 h-1 w-10 rounded-full bg-brand/70" aria-hidden />
              <div>
                <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {dictionary.about.title}
                  </h2>

                  <div>
                    <div className="space-y-4">
                      {dictionary.about.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)} className="leading-7 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {dictionary.about.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-sm text-foreground transition-colors hover:border-brand/50 hover:bg-brand/20"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-border/70 py-20">
          <Reveal>
            <div className="rounded-xl border border-border/60 bg-card/70 px-5 py-5 shadow-sm backdrop-blur-sm sm:px-6 dark:bg-card/50">
              <div className="mb-4 h-1 w-10 rounded-full bg-brand/70" aria-hidden />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {dictionary.projects.title}
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  {dictionary.projects.description}
                </p>
              </div>
            </div>
          </Reveal>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {dictionary.projects.projects.map((project, index) => (
              <li key={project.title}>
                <Reveal delayMs={index * 80}>
                  <ProjectCard project={project} priority={index < 2} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="scroll-mt-24 py-20">
          <Reveal>
            <div className="rounded-xl border border-border/60 bg-card/70 px-5 py-5 shadow-sm backdrop-blur-sm sm:px-6 dark:bg-card/50">
              <div className="mb-4 h-1 w-10 rounded-full bg-brand/70" aria-hidden />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
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
            </div>
          </Reveal>
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
    </div>
  );
}
