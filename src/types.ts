export interface DeviceFingerprint {
  userAgent: string;
  language: string;
  colorDepth: string | number;
  screenResolution: string;
  timeZone: string;
  storageAvailable: StorageAvailability;
  hardwareConcurrency: string | number;
  deviceMemory: string | number;
  platform: string;
  doNotTrack: string;
  cookiesEnabled: boolean;
  fonts: string;
  canvas: string;
  webgl: string;
  audio: string;
  touchSupport: TouchSupport;
  hardwareInfo: HardwareInfo;
  screenOrientation: string;
  mimeTypes: string;
  plugins: string;
  maxTouchPoints: string | number;
}

export interface StorageAvailability {
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
}

export interface TouchSupport {
  maxTouchPoints: number;
  touchEvent: boolean;
  touchPoints: number;
}

export interface HardwareInfo {
  devicePixelRatio: string | number;
  hardwareConcurrency: string | number;
  deviceMemory: string | number;
}
