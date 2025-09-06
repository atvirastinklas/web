import { useEffect, useState } from "react";
import { useSource } from "./hooks";
import { MarkerPrecisionCircle } from "./marker-precision-circle";

interface Props {
  sourceId: string;
  nodeNum: number | null;
}

export const ActiveNode = (props: Props) => {
  const source = useSource(props.sourceId);
  const [feature, setFeature] = useState<GeoJSON.Feature | null>(null);

  useEffect(() => {
    if (source == null || props.nodeNum == null) {
      setFeature(null);
      return;
    }

    const doIt = async () => {
      const data = await source.getData();
      if (data == null || data.type !== "FeatureCollection") {
        return;
      }

      const feature = data.features.find(
        (f) => f.properties && f.properties.nodeNum === props.nodeNum,
      );

      if (feature == null || feature.geometry.type !== "Point") {
        setFeature(null);
        return;
      }
      source.map.flyTo({
        center: feature.geometry.coordinates as [number, number],
        zoom: 14,
        duration: 1000,
      });
      setFeature(feature ?? null);
    };

    doIt();
  }, [source, props.nodeNum]);

  if (feature == null || feature.geometry.type !== "Point") {
    return null;
  }
  if (
    feature.properties?.accuracy == null ||
    feature.properties.accuracy <= 0
  ) {
    return null;
  }

  return (
    <MarkerPrecisionCircle
      layerId="precision-circle"
      center={feature.geometry.coordinates}
      radiusInMeters={feature.properties.accuracy}
    />
  );
};
