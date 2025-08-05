// Utility function to get the correct path for static assets
export const getAssetPath = (assetName) => {
  // In development, use the public folder
  if (import.meta.env.DEV) {
    return `/${assetName}`;
  }
  
  // In production, use the root path (Vercel serves public folder at root)
  return `/${assetName}`;
};

// Common asset paths
export const ASSETS = {
  HERO_BG: getAssetPath('hero-bg.png'),
  LOGO: getAssetPath('logo.png'),
  RESUME: getAssetPath('resume.pdf'),
  BLUE_ROBO: getAssetPath('bluerobo.glb'),
}; 