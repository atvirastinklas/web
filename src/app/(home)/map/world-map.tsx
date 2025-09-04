"use client";
import MapComp, { FullscreenControl, GeolocateControl, Layer, type LayerProps, NavigationControl, ScaleControl, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface MeshNode {
    nodeNum: number;
    longName: string;
    shortName: string;
    hwModel: string;
    longitude: number;
    latitude: number;
    precisionInMeters: number;
    lastUpdate: string;
}

export const WorldMap = () => {
    return (
        <MapComp
            initialViewState={{
                bounds: [21.0558004086, 53.9057022162, 26.5882792498, 56.3725283881],
                fitBoundsOptions: { padding: 40 },
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        >
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />

            <Source id="nodes" type="geojson" data="https://atvirastinklas.lt/nodes.json">
                <Layer id="points" type="circle" paint={{
                    'circle-radius': 6,
                    'circle-color': '#73bf69',
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 2,
                }} />
                <Layer id="labels" type="symbol" layout={{
                    'text-field': ['get', 'longName'],
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'text-offset': [0, 1.2],
                    'text-anchor': 'top'
                }} paint={{
                    'text-color': '#73bf69',
                    'text-halo-color': '#000',
                    'text-halo-width': 1,
                    'text-halo-blur': 1
                }} />
            </Source>
        </MapComp>
    );
}
