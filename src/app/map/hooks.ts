import { useState, useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

export const useSource = (sourceId: string) => {
  const { current: map } = useMap();
  const [source, setSource] = useState<maplibregl.GeoJSONSource | null>(null);

  useEffect(() => {
    if (map == null) {
      return;
    }

    const updateSource = () => {
      const src = map.getSource(sourceId) as maplibregl.GeoJSONSource;
      setSource(src);
    };

    const subscription = map.on("sourcedata", (event) => {
      if (event.sourceId === sourceId) {
        updateSource();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [map, sourceId]);

  return source;
};
