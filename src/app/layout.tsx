import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { NavBar } from "~/components/ui/nav-bar";
import { GameStateProvider } from "~/context/game-state-context";

export const metadata: Metadata = {
  title: "Five Dice",
  description: "Everyone's favorite five dice game!",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${GeistSans.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <GameStateProvider>
                <header className="sticky top-0 z-10 flex w-full justify-center bg-slate-200/30 py-1 pl-2 pr-3 shadow-md backdrop-blur-sm dark:bg-slate-900/30">
                  <NavBar className="max-w-[56rem]" />
                </header>
                {children}
              </GameStateProvider>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
