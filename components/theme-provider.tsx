"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      // React 19 warns about <script> inside client components.
      // On the client, mark it as JSON so React does not try to execute it.
      // SSR still emits a real script, which prevents a flash of the wrong theme.
      scriptProps={
        typeof window === "undefined"
          ? undefined
          : { type: "application/json" }
      }
    >
      {children}
    </NextThemesProvider>
  );
}
