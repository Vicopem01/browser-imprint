export const getAudioFingerprint = async (): Promise<string> => {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return "";

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const analyser = context.createAnalyser();
    const gainNode = context.createGain();

    gainNode.gain.value = 0;
    oscillator.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(0);
    analyser.fftSize = 256;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    oscillator.stop();
    await context.close();

    return dataArray.slice(0, 16).join(",");
  } catch {
    return "";
  }
};
