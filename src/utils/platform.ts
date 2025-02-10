export const getPlatform = (): string => {
  const { platform, userAgent } = navigator;
  if (platform) return platform;

  if (/Win/.test(userAgent)) return "Win";
  if (/Mac/.test(userAgent)) return "Mac";
  if (/Linux/.test(userAgent)) return "Linux";
  if (/Android/.test(userAgent)) return "Android";
  if (/iOS/.test(userAgent)) return "iOS";

  return "Unknown";
};
