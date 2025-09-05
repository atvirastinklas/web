import { nodeNumToId } from "@/utils/meshtastic";
import { useEffect, useState } from "react";
import { useMap, Popup, type MapGeoJSONFeature } from "react-map-gl/maplibre";
import { MarkerPrecisionCircle } from "./marker-precision-circle";
import { XIcon } from "lucide-react";
import { intlFormatDistance, intlFormat } from "date-fns";
import type { MeshNode } from "./contracts";

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

interface Props {
  layer: string;
}

export const MarkerPopup = (props: Props) => {
  const { current: map } = useMap();
  const [popupInfo, setPopupInfo] = useState<MapGeoJSONFeature | null>(null);

  useEffect(() => {
    if (map == null) {
      return;
    }

    const subscription = map.on("click", props.layer, (event) => {
      setPopupInfo(event.features?.[0] || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [map, props.layer]);

  if (popupInfo == null) {
    return null;
  }

  const point =
    popupInfo.geometry.type === "Point" ? popupInfo.geometry.coordinates : null;
  if (point == null) {
    return null;
  }

  const properties: Partial<MeshNode> = popupInfo.properties ?? {};

  const lastUpdated = properties.lastUpdated
    ? new Date(properties.lastUpdated)
    : null;

  return (
    <>
      <Popup
        key={popupInfo.properties?.nodeNum}
        latitude={point[1]}
        longitude={point[0]}
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
            {properties.longName ?? "Unknown"} ({properties.shortName ?? ""})
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Node: {properties.nodeNum ?? "-"}</p>
            <p className="text-sm">
              Node ID:{" "}
              {properties.nodeNum != null
                ? nodeNumToId(properties.nodeNum)
                : "-"}
            </p>
            <p className="text-sm">Įranga: {properties.hwModel ?? "-"}</p>
            <p className="text-sm">
              Pozicijos tikslumas:{" "}
              {properties.accuracy
                ? `${Number(properties.accuracy).toFixed(2)}m`
                : "-"}
            </p>
            <p className="text-sm">
              Atnaujinta: <HumanReadableDuration date={lastUpdated} />
            </p>
          </div>
        </div>
      </Popup>
      {properties.accuracy == null ? null : (
        <MarkerPrecisionCircle
          layerId="precision-circle"
          center={point as [number, number]}
          radius={properties.accuracy}
        />
      )}
    </>
  );
};
