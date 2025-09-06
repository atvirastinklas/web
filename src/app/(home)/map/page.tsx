import type { Metadata } from "next";
import { WorldMap } from "./world-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Žemėlapis | Atviras Tinklas",
  description:
    "Mes siekiame sukurti atvirą ryšio tinklą, kuriuo galėtų naudotis visi - tiek nelaimės atveju, tiek paprastam bendravimui. Nepriklausoma sistema, veikianti be interneto ir mobiliojo ryšio.",
};

export default async function Page() {
  return <WorldMap />;
}
