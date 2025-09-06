import { useEffect, useState } from "react";
import { Point, Popup, useMap } from "react-map-gl/maplibre";
import { z } from "zod";
import { getClusterLeaves } from "./utils";
import type { Position } from "geojson";
import { XIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "date-fns/format";
import { Badge } from "@/components/ui/badge";
import { intlFormat, intlFormatDistance } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MarkerPrecisionCircle } from "./marker-precision-circle";

const nodeSchema = z.object({
  nodeNum: z.number(),
  nodeId: z.string(),
  longName: z.string(),
  shortName: z.string(),
  accuracy: z.number().nullable(),
  lastUpdated: z
    .string()
    .transform((val) => (val ? new Date(val) : null))
    .nullable(),
  role: z.string().default("-"),
});

interface SelectedNode {
  point: Position;
  items: z.infer<typeof nodeSchema>[];
}

interface Props {
  sourceId: string;
  layers: string[];
}

export const MarkerPopup = (props: Props) => {
  const { current: map } = useMap();
  const [nodes, setNodes] = useState<SelectedNode | null>(null);

  useEffect(() => {
    if (map == null) {
      return;
    }

    const subscriptions = props.layers.map((layer) =>
      map.on("click", layer, async (event) => {
        const clusterLeaves = getClusterLeaves(
          map,
          props.sourceId,
          layer,
          event.point,
        );
        if (clusterLeaves != null) {
          const features = await clusterLeaves;
          if (features.length === 0 || features[0].geometry.type !== "Point") {
            return;
          }

          const newNodes: SelectedNode = {
            point: features[0].geometry.coordinates,
            items: [],
          };
          for (const feature of features) {
            if (
              feature.geometry.type !== "Point" ||
              feature.properties == null
            ) {
              continue;
            }

            const parsed = nodeSchema.safeParse(feature.properties);
            if (!parsed.success) {
              console.error("Failed to parse node properties", parsed.error);
              continue;
            }

            newNodes.items.push(parsed.data);
          }

          setNodes(newNodes);
          return;
        }

        const firstFeature = event.features?.[0];
        if (firstFeature == null || firstFeature.geometry.type !== "Point") {
          return;
        }

        if (firstFeature.properties == null) {
          return;
        }

        const parsed = nodeSchema.safeParse(firstFeature.properties);
        if (!parsed.success) {
          console.error("Failed to parse node properties", parsed.error);
          return;
        }

        setNodes({
          point: firstFeature.geometry.coordinates,
          items: [parsed.data],
        });
      }),
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription.unsubscribe();
      }
    };
  }, [map, props.layers, props.sourceId]);

  console.log(nodes);

  if (nodes == null) {
    return null;
  }

  return (
    <Popup
      longitude={nodes.point[0]}
      latitude={nodes.point[1]}
      onClose={() => setNodes(null)}
      closeOnClick={false}
      closeButton={false}
    >
      <div className="bg-card text-card-foreground rounded-xl border shadow-sm min-w-3xs relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-70 hover:opacity-100"
          onClick={() => setNodes(null)}
        >
          <XIcon className="h-4 w-4" />
        </Button>
        <div className="flex flex-col overflow-y-auto max-h-[180px] lg:max-h-[370px] p-4">
          {nodes.items.map((node, idx) => (
            <div key={node.nodeId}>
              <NodeDetails node={node} />
              {idx < nodes.items.length - 1 && (
                <div className="py-2">
                  <Separator />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
};

const HumanReadableDuration = (props: { date: Date | null }) => {
  if (props.date == null) {
    return <>-</>;
  }

  return (
    <span
      title={intlFormat(
        props.date,
        {
          dateStyle: "medium",
          timeStyle: "medium",
        },
        { locale: "lt" },
      )}
    >
      {intlFormatDistance(props.date, new Date(), {
        locale: "lt",
      })}
    </span>
  );
};

interface NodeDetailsProps {
  node: z.infer<typeof nodeSchema>;
}

const NodeDetails = ({ node }: NodeDetailsProps) => {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
            {node.shortName}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-foreground truncate pr-6">
            {node.longName}
          </h3>
          <Badge className="text-xs">{node.role}</Badge>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Node</span>
        <span className="font-mono">{node.nodeNum}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Node ID</span>
        <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
          {node.nodeId}
        </code>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Atnaujinta</span>
        <span>
          <HumanReadableDuration date={node.lastUpdated} />
        </span>
      </div>
      <Button className="w-full" variant="outline" size="sm" asChild>
        <Link href={`/map?node=${node.nodeNum}`}>Rodyti daugiau</Link>
      </Button>
    </div>
  );
};
