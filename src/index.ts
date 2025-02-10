import { getScreenResolution } from "./utils/screen";
import { getPlatform } from "./utils/platform";
import { generateHash } from "./utils/hash";
import { getCanvasFingerprint } from "./fingerprints/canvas";
import { getWebGLFingerprint } from "./fingerprints/webgl";
import { getAudioFingerprint } from "./fingerprints/audio";
import { getStorageAvailability } from "./utils/storage";
import {
  DeviceFingerprint,
  StorageAvailability,
  TouchSupport,
  HardwareInfo,
} from "./types";

export const getDeviceFingerprint = async (): Promise<string> => {
  try {
    const fingerprint: Partial<DeviceFingerprint> = {
      userAgent: navigator.userAgent || "",
      language: navigator.language || (navigator as any).userLanguage || "",
      colorDepth: window.screen?.colorDepth || "",
      screenResolution: getScreenResolution(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      storageAvailable: getStorageAvailability(),
      hardwareConcurrency: navigator.hardwareConcurrency || "",
      deviceMemory: (navigator as any).deviceMemory || "",
      platform: getPlatform(),
      doNotTrack: navigator.doNotTrack || (window as any).doNotTrack || "",
      cookiesEnabled: navigator.cookieEnabled || false,
      canvas: await getCanvasFingerprint(),
      webgl: await getWebGLFingerprint(),
      audio: await getAudioFingerprint(),
      screenOrientation: screen.orientation?.type || "",
      mimeTypes: Array.from(navigator.mimeTypes)
        .map((m) => m.type)
        .join(","),
      plugins: Array.from(navigator.plugins)
        .map((p) => p.name)
        .join(","),
      maxTouchPoints: navigator.maxTouchPoints || 0,
    };

    const validFingerprints = Object.entries(fingerprint)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([_, value]) => String(value));

    const fingerprintString = validFingerprints.join("|||");
    return await generateHash(fingerprintString);
  } catch (error) {
    console.error("Error generating, trying basic mode:", error);
    return generateBasicFingerprint();
  }
};

const generateBasicFingerprint = async (): Promise<string> => {
  const basic = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    colorDepth: screen.colorDepth,
    resolution: getScreenResolution(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return generateHash(Object.values(basic).join("|||"));
};

export type {
  DeviceFingerprint,
  StorageAvailability,
  TouchSupport,
  HardwareInfo,
};
