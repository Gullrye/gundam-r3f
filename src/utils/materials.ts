export const COLORS = {
  body: '#3a3a6e',
  bodyAccent: '#2e2e5a',
  chrome: '#e8e8e8',
  neonCyan: '#00fff0',
  neonMagenta: '#ff00ff',
  amber: '#ffaa00',
  glass: '#2a4a6a',
  darkMetal: '#2a2a40',
} as const

export const MATERIALS = {
  body: {
    color: COLORS.body,
    metalness: 0.7,
    roughness: 0.4,
  },
  chrome: {
    color: COLORS.chrome,
    metalness: 1,
    roughness: 0.1,
  },
  neonCyan: {
    color: COLORS.neonCyan,
    emissive: COLORS.neonCyan,
    emissiveIntensity: 2,
    metalness: 0.5,
    roughness: 0.2,
  },
  amber: {
    color: COLORS.amber,
    emissive: COLORS.amber,
    emissiveIntensity: 1.5,
    metalness: 0.5,
    roughness: 0.3,
  },
  glass: {
    color: COLORS.glass,
    transparent: true,
    opacity: 0.4,
    metalness: 0.1,
    roughness: 0.1,
  },
  tire: {
    color: '#111111',
    metalness: 0.1,
    roughness: 0.9,
  },
  darkMetal: {
    color: COLORS.darkMetal,
    metalness: 0.8,
    roughness: 0.5,
  },
  bodyAccent: {
    color: COLORS.bodyAccent,
    metalness: 0.9,
    roughness: 0.35,
  },
  neonMagenta: {
    color: COLORS.neonMagenta,
    emissive: COLORS.neonMagenta,
    emissiveIntensity: 2,
    metalness: 0.5,
    roughness: 0.2,
  },
} as const
