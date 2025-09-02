import { WorldMap } from "./world-map";

export const dynamic = "force-dynamic";

export default async function Page() {
    // TODO: Refactor to use API instead.
    const response = await fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/nodes.json`)
    const nodes = await response.json();

    return (
        <main className="h-full w-full">
            <WorldMap nodes={nodes} />
        </main>
    );
}
