import { getDeviceFingerprint } from "../src/index";
import { getAudioFingerprint } from "../src/fingerprints/audio";
import { generateHash } from "../src/utils/hash";

describe("Device Fingerprint Library", () => {
  // Mock necessary browser APIs
  const mockNavigator = {
    userAgent: "Mozilla/5.0 (Test)",
    language: "en-US",
    hardwareConcurrency: 8,
    deviceMemory: 8,
  };

  const mockScreen = {
    colorDepth: 24,
    width: 1920,
    height: 1080,
  };

  beforeAll(() => {
    // Setup global mocks
    global.navigator = mockNavigator as any;
    global.screen = mockScreen as any;
    global.crypto = {
      subtle: {
        digest: jest.fn(),
      },
    } as any;
  });

  describe("generateHash", () => {
    it("should generate a SHA-256 hash when WebCrypto is available", async () => {
      const testString = "test-string";
      const mockHashBuffer = new Uint8Array([1, 2, 3, 4]);

      (crypto.subtle.digest as jest.Mock).mockResolvedValueOnce(mockHashBuffer);

      const hash = await generateHash(testString);
      expect(hash).toBeTruthy();
      expect(typeof hash).toBe("string");
    });

    it("should fall back to basic hash when WebCrypto fails", async () => {
      const testString = "test-string";

      (crypto.subtle.digest as jest.Mock).mockRejectedValueOnce(new Error());

      const hash = await generateHash(testString);
      expect(hash).toBeTruthy();
      expect(typeof hash).toBe("string");
    });
  });

  describe("getAudioFingerprint", () => {
    let mockAudioContext: any;
    let mockOscillator: any;
    let mockAnalyser: any;
    let mockGainNode: any;

    beforeEach(() => {
      mockOscillator = {
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
      };

      mockAnalyser = {
        connect: jest.fn(),
        fftSize: 0,
        frequencyBinCount: 32,
        getByteFrequencyData: jest.fn((array) => {
          array.fill(1);
        }),
      };

      mockGainNode = {
        connect: jest.fn(),
        gain: { value: 0 },
      };

      mockAudioContext = {
        createOscillator: jest.fn(() => mockOscillator),
        createAnalyser: jest.fn(() => mockAnalyser),
        createGain: jest.fn(() => mockGainNode),
        destination: {},
        close: jest.fn().mockResolvedValue(undefined),
      };

      (window as any).AudioContext = jest.fn(() => mockAudioContext);
    });

    it("should generate audio fingerprint", async () => {
      const fingerprint = await getAudioFingerprint();
      expect(fingerprint).toBeTruthy();
      expect(typeof fingerprint).toBe("string");
    });

    it("should return empty string when AudioContext is not available", async () => {
      (window as any).AudioContext = undefined;
      const fingerprint = await getAudioFingerprint();
      expect(fingerprint).toBe("");
    });
  });

  describe("getFingerprint", () => {
    it("should generate a valid fingerprint", async () => {
      const fingerprint = await getDeviceFingerprint();
      expect(fingerprint).toBeTruthy();
      expect(typeof fingerprint).toBe("string");
    });

    it("should fall back to basic fingerprint on error", async () => {
      // Mock a failure in the main fingerprinting process
      (crypto.subtle.digest as jest.Mock).mockRejectedValueOnce(new Error());

      const fingerprint = await getDeviceFingerprint();
      expect(fingerprint).toBeTruthy();
      expect(typeof fingerprint).toBe("string");
    });
  });
});
