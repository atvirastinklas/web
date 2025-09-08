import type { Metadata } from "next";
import { MeshMap } from "./mesh-map";
import NodeOverview from "./node-overview";

export const metadata: Metadata = {
  title: "Žemėlapis | Atviras Tinklas",
  description:
    "Mes siekiame sukurti atvirą ryšio tinklą, kuriuo galėtų naudotis visi - tiek nelaimės atveju, tiek paprastam bendravimui. Nepriklausoma sistema, veikianti be interneto ir mobiliojo ryšio.",
  openGraph: {
    images: ["/public/assets/map/social.jpg"],
  },
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ node?: string; viewMode?: "both" | "map" }>;
}

export default async function Page(props: Props) {
  const { searchParams } = props;
  const { node, viewMode = "both" } = await searchParams;

  return (
    <>
      <MeshMap
        nodeNum={node ? Number.parseInt(node) : null}
        viewMode={viewMode}
        nodeOverview={node == null ? null : <NodeOverview node={node} />}
      />
    </>
  );
}
