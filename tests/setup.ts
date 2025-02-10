Object.defineProperty(window, "AudioContext", {
  value: jest.fn().mockImplementation(() => ({
    createOscillator: jest.fn(),
    createAnalyser: jest.fn(),
    createGain: jest.fn(),
    destination: {},
    close: jest.fn(),
  })),
});

Object.defineProperty(window, "crypto", {
  value: {
    subtle: {
      digest: jest.fn(),
    },
  },
});

Object.defineProperty(window, "navigator", {
  value: {
    userAgent: "Mozilla/5.0 (Test)",
    language: "en-US",
    hardwareConcurrency: 8,
    deviceMemory: 8,
  },
});

Object.defineProperty(window, "screen", {
  value: {
    colorDepth: 24,
    width: 1920,
    height: 1080,
  },
});
