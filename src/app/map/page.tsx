import type { Metadata } from "next";
import { MeshMap } from "./mesh-map";

export const metadata: Metadata = {
  title: "Žemėlapis | Atviras Tinklas",
  description:
    "Mes siekiame sukurti atvirą ryšio tinklą, kuriuo galėtų naudotis visi - tiek nelaimės atveju, tiek paprastam bendravimui. Nepriklausoma sistema, veikianti be interneto ir mobiliojo ryšio.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ node?: string }>;
}

export default async function Page(props: Props) {
  const { searchParams } = props;
  const { node } = await searchParams;

  return <MeshMap nodeNum={node ? Number.parseInt(node) : null} />;
}
