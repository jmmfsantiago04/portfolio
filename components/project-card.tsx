"use client";

import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
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
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/get-dictionary";

type Project = Dictionary["projects"]["projects"][number];

function getSlides(project: Project) {
  const gallery = "gallery" in project ? project.gallery : undefined;

  if (gallery && gallery.length > 0) {
    return gallery;
  }

  return [{ src: project.image, alt: project.imageAlt }];
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const slides = getSlides(project);
  const liveUrl = "liveUrl" in project ? project.liveUrl : undefined;
  const liveLabel = "liveLabel" in project ? project.liveLabel : undefined;
  const hasCarousel = slides.length > 1;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        }
      >
        <span className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top"
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

      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <Carousel
          opts={{ loop: hasCarousel, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.src} className="pl-0">
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover object-top"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {hasCarousel ? (
            <>
              <CarouselPrevious className="left-3 border-border bg-background/90 shadow-sm" />
              <CarouselNext className="right-3 border-border bg-background/90 shadow-sm" />
            </>
          ) : null}
        </Carousel>
        <DialogHeader className="gap-3 p-5">
          <DialogTitle className="text-lg">{project.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {project.longDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap justify-end gap-2 border-t border-border bg-muted/40 p-4">
          {liveUrl && liveLabel ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <ExternalLinkIcon />
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
  );
}
