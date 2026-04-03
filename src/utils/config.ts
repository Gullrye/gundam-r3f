import * as THREE from 'three'

export interface PartConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

// Unit: 1 = 1 meter. Car ~4.5m long (z), ~2m wide (x), ~1.2m tall (y).
// Car faces -z (front at negative z).

export const CAR_CONFIGS: Record<string, PartConfig> = {
  body: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  chassisUpper: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  chassisLower: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  hood: { position: [0, 0.5, -1.35], rotation: [0, 0, 0], scale: [1, 1, 1] },
  windshield: { position: [0, 0.75, -0.2], rotation: [-0.5, 0, 0], scale: [1, 1, 1] },
  roofShell: { position: [0, 0.95, 0.3], rotation: [0, 0, 0], scale: [1, 1, 1] },
  head: { position: [0, 0.95, 0.3], rotation: [0, 0, 0], scale: [0, 0, 0] },
  grille: { position: [0, 0.38, -2.22], rotation: [0, 0, 0], scale: [1, 1, 1] },
  headlightL: { position: [-0.65, 0.42, -2.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
  headlightR: { position: [0.65, 0.42, -2.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
  doorUpperL: { position: [-0.9, 0.55, 0.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  doorLowerL: { position: [-0.88, 0.25, 0.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  exhaustPipeL: { position: [-0.6, 0.18, 2.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  doorUpperR: { position: [0.9, 0.55, 0.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  doorLowerR: { position: [0.88, 0.25, 0.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  exhaustPipeR: { position: [0.6, 0.18, 2.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  trunkLeft: { position: [-0.4, 0.55, 1.55], rotation: [0, 0, 0], scale: [1, 1, 1] },
  sideSkirtL: { position: [-0.9, 0.18, 0.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
  rearWheelL: { position: [-0.95, 0.32, 1.4], rotation: [0, 0, Math.PI / 2], scale: [1, 1, 1] },
  trunkRight: { position: [0.4, 0.55, 1.55], rotation: [0, 0, 0], scale: [1, 1, 1] },
  sideSkirtR: { position: [0.9, 0.18, 0.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
  rearWheelR: { position: [0.95, 0.32, 1.4], rotation: [0, 0, Math.PI / 2], scale: [1, 1, 1] },
  frontWheelL: { position: [-0.95, 0.32, -1.5], rotation: [0, 0, Math.PI / 2], scale: [1, 1, 1] },
  frontWheelR: { position: [0.95, 0.32, -1.5], rotation: [0, 0, Math.PI / 2], scale: [1, 1, 1] },
  fenderL: { position: [-0.9, 0.3, -1.5], rotation: [0, 0, 0], scale: [1, 1, 1] },
  fenderR: { position: [0.9, 0.3, -1.5], rotation: [0, 0, 0], scale: [1, 1, 1] },

  // Car detail parts
  frontBumper: { position: [0, 0.3, -2.15], rotation: [0, 0, 0], scale: [1, 1, 1] },
  rearWindow: { position: [0, 0.75, 0.85], rotation: [0.4, 0, 0], scale: [1, 1, 1] },
  trunkLid: { position: [0, 0.7, 1.55], rotation: [0, 0, 0], scale: [1, 1, 1] },
  rearBumper: { position: [0, 0.3, 2.05], rotation: [0, 0, 0], scale: [1, 1, 1] },
  tailLightL: { position: [-0.7, 0.42, 2.08], rotation: [0, 0, 0], scale: [1, 1, 1] },
  tailLightR: { position: [0.7, 0.42, 2.08], rotation: [0, 0, 0], scale: [1, 1, 1] },
  sideVentL: { position: [-0.91, 0.35, -0.5], rotation: [0, 0, 0], scale: [1, 1, 1] },
  sideVentR: { position: [0.91, 0.35, -0.5], rotation: [0, 0, 0], scale: [1, 1, 1] },
  frontWheelArchL: { position: [-0.85, 0.35, -1.5], rotation: [0, 0, 0], scale: [1, 1, 1] },
  frontWheelArchR: { position: [0.85, 0.35, -1.5], rotation: [0, 0, 0], scale: [1, 1, 1] },
  rearWheelArchL: { position: [-0.85, 0.35, 1.4], rotation: [0, 0, 0], scale: [1, 1, 1] },
  rearWheelArchR: { position: [0.85, 0.35, 1.4], rotation: [0, 0, 0], scale: [1, 1, 1] },
  eyeGlowStrip: { position: [0, 0.42, -2.23], rotation: [0, 0, 0], scale: [1, 1, 1] },

  // Joint connectors — hidden in car mode
  jointShoulderL: { position: [-0.9, 0.35, -1.5], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointShoulderR: { position: [0.9, 0.35, -1.5], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointElbowL: { position: [-0.9, 0.4, 0.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointElbowR: { position: [0.9, 0.4, 0.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointKneeL: { position: [-0.9, 0.18, 1.2], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointKneeR: { position: [0.9, 0.18, 1.2], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointNeck: { position: [0, 0.85, 0.3], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointHipL: { position: [-0.4, 0.45, 1.3], rotation: [0, 0, 0], scale: [0, 0, 0] },
  jointHipR: { position: [0.4, 0.45, 1.3], rotation: [0, 0, 0], scale: [0, 0, 0] },

  // Robot-specific meshes — hidden in car mode
  robotTorso: { position: [0, 0.5, 0], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotPelvis: { position: [0, 0.3, 0], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotChestL: { position: [0, 0.5, -0.5], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotChestR: { position: [0, 0.5, -0.5], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotShoulderArmorL: { position: [-0.9, 0.35, -1.5], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotShoulderArmorR: { position: [0.9, 0.35, -1.5], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotUpperArmL: { position: [-0.9, 0.5, 0.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotUpperArmR: { position: [0.9, 0.5, 0.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotForearmL: { position: [-0.88, 0.25, 0.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotForearmR: { position: [0.88, 0.25, 0.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotFistL: { position: [-0.6, 0.18, 2.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotFistR: { position: [0.6, 0.18, 2.15], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotThighL: { position: [-0.4, 0.55, 1.55], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotThighR: { position: [0.4, 0.55, 1.55], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotShinL: { position: [-0.9, 0.18, 0.2], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotShinR: { position: [0.9, 0.18, 0.2], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotFootL: { position: [-0.95, 0.05, 1.4], rotation: [0, 0, 0], scale: [0, 0, 0] },
  robotFootR: { position: [0.95, 0.05, 1.4], rotation: [0, 0, 0], scale: [0, 0, 0] },
}

// Robot ~4.5m tall. G1 Optimus Prime silhouette:
// Broad shoulders, narrow waist, A-frame legs, red chest with windows.
// Robot-specific meshes are the PRIMARY visual; car parts stay subtle underneath.
// Hero pose: subtle body twist, right arm slightly raised.
//
// Y-axis layout (feet to head):
//   0.00 — ground / feet bottom
//   0.30 — foot tops
//   0.75 — knee joints
//   0.90 — shin tops
//   1.55 — thigh tops / hip joints
//   2.00 — pelvis center
//   2.70 — torso bottom
//   3.10 — torso center
//   3.50 — chest plate center
//   3.70 — shoulder joint center
//   3.85 — neck base
//   4.10 — head center
//   4.50 — helmet top / antennae tip
export const ROBOT_CONFIGS: Record<string, PartConfig> = {
  // === CAR PARTS (subtle scaling, hidden behind robot meshes) ===
  body: {
    position: [0, 0.3, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Spine connector — thin rod behind robotTorso
  chassisUpper: {
    position: [0, 2.4, -0.2],
    rotation: [0, 0, 0],
    scale: [0.4, 2, 0.2],
  },
  // Waist strut — small behind pelvis
  chassisLower: {
    position: [0, 2.0, -0.15],
    rotation: [0, 0, 0],
    scale: [0.4, 1.5, 0.15],
  },
  // Hood flips behind torso (back armor)
  hood: {
    position: [0, 3.0, 0.3],
    rotation: [-Math.PI / 2, 0, 0],
    scale: [0.8, 1.2, 0.3],
  },
  // Windshield → chest window backing (behind robotChestL/R)
  windshield: {
    position: [0, 3.5, 0.08],
    rotation: [0, 0, 0],
    scale: [0.5, 0.4, 0.3],
  },
  // Roof → upright back armor panel behind head
  roofShell: {
    position: [0, 4.0, -0.52],
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.85, 1.0, 3.0],
  },
  // Head — appears from roof, rotates 180° to face same direction as car front
  head: {
    position: [0, 4.1, 0],
    rotation: [0, Math.PI, 0],
    scale: [1, 1, 1],
  },
  // Grille → hidden behind head
  grille: {
    position: [0, 3.98, 0.35],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  // Headlights → eyes on head
  headlightL: {
    position: [-0.15, 4.16, -0.24],
    rotation: [0, 0, 0],
    scale: [1.4, 1.4, 1.6],
  },
  headlightR: {
    position: [0.15, 4.16, -0.24],
    rotation: [0, 0, 0],
    scale: [1.4, 1.4, 1.6],
  },

  // Left arm — subtle car shell behind robot meshes
  doorUpperL: {
    position: [-1.4, 2.9, 0],
    rotation: [0, 0, -0.15],
    scale: [1.2, 0.8, 0.4],
  },
  doorLowerL: {
    position: [-1.5, 2.0, 0],
    rotation: [0, 0, -0.1],
    scale: [1.2, 0.8, 0.4],
  },
  // Left exhaust → left smoke stack (behind left shoulder)
  exhaustPipeL: {
    position: [-1.2, 4.4, -0.25],
    rotation: [0, 0, 0],
    scale: [2.5, 8, 2.5],
  },

  // Right arm — hero pose: slightly raised and forward
  doorUpperR: {
    position: [1.5, 2.9, -0.1],
    rotation: [0, 0, 0.3],
    scale: [1.2, 0.8, 0.4],
  },
  doorLowerR: {
    position: [1.6, 2.0, -0.15],
    rotation: [0, 0, 0.2],
    scale: [1.2, 0.8, 0.4],
  },
  // Right exhaust → right smoke stack
  exhaustPipeR: {
    position: [1.2, 4.4, -0.25],
    rotation: [0, 0, 0],
    scale: [2.5, 8, 2.5],
  },

  // Left leg — car parts shrink behind robot meshes
  trunkLeft: {
    position: [-0.55, 1.1, 0],
    rotation: [0, 0, 0.03],
    scale: [0.6, 1.5, 0.4],
  },
  sideSkirtL: {
    position: [-0.55, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [1.5, 0.8, 0.3],
  },
  rearWheelL: {
    position: [-0.75, 0.32, 0],
    rotation: [0, 0, Math.PI / 2],
    scale: [1, 1, 1],
  },

  // Right leg — slight forward for hero stance
  trunkRight: {
    position: [0.55, 1.1, 0.04],
    rotation: [0, 0, -0.03],
    scale: [0.6, 1.5, 0.4],
  },
  sideSkirtR: {
    position: [0.55, 0.5, 0.03],
    rotation: [0, 0, 0],
    scale: [1.5, 0.8, 0.3],
  },
  rearWheelR: {
    position: [0.75, 0.32, 0.04],
    rotation: [0, 0, Math.PI / 2],
    scale: [1, 1, 1],
  },

  // Shoulder wheels — prominent on shoulders
  frontWheelL: {
    position: [-1.5, 3.7, 0],
    rotation: [0, 0, Math.PI / 2],
    scale: [1.4, 1.4, 1.4],
  },
  frontWheelR: {
    position: [1.5, 3.7, 0],
    rotation: [0, 0, Math.PI / 2],
    scale: [1.4, 1.4, 1.4],
  },
  // Fender → shoulder plate accent
  fenderL: {
    position: [-1.35, 3.55, 0],
    rotation: [0, 0, 0],
    scale: [1.5, 1.2, 0.8],
  },
  fenderR: {
    position: [1.35, 3.55, 0],
    rotation: [0, 0, 0],
    scale: [1.5, 1.2, 0.8],
  },

  // Car detail parts — hidden in robot mode
  frontBumper: {
    position: [0, 0.3, -2.15],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  rearWindow: {
    position: [0, 0.75, 0.85],
    rotation: [0.4, 0, 0],
    scale: [0, 0, 0],
  },
  trunkLid: {
    position: [0, 0.7, 1.55],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  rearBumper: {
    position: [0, 0.3, 2.05],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  tailLightL: {
    position: [-0.7, 0.42, 2.08],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  tailLightR: {
    position: [0.7, 0.42, 2.08],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  sideVentL: {
    position: [-0.91, 0.35, -0.5],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  sideVentR: {
    position: [0.91, 0.35, -0.5],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  frontWheelArchL: {
    position: [-0.85, 0.35, -1.5],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  frontWheelArchR: {
    position: [0.85, 0.35, -1.5],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  rearWheelArchL: {
    position: [-0.85, 0.35, 1.4],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  rearWheelArchR: {
    position: [0.85, 0.35, 1.4],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },
  eyeGlowStrip: {
    position: [0, 0.42, -2.23],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  },

  // === JOINT CONNECTORS ===
  jointShoulderL: {
    position: [-1.35, 3.7, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointShoulderR: {
    position: [1.35, 3.7, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointElbowL: {
    position: [-1.45, 2.35, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointElbowR: {
    position: [1.55, 2.3, -0.08],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointKneeL: {
    position: [-0.55, 0.75, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointKneeR: {
    position: [0.55, 0.75, 0.03],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointNeck: {
    position: [0, 3.85, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointHipL: {
    position: [-0.45, 1.55, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  jointHipR: {
    position: [0.45, 1.55, 0.04],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },

  // === ROBOT-SPECIFIC MESHES ===
  // Main blue torso block — wide, blocky, the core body
  robotTorso: {
    position: [0, 3.1, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Dark pelvis/waist — narrower than torso
  robotPelvis: {
    position: [0, 2.0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Red chest plates (left & right) — prominent with windows
  robotChestL: {
    position: [-0.32, 3.5, 0.15],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  robotChestR: {
    position: [0.32, 3.5, 0.15],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Red shoulder armor — broad, imposing
  robotShoulderArmorL: {
    position: [-1.35, 3.7, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  robotShoulderArmorR: {
    position: [1.35, 3.7, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Blue upper arms — thick blocky segments
  robotUpperArmL: {
    position: [-1.35, 3.05, 0],
    rotation: [0, 0, -0.15],
    scale: [1, 1, 1],
  },
  robotUpperArmR: {
    position: [1.4, 3.05, -0.08],
    rotation: [0, 0, 0.3],
    scale: [1, 1, 1],
  },
  // Blue forearms — thick, overlap at elbow joint
  robotForearmL: {
    position: [-1.45, 2.35, 0],
    rotation: [0, 0, -0.1],
    scale: [1, 1, 1],
  },
  robotForearmR: {
    position: [1.55, 2.3, -0.12],
    rotation: [0, 0, 0.2],
    scale: [1, 1, 1],
  },
  // Dark fists — blocky, at end of forearms
  robotFistL: {
    position: [-1.5, 1.8, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  robotFistR: {
    position: [1.65, 1.75, -0.15],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Blue thighs — overlap hip and knee joints
  robotThighL: {
    position: [-0.45, 1.15, 0],
    rotation: [0, 0, 0.03],
    scale: [1, 1, 1],
  },
  robotThighR: {
    position: [0.45, 1.15, 0.04],
    rotation: [0, 0, -0.03],
    scale: [1, 1, 1],
  },
  // Blue shins — overlap knee joint, thick
  robotShinL: {
    position: [-0.55, 0.4, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  robotShinR: {
    position: [0.55, 0.4, 0.03],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  // Blue feet — wide, flat, stable
  robotFootL: {
    position: [-0.55, 0.06, 0.1],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  robotFootR: {
    position: [0.55, 0.06, 0.12],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
}

export function lerpConfig(
  from: PartConfig,
  to: PartConfig,
  t: number
): { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 } {
  const position = new THREE.Vector3(...from.position).lerp(
    new THREE.Vector3(...to.position),
    t
  )
  const rotation = new THREE.Euler(
    THREE.MathUtils.lerp(from.rotation[0], to.rotation[0], t),
    THREE.MathUtils.lerp(from.rotation[1], to.rotation[1], t),
    THREE.MathUtils.lerp(from.rotation[2], to.rotation[2], t)
  )
  const scale = new THREE.Vector3(...from.scale).lerp(
    new THREE.Vector3(...to.scale),
    t
  )
  return { position, rotation, scale }
}
