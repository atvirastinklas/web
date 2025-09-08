"use client";
import { useTheme } from "next-themes";
import MapComp, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl/maplibre";
import type { LayerProps } from "react-map-gl/maplibre";

import { MarkerPopup } from "./marker-popup";
import { ActiveNode } from "./active-node";

import { Button } from "@/components/ui/button";
import { LayoutGridIcon, MapIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import "./maplibre.css";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#51bbd6",
    "circle-radius": 15,
    "circle-stroke-color": "#fff",
    "circle-stroke-width": 2,
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
    "text-allow-overlap": true,
  },
};

export const unclusteredNodeLayer: LayerProps = {
  id: "unclustered-nodes",
  type: "circle",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-radius": 6,
    "circle-color": "#73bf69",
    "circle-stroke-color": "#fff",
    "circle-stroke-width": 2,
  },
};

export const unclusteredNodeLabelLayer: LayerProps = {
  id: "unclustered-node-labels",
  type: "symbol",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-field": ["get", "longName"],
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
    "text-offset": [0, 1],
    "text-anchor": "top",
    "text-allow-overlap": false,
    "text-padding": 2,
  },
  paint: {
    "text-color": "#73bf69",
    "text-halo-width": 1,
    "text-halo-blur": 1,
  },
};

const mapStyle = (theme: string | undefined) => {
  const style = theme === "light" ? "voyager-gl-style" : "dark-matter-gl-style";
  return `https://basemaps.cartocdn.com/gl/${style}/style.json`;
};

interface Props {
  nodeNum: number | null;
  viewMode?: "both" | "map";
  nodeOverview?: React.ReactNode;
}

export const MeshMap = (props: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <MapComp
        initialViewState={{
          bounds: [21.0558004086, 53.9057022162, 26.5882792498, 56.3725283881],
          fitBoundsOptions: { padding: 40 },
        }}
        mapStyle={mapStyle(theme)}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <MarkerPopup
          sourceId="nodes"
          layers={["unclustered-nodes", "clusters"]}
        />
        <ActiveNode sourceId="nodes" nodeNum={props.nodeNum} />
        <OverviewButton
          currentView={props.viewMode ?? "map"}
          className="absolute top-4 right-4 z-10 gap-2"
        />
        <Source
          id="nodes"
          type="geojson"
          data="https://api.atvirastinklas.lt/map/nodes.json"
          cluster={true}
          clusterMaxZoom={18}
          maxzoom={20}
          clusterRadius={25}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredNodeLayer} />
          <Layer {...unclusteredNodeLabelLayer} />
        </Source>
      </MapComp>
      {props.viewMode === "map" ? null : props.nodeOverview}
    </>
  );
};

interface OverviewButtonProps {
  currentView: "both" | "map";
  className?: string;
}

const OverviewButton = (props: OverviewButtonProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const { icon: ViewIcon, label } =
    props.currentView === "map"
      ? { icon: MapIcon, label: "Tik žemėlapis" }
      : { icon: LayoutGridIcon, label: "Rodyti abudu" };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("viewMode", props.currentView === "both" ? "map" : "both");
        replace(`?${params.toString()}`);
      }}
      className={props.className}
    >
      <ViewIcon className="h-4 w-4" />
      {label}
    </Button>
  );
};
