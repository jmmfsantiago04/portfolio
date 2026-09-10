"use client";

import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/get-dictionary";

type Project = Dictionary["projects"]["projects"][number];

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
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
            className="object-cover"
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
        <div className="relative aspect-video bg-muted">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
          />
        </div>
        <DialogHeader className="gap-3 p-5">
          <DialogTitle className="text-lg">{project.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {project.longDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end border-t border-border bg-muted/40 p-4">
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