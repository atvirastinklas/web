"use client";
import MapComp, { FullscreenControl, GeolocateControl, Marker, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Pin } from './pin';

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

interface Props {
    nodes: MeshNode[];
}

export const WorldMap = (props: Props) => {
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

            {props.nodes.map((node) => (
                <Marker key={node.nodeNum} longitude={node.longitude} latitude={node.latitude}>
                    <Pin name={node.longName} />
                </Marker>
            ))}
        </MapComp>
    );
}
