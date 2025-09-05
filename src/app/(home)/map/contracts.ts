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
  altitude: number;
  accuracy: number;
}
