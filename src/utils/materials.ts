export const COLORS = {
  body: '#1a4d8f',
  bodyAccent: '#cc2222',
  chrome: '#b8b8b8',
  eyeBlue: '#4488ff',
  glass: '#6699cc',
  darkMetal: '#1a1a1a',
  neonCyan: '#00fff0',
  neonMagenta: '#ff00ff',
  amber: '#ffaa00',
  tire: '#111111',
} as const

export const MATERIALS = {
  body: {
    color: COLORS.body,
    metalness: 0.7,
    roughness: 0.35,
  },
  bodyAccent: {
    color: COLORS.bodyAccent,
    metalness: 0.7,
    roughness: 0.3,
  },
  chrome: {
    color: COLORS.chrome,
    metalness: 1,
    roughness: 0.15,
  },
  eyeBlue: {
    color: COLORS.eyeBlue,
    emissive: COLORS.eyeBlue,
    emissiveIntensity: 2,
    metalness: 0.5,
    roughness: 0.2,
  },
  glass: {
    color: COLORS.glass,
    transparent: true,
    opacity: 0.5,
    metalness: 0.1,
    roughness: 0.1,
  },
  tire: {
    color: COLORS.tire,
    metalness: 0.1,
    roughness: 0.9,
  },
  darkMetal: {
    color: COLORS.darkMetal,
    metalness: 0.8,
    roughness: 0.5,
  },
  neonCyan: {
    color: COLORS.neonCyan,
    emissive: COLORS.neonCyan,
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.2,
  },
  amber: {
    color: COLORS.amber,
    emissive: COLORS.amber,
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.3,
  },
  neonMagenta: {
    color: COLORS.neonMagenta,
    emissive: COLORS.neonMagenta,
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.2,
  },
} as const
