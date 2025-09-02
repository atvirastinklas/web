import { WorldMap } from "./world-map";

export default async function Page() {
    const response = await fetch("https://cdn.atvirastinklas.lt/nodes.json")
    const nodes = await response.json();

    return (
        <main className="h-full w-full">
            <WorldMap nodes={nodes} />
        </main>
    );
}
