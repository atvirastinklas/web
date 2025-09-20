import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChartSplineIcon,
  MapPinIcon,
  MessageCircleOff,
  ThermometerIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import type { MeshNode } from "./contracts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateUpdatedView } from "./temp-comps/date-updated-view";
import { nodeNumToId } from "@/utils/meshtastic";
import { MetricsSection } from "./node-overview/metrics-section";
import { GoToMapButton } from "./node-overview/go-to-map-button";

const formatAccuracy = (accuracy: number) => {
  return `${Math.round(accuracy)}m`;
};

interface Props {
  node: string;
}

export default async function NodeOverview(props: Props) {
  const { node } = props;
  const response = await fetch(
    `https://api.atvirastinklas.lt/node/${node}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!response.ok) {
    notFound();
  }

  const nodeData = (await response.json()) as MeshNode;

  const takeFirstPerMetric = <T extends { metric: string }>(
    metrics: T[],
  ): T[] => {
    const seen = new Set<string>();
    const result: T[] = [];
    for (const m of metrics) {
      if (!seen.has(m.metric)) {
        seen.add(m.metric);
        result.push(m);
      }
    }
    return result;
  };

  const deviceMetrics = takeFirstPerMetric(
    nodeData.metrics?.filter((m) => m.group === "device") ?? [],
  );
  const envMetrics = takeFirstPerMetric(
    nodeData.metrics?.filter((m) => m.group === "environment") ?? [],
  );

  return (
    <div className="min-w-screen sm:min-w-full lg:min-w-lg h-full bg-card border-l border-border p-6 overflow-y-auto relative">
      <div className="absolute top-4 right-4">
        <GoToMapButton className="mr-2" />
        <Button type="button" variant="outline" asChild>
          <Link href="/map">
            <XIcon />
          </Link>
        </Button>
      </div>
      <div className="space-y-6">
        {nodeData.info == null ? (
          <NodeHeader
            title={`Nežinomas mazgas: ${nodeData.nodeNum}`}
            avatarText={nodeNumToId(nodeData.nodeNum)}
            isUnmessagable={false}
          />
        ) : (
          <NodeHeader
            title={nodeData.info.longName}
            avatarText={nodeData.info.shortName}
            role={nodeData.info.role}
            isUnmessagable={nodeData.info.isUnmessagable}
          />
        )}
        <Separator />

        {nodeData.info == null ? null : (
          <>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-base font-medium">
                <UserIcon className="h-4 w-4" />
                Mazgo informacija
              </h3>
              <div className="space-y-4">
                <div className="space-y-3 pl-6">
                  <div className="w-full h-24 flex items-center justify-center">
                    <img
                      src={`/assets/map/hardware/${nodeData.info.hwModel}.png`}
                      alt={nodeData.info.hwModel}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {nodeData.info.hwModel?.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 pl-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Mazgo numeris
                  </span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {nodeData.nodeNum}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Mazgo ID
                  </span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {nodeNumToId(nodeData.nodeNum)}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Radijo mėgėjas (Licencijuotas)
                  </span>
                  <Badge
                    variant={nodeData.info.isLicensed ? "default" : "secondary"}
                  >
                    {nodeData.info.isLicensed ? "Taip" : "Ne"}
                  </Badge>
                </div>
                {nodeData.publicKeys.length === 0 ? null : (
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">
                      Viešas raktas (Public Key)
                    </span>
                    <div className="bg-muted p-2 rounded text-xs font-mono break-all">
                      {nodeData.publicKeys[0].publicKey}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Atnaujinta
                  </span>
                  <span className="text-sm">
                    <DateUpdatedView date={nodeData.info.lastHeardAt} />
                  </span>
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}
        {nodeData.position == null ? null : (
          <>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-base font-medium">
                <MapPinIcon className="h-4 w-4" />
                Pozicija
              </h3>
              <div className="pl-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Koordinatės
                  </span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {nodeData.position.latitude}, {nodeData.position.longitude}
                  </code>
                </div>
                {nodeData.position.accuracy == null ? null : (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Tikslumas
                    </span>
                    <Badge variant="outline">
                      {formatAccuracy(nodeData.position.accuracy)}
                    </Badge>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Atnaujinta
                  </span>
                  <span className="text-sm">
                    <DateUpdatedView date={nodeData.position.lastHeardAt} />
                  </span>
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}
        {deviceMetrics.length === 0 ? null : (
          <>
            <MetricsSection
              icon={ChartSplineIcon}
              title="Įrenginio rodikliai"
              metrics={deviceMetrics}
            />
            <Separator />
          </>
        )}
        {envMetrics.length === 0 ? null : (
          <>
            <MetricsSection
              icon={ThermometerIcon}
              title="Aplinkos matavimai"
              metrics={envMetrics}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface NodeHeaderProps {
  title: string;
  avatarText: string;
  role?: string;
  isUnmessagable?: boolean;
}

const NodeHeader = (props: NodeHeaderProps) => {
  // Use rem values that are easier to read and adjust
  let fontSize = "1.25rem";
  if (props.avatarText.length >= 6) {
    fontSize = "0.5rem";
  } else if (props.avatarText.length >= 4) {
    fontSize = "0.75rem";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback
            className="bg-primary text-primary-foreground font-semibold"
            style={{
              fontSize,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              padding: "0 2px",
            }}
            title={props.avatarText}
          >
            {props.avatarText}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {props.title}
          </h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {props.role == null ? null : (
              <Badge variant="outline">{props.role}</Badge>
            )}
            {props.isUnmessagable == null || !props.isUnmessagable ? null : (
              <Badge variant="default">
                <MessageCircleOff />
                Žinutės nestebimos
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface HorizontalStatProps<TValue> {
  label: string;
  value: TValue | null;
  children: (value: TValue) => React.ReactNode;
}

const HorizontalStat = <TValue,>(props: HorizontalStatProps<TValue>) => {
  if (props.value == null) {
    return null;
  }
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{props.label}</span>
      {props.children(props.value)}
    </div>
  );
};
