export interface MeshNode {
  nodeNum: number;
  nodeId: string;
  longName: string;
  shortName: string;
  hwModel: string;
  isLicensed: boolean;
  isUnmessagable: boolean;
  role: string;
  publicKey: string;
  lastUpdated: string;
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
}
