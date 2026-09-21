"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";
import { Expand, X } from "lucide-react";
import type { Dictionary } from "@/lib/get-dictionary";

type Project = Dictionary["projects"]["projects"][number];
type GalleryShot = { src: string; alt: string };

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const gallery: GalleryShot[] =
    "gallery" in project && Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : [{ src: project.image, alt: project.imageAlt }];

  const liveUrl =
    "liveUrl" in project && typeof project.liveUrl === "string"
      ? project.liveUrl
      : undefined;

  const liveLabel =
    "liveLabel" in project && typeof project.liveLabel === "string"
      ? project.liveLabel
      : "Live site";

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!dialogOpen || gallery.length < 2) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      // Don't steal arrows from inputs/textareas
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
          return;
        }
      }

      event.preventDefault();
      event.stopPropagation();

      if (lightboxIndex !== null) {
        setLightboxIndex((index) => {
          if (index === null) return null;
          return event.key === "ArrowLeft"
            ? (index - 1 + gallery.length) % gallery.length
            : (index + 1) % gallery.length;
        });
        return;
      }

      if (!api) return;
      if (event.key === "ArrowLeft") api.scrollPrev();
      else api.scrollNext();
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [dialogOpen, lightboxIndex, gallery.length, api]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex]);

  // Keep carousel in sync when browsing inside the lightbox
  useEffect(() => {
    if (lightboxIndex === null || !api) return;
    api.scrollTo(lightboxIndex);
  }, [lightboxIndex, api]);

  const lightboxShot =
    lightboxIndex === null ? null : gallery[lightboxIndex] ?? null;

  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setLightboxIndex(null);
        }}
      >
        <DialogTrigger
          render={
            <button
              type="button"
              className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-brand/25 bg-card text-left text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-md hover:shadow-brand/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            />
          }
        >
          <span className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              priority={priority}
            />
          </span>
          <span className="flex min-h-0 flex-1 flex-col p-5">
            <span className="block text-lg font-medium">{project.title}</span>
            <span className="mt-2 block text-muted-foreground">
              {project.description}
            </span>
          </span>
        </DialogTrigger>

        <DialogContent
          className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl"
          overlayClassName="bg-black/80 backdrop-blur-sm"
        >
          <div className="border-b border-border bg-gradient-to-b from-muted/80 to-muted/30 px-4 pb-3 pt-4 sm:px-6">
            <Carousel
              setApi={setApi}
              opts={{ loop: gallery.length > 1 }}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {gallery.map((shot, index) => (
                  <CarouselItem key={shot.src} className="pl-3">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/70 bg-background shadow-sm outline-none transition hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                      aria-label={`Open larger preview: ${shot.alt}`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-contain p-1 transition duration-300 group-hover:scale-[1.01]"
                      />
                      <span className="pointer-events-none absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground opacity-0 shadow-sm ring-1 ring-border transition group-hover:opacity-100">
                        <Expand className="size-4" />
                      </span>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {gallery.length > 1 ? (
                <>
                  <CarouselPrevious className="left-1 border-border bg-background/90 shadow-sm sm:-left-3" />
                  <CarouselNext className="right-1 border-border bg-background/90 shadow-sm sm:-right-3" />
                </>
              ) : null}
            </Carousel>

            {gallery.length > 1 ? (
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {current + 1} / {gallery.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {gallery.map((shot, index) => (
                    <button
                      key={shot.src}
                      type="button"
                      aria-label={`Go to screenshot ${index + 1}`}
                      aria-current={index === current}
                      onClick={() => api?.scrollTo(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        index === current
                          ? "w-5 bg-primary"
                          : "w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/60",
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <DialogHeader className="gap-3 p-5 sm:p-6">
            <DialogTitle className="text-lg">{project.title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {project.longDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap justify-end gap-2 border-t border-border bg-muted/40 p-4 sm:p-5">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                {liveLabel}
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <GithubIcon />
              {project.linkLabel}
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {lightboxShot && typeof document !== "undefined"
        ? createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxShot.alt}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Close larger preview"
          >
            <X className="size-5" />
          </button>

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-6"
                aria-label="Previous screenshot"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (index) =>
                      index === null
                        ? null
                        : (index - 1 + gallery.length) % gallery.length,
                  );
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-6"
                aria-label="Next screenshot"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (index) =>
                      index === null ? null : (index + 1) % gallery.length,
                  );
                }}
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[min(80vh,900px)] w-full overflow-hidden rounded-xl bg-black/40 shadow-2xl ring-1 ring-white/10">
              <Image
                src={lightboxShot.src}
                alt={lightboxShot.alt}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-contain"
                priority
              />
            </div>
            <p className="max-w-3xl px-2 text-center text-sm text-white/80">
              {lightboxShot.alt}
              {gallery.length > 1 ? (
                <span className="ml-2 text-white/50">
                  {(lightboxIndex ?? 0) + 1} / {gallery.length}
                </span>
              ) : null}
            </p>
          </div>
        </div>,
        document.body,
      )
        : null}
    </>
  );
}
