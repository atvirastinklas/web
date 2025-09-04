import { nodeNumToId } from "@/utils/meshtastic";
import { useEffect, useState } from "react";
import { useMap, Popup, type MapGeoJSONFeature } from "react-map-gl/maplibre";
import { MarkerPrecisionCircle } from "./marker-precision-circle";
import { XIcon } from "lucide-react";

interface Props {
  layer: string;
}

export const MarkerPopup = (props: Props) => {
  const { current: map } = useMap();
  const [popupInfo, setPopupInfo] = useState<MapGeoJSONFeature | null>(null);

  console.log(map, props.layer, popupInfo);

  useEffect(() => {
    if (map == null) {
      return;
    }

    const subscription = map.on("click", props.layer, (event) => {
      console.log("CLICK", event.features?.[0]);
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
            {popupInfo.properties?.longName ?? "Unknown"} (
            {popupInfo.properties?.shortName ?? ""})
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              Node: {popupInfo.properties?.nodeNum ?? "-"}
            </p>
            <p className="text-sm">
              Node ID:{" "}
              {popupInfo.properties?.nodeNum != null
                ? nodeNumToId(popupInfo.properties.nodeNum)
                : "-"}
            </p>
            <p className="text-sm">
              Įranga: {popupInfo.properties?.hwModel ?? "-"}
            </p>
            <p className="text-sm">
              Pozicijos tikslumas:{" "}
              {popupInfo.properties?.precisionInMeters
                ? `${Number(popupInfo.properties.precisionInMeters).toFixed(
                    2,
                  )}m`
                : "-"}
            </p>
            <p className="text-sm">
              Atnaujinta:{" "}
              {popupInfo.properties?.lastUpdate
                ? new Date(popupInfo.properties.lastUpdate).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </Popup>
      {popupInfo.properties?.precisionInMeters == null ? null : (
        <MarkerPrecisionCircle
          layerId="precision-circle"
          center={point as [number, number]}
          radius={popupInfo.properties.precisionInMeters}
        />
      )}
    </>
  );
};
