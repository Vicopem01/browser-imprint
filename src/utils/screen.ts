export const getScreenResolution = (): string => {
  try {
    const { screen } = window;
    const width =
      screen?.width ||
      window.innerWidth ||
      document.documentElement.clientWidth;
    const height =
      screen?.height ||
      window.innerHeight ||
      document.documentElement.clientHeight;
    return `${width}x${height}`;
  } catch {
    return "";
  }
};
