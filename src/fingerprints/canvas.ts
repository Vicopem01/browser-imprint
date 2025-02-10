export const getCanvasFingerprint = async (): Promise<string> => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    canvas.width = 200;
    canvas.height = 50;

    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#F60";
    ctx.fillRect(125, 1, 62, 20);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#FF0000");
    gradient.addColorStop(1, "#0000FF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 25, canvas.width, 25);

    ctx.fillStyle = "#069";
    ctx.fillText("Browser Fingerprint", 2, 15);

    return canvas.toDataURL().slice(-50);
  } catch {
    return "";
  }
};
