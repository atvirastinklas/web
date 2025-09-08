export interface MeshNode {
  nodeNum: number;
  info: {
    nodeNum: undefined;
    nodeId: string;
    longName: string;
    shortName: string;
    hwModel: string;
    isLicensed: boolean;
    isUnmessagable: boolean;
    role: string;
    publicKey: string;
    lastUpdated: Date;
    updatedBy: string | null;
  } | null;
  positionPartial: {
    nodeNum: undefined;
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    lastUpdated: Date;
    updatedBy: string | null;
  } | null;
  deviceMetrics: {
    nodeNum: undefined;
    batteryLevel: number | null;
    voltage: number | null;
    channelUtilization: number | null;
    airUtilTx: number | null;
    uptimeSeconds: number | null;
    lastUpdated: Date;
    updatedBy: string | null;
  } | null;
  environmentMetrics: EnvironmentMetrics | null;
}

export interface EnvironmentMetrics {
  temperature: number | null;
  relativeHumidity: number | null;
  barometricPressure: number | null;
  gasResistance: number | null;
  iaq: number | null;
  distance: number | null;
  lux: number | null;
  whiteLux: number | null;
  irLux: number | null;
  uvLux: number | null;
  windDirection: number | null;
  windSpeed: number | null;
  weight: number | null;
  windGust: number | null;
  windLull: number | null;
  radiation: number | null;
  rainfall1h: number | null;
  rainfall24h: number | null;
  soilMoisture: number | null;
  soilTemperature: number | null;
  lastUpdated: string;
}
