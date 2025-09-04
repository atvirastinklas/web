import { WorldMap } from "./world-map";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className="h-full w-full">
      <WorldMap />
    </main>
  );
}
