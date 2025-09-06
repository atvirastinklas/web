import { MeshMap } from "./mesh-map";

interface Props {
  searchParams: Promise<{ node?: string }>;
}

export default async function Page(props: Props) {
  const { searchParams } = props;
  const { node } = await searchParams;

  return <MeshMap nodeNum={node ? Number.parseInt(node) : null} />;
}
