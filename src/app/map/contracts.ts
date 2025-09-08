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
}
