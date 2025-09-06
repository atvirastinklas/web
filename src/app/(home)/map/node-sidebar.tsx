import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Cpu, Key, MapPin, MessageCircleOff, User, XIcon } from "lucide-react";
import type { MeshNode } from "./contracts";
import { Button } from "@/components/ui/button";
import { intlFormat } from "date-fns";

interface NodeSidebarProps {
  nodeData: Partial<MeshNode>;
  position: [number, number];
  onClose: () => void;
}

export function NodeSidebar({ nodeData, position, onClose }: NodeSidebarProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAccuracy = (accuracy: number) => {
    return `${Math.round(accuracy)}m`;
  };

  return (
    <div className="min-w-lg h-full w-96 bg-card border-l border-border p-6 overflow-y-auto relative">
      <div className="absolute top-2 right-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          <XIcon />
        </Button>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {nodeData.shortName}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {nodeData.longName}
              </h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline">{nodeData.role}</Badge>
                {nodeData.isUnmessagable && (
                  <Badge variant="default">
                    {" "}
                    <MessageCircleOff />
                    Žinučių nestebi
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-base font-medium">
            <User className="h-4 w-4" />
            Node
          </h3>
          <div className="space-y-3 pl-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Node ID</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                {nodeData.nodeId}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Node numeris
              </span>
              <span className="text-sm font-mono">{nodeData.nodeNum}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Radijo mėgėjas (Licensed)
              </span>
              <Badge variant={nodeData.isLicensed ? "default" : "secondary"}>
                {nodeData.isLicensed ? "Taip" : "Ne"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Atnaujinta</span>
              <span className="text-sm">
                {nodeData.lastUpdated == null
                  ? "-"
                  : intlFormat(
                      nodeData.lastUpdated,
                      {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      },
                      { locale: "lt" },
                    )}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {nodeData.hwModel == null ? null : (
          <>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-base font-medium">
                <Cpu className="h-4 w-4" />
                Įranga
              </h3>
              <div className="space-y-3 pl-6">
                <div className="w-full h-24 flex items-center justify-center">
                  <img
                    src={`/assets/map/hardware/${nodeData.hwModel}.png`}
                    alt={nodeData.hwModel}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {nodeData.hwModel?.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />
          </>
        )}

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-base font-medium">
            <MapPin className="h-4 w-4" />
            Pozicija
          </h3>
          <div className="pl-6 flex flex-col gap-4">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Koordinatės</span>
              <div className="bg-muted p-2 rounded text-xs font-mono break-all">
                {position.join(", ")}
              </div>
            </div>
            {nodeData.accuracy == null ? null : (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tikslumas</span>
                <Badge variant="outline">
                  {formatAccuracy(nodeData.accuracy)}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-base font-medium">
            <Key className="h-4 w-4" />
            Saugumas
          </h3>
          <div className="pl-6">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Viešas raktas (Public Key)
              </span>
              <div className="bg-muted p-2 rounded text-xs font-mono break-all">
                {nodeData.publicKey}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
