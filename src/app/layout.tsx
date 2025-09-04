import "@/app/global.css";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const defaultTranslations: Translations = {
  search: "Paieška",
  searchNoResult: "Rezultatų nerasta",
  toc: "Turinys",
  tocNoHeadings: "Nėra antraščių",
  lastUpdate: "Paskutinį kartą atnaujinta",
  chooseLanguage: "Pasirinkite kalbą",
  nextPage: "Kitas puslapis",
  previousPage: "Ankstesnis puslapis",
  chooseTheme: "Tema",
  editOnGithub: "Redaguoti GitHub",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: "lt",
            translations: defaultTranslations,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
