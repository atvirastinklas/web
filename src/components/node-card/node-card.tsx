import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { nodeNumToId } from "@/utils/meshtastic";
import { ChevronRight } from "lucide-react";

interface MeshNode {
  nodeNum: number;
  info: {
    nodeId: string;
    longName: string;
    shortName: string;
    hwModel: string;
    isLicensed: boolean;
    isUnmessagable: boolean;
    role: string;
    publicKey: string;
    lastUpdated: Date;
    updatedBy: string | null;
  } | null;
}

interface Props {
  nodeNumber: number;
}

export const NodeCard = async ({ nodeNumber }: Props) => {
  const data = await fetch(
    `https://api.atvirastinklas.lt/node/${nodeNumber}/small`,
  );

  // TODO: Handle 404.

  if (!data.ok) {
    return null;
  }

  const nodeData = (await data.json()) as MeshNode;

  const nodeInfo =
    nodeData.info != null
      ? {
          longName: nodeData.info.longName,
          avatar: nodeData.info.shortName,
          nodeId: nodeData.info.nodeId,
          hwModel: nodeData.info.hwModel,
        }
      : {
          longName: `Nežinomas node: ${nodeData.nodeNum}`,
          avatar: nodeNumToId(nodeData.nodeNum),
          nodeId: nodeNumToId(nodeData.nodeNum),
          hwModel: "",
        };

  let fontSize = "1rem";
  if (nodeInfo.avatar.length >= 6) {
    fontSize = "0.5rem";
  } else if (nodeInfo.avatar.length >= 4) {
    fontSize = "0.75rem";
  }

  return (
    <Link href={`/map?node=${nodeData.nodeNum}`} className="not-prose">
      <Card className="shadow-lg w-fit max-w-full max-h-full py-4 hover:bg-card/50">
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback
                className="bg-primary text-primary-foreground font-semibold"
                style={{
                  fontSize,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  padding: "0 2px",
                }}
                title={nodeInfo.avatar}
              >
                {nodeInfo.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm truncate">
                {nodeInfo.longName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {[nodeInfo.nodeId, nodeInfo.hwModel]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
            <ChevronRight />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
