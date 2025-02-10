export const getWebGLFingerprint = async (): Promise<string> => {
  try {
    const canvas = document.createElement("canvas");

    // Try to get WebGL context with fallbacks
    const gl: any = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl") ||
      canvas.getContext("webgl2")) as WebGLRenderingContext | null;

    if (!gl) {
      return canvas.toDataURL().slice(-32); // fallback for browsers without WebGL support
    }

    // Get available WebGL information
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const vendor =
      gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) ||
      gl.getParameter(gl.VENDOR) ||
      "";

    const renderer =
      gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ||
      gl.getParameter(gl.RENDERER) ||
      "";

    const version = gl.getParameter(gl.VERSION) || "";
    let fingerprint = `${vendor}~${renderer}~${version}`;

    if (!fingerprint) {
      return canvas.toDataURL("image/png").slice(-32); // fall back to canvas data URL
    }

    return fingerprint;
  } catch (error) {
    return "";
  }
};
