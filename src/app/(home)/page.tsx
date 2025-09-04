import { Hero } from "@/components/landing/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atviras Tinklas",
  description:
    "Mes siekiame sukurti atvirą ryšio tinklą, kuriuo galėtų naudotis visi - tiek nelaimės atveju, tiek paprastam bendravimui. Nepriklausoma sistema, veikianti be interneto ir mobiliojo ryšio.",
};

export default function HomePage() {
  return <Hero />;
}
