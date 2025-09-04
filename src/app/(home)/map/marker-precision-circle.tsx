import { Layer, Source } from "react-map-gl/maplibre";
import circle from "@turf/circle";

interface Props {
  layerId: string;
  radius: number;
  center: [number, number];
}

export const MarkerPrecisionCircle = (props: Props) => {
  return (
    <Source
      id={props.layerId}
      type="geojson"
      data={{
        type: "FeatureCollection",
        features: [
          circle(props.center, props.radius / 1000, {
            steps: 64,
            units: "kilometers",
          }),
        ],
      }}
    >
      <Layer
        id={`${props.layerId}-radius-fills`}
        type="fill"
        paint={{
          "fill-color": "#007cbf",
          "fill-opacity": 0.2,
        }}
      />
      <Layer
        id={`${props.layerId}-radius-outlines`}
        type="line"
        paint={{
          "line-color": "#007cbf",
          "line-width": 1,
        }}
      />
    </Source>
  );
};
