export interface MeshNodeInfo {
  longName: string;
  shortName: string;
  hwModel: string;
  isLicensed: boolean;
  isUnmessagable: boolean;
  role: string;
  lastHeardAt: Date;
}

export interface MeshNodePosition {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  lastHeardAt: Date;
}

export interface MeshNodeMetric {
  group: (typeof metricGroupType)[number];
  metric: (typeof metricType)[number];
  value: number | null;
  createdAt: Date;
}

export interface MeshNodePublicKey {
  publicKey: string;
  createdAt: Date;
}

export interface MeshNode {
  nodeNum: number;
  createdAt: Date;
  lastHeardAt: Date | null;
  info: MeshNodeInfo | null;
  position: MeshNodePosition | null;
  metrics: MeshNodeMetric[];
  publicKeys: MeshNodePublicKey[];
}

export const metricGroupType = ["device", "environment"] as const;

export const deviceMetricType = [
  "batteryLevel",
  "voltage",
  "channelUtilization",
  "airUtilTx",
  "uptimeSeconds",
] as const;

export const environmentMetricType = [
  "temperature",
  "relativeHumidity",
  "barometricPressure",
  "gasResistance",
  // NOTE: To be depreciated in favor of PowerMetrics in Meshtastic 3.x
  "voltage",
  // NOTE: To be depreciated in favor of PowerMetrics in Meshtastic 3.x
  "current",
  "iaq",
  "distance",
  "lux",
  "whiteLux",
  "irLux",
  "uvLux",
  "windDirection",
  "windSpeed",
  "weight",
  "windGust",
  "windLull",
  "radiation",
  "rainfall1h",
  "rainfall24h",
  "soilMoisture",
  "soilTemperature",
] as const;

export const metricType = [
  ...deviceMetricType,
  ...environmentMetricType,
] as const;
