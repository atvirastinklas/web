import { nodeNumToId } from "@/utils/meshtastic";
import { useEffect, useState } from "react";
import { useMap, Popup, type MapGeoJSONFeature } from "react-map-gl/maplibre";
import { MarkerPrecisionCircle } from "./marker-precision-circle";
import { XIcon } from "lucide-react";
import { intlFormatDistance, intlFormat, set } from "date-fns";
import type { MeshNode } from "./contracts";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { NodeSidebar } from "./node-sidebar";

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

interface SelectedNode {
  point: [number, number];
  properties: Partial<MeshNode>;
  lastUpdated: Date | null;
}

interface Props {
  layer: string;
  sidebarId: string;
}

export const MarkerPopup = (props: Props) => {
  const { current: map } = useMap();
  const [selectedNode, setPopupInfo] = useState<SelectedNode | null>(null);
  const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    if (map == null) {
      return;
    }

    const subscription = map.on("click", props.layer, (event) => {
      const firstFeature = event.features?.[0];
      if (firstFeature == null) {
        return;
      }

      if (firstFeature.geometry.type !== "Point") {
        return;
      }

      setPopupInfo({
        point: firstFeature.geometry.coordinates as [number, number],
        properties: firstFeature.properties as Partial<MeshNode>,
        lastUpdated: firstFeature.properties?.lastUpdated
          ? new Date(firstFeature.properties.lastUpdated)
          : null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [map, props.layer]);

  if (selectedNode == null) {
    return null;
  }

  return (
    <>
      <Popup
        key={selectedNode.properties?.nodeNum}
        latitude={selectedNode.point[1]}
        longitude={selectedNode.point[0]}
        closeOnClick={false}
        onClose={() => setPopupInfo(null)}
        closeButton={false}
        className="max-w-sm"
      >
        <div className="absolute top-2 right-2">
          <button type="button" onClick={() => setPopupInfo(null)}>
            <XIcon />
          </button>
        </div>
        <div className="bg-card text-card-foreground gap-6 rounded-xl border py-4 px-4 shadow-sm flex flex-col">
          <h1 className="font-bold text-lg">
            {selectedNode.properties.longName ?? "Unknown"} (
            {selectedNode.properties.shortName ?? ""})
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              Node: {selectedNode.properties.nodeNum ?? "-"}
            </p>
            <p className="text-sm">
              Node ID:{" "}
              {selectedNode.properties.nodeNum != null
                ? nodeNumToId(selectedNode.properties.nodeNum)
                : "-"}
            </p>
            <p className="text-sm">
              Įranga: {selectedNode.properties.hwModel ?? "-"}
            </p>
            <p className="text-sm">
              Pozicijos tikslumas:{" "}
              {selectedNode.properties.accuracy
                ? `${Number(selectedNode.properties.accuracy).toFixed(2)}m`
                : "-"}
            </p>
            <p className="text-sm">
              Atnaujinta:{" "}
              <HumanReadableDuration date={selectedNode.lastUpdated} />
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setMoreInfo(!moreInfo)}
            >
              Rodyti daugiau
            </Button>
          </div>
        </div>
      </Popup>
      {selectedNode.properties.accuracy == null ? null : (
        <MarkerPrecisionCircle
          layerId="precision-circle"
          center={selectedNode.point}
          radius={selectedNode.properties.accuracy}
        />
      )}
      {!moreInfo
        ? null
        : createPortal(
            <NodeSidebar
              nodeData={selectedNode.properties}
              position={selectedNode.point}
              onClose={() => setMoreInfo(false)}
            />,
            document.getElementById(props.sidebarId)!,
          )}
    </>
  );
};
