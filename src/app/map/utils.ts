import type { MapRef, Point } from "react-map-gl/maplibre";

const htmlImg = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

interface ExternalImage {
  name: string;
  url: string;
  sdf?: boolean;
  pixelRatio?: number;
}

export async function loadMapImages(
  map: maplibregl.Map,
  images: ExternalImage[],
): Promise<void> {
  await Promise.all(
    images.map(async ({ name, url, sdf, pixelRatio }) => {
      if (map.hasImage(name)) {
        return;
      }

      try {
        const img = await htmlImg(url);
        map.addImage(name, img, { sdf, pixelRatio });
      } catch (error) {
        console.error(`Failed to load image: ${url}`, error);
      }
    }),
  );
}

export const getClusterLeaves = (
  map: MapRef,
  sourceId: string,
  layerId: string,
  point: Point,
) => {
  const features = map.queryRenderedFeatures(point, { layers: [layerId] });

  const clusterId = features?.[0]?.properties?.cluster_id;
  const pointCount = features?.[0]?.properties?.point_count;

  if (clusterId == null || pointCount == null) {
    return null;
  }

  const clusterSource = map.getSource(sourceId) as maplibregl.GeoJSONSource;

  return clusterSource.getClusterLeaves(clusterId, pointCount, 0);
};
