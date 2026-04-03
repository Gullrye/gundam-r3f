import type { EasingFn } from './easing'
import { easeOut, easeInOut, spring } from './easing'

export interface Phase {
  start: number
  end: number
  easing: EasingFn
  parts: string[]
}

// 5 phases with 20-30% overlap, normalized to 0-1 over 2.5s
export const PHASES: Phase[] = [
  {
    start: 0.0,
    end: 0.16,
    easing: easeInOut,
    parts: ['body'],
  },
  {
    start: 0.08,
    end: 0.36,
    easing: easeInOut,
    parts: [
      'chassisUpper', 'chassisLower', 'hood', 'headlightL', 'headlightR',
      'robotTorso', 'robotPelvis', 'robotChestL', 'robotChestR',
    ],
  },
  {
    start: 0.24,
    end: 0.64,
    easing: easeOut,
    parts: [
      'doorUpperL', 'doorLowerL', 'doorUpperR', 'doorLowerR',
      'frontWheelL', 'frontWheelR', 'fenderL', 'fenderR',
      'trunkLeft', 'trunkRight', 'rearWheelL', 'rearWheelR',
      'sideSkirtL', 'sideSkirtR',
      'jointShoulderL', 'jointShoulderR',
      'jointElbowL', 'jointElbowR',
      'jointKneeL', 'jointKneeR',
      'jointHipL', 'jointHipR',
      'robotShoulderArmorL', 'robotShoulderArmorR',
      'robotUpperArmL', 'robotUpperArmR',
      'robotForearmL', 'robotForearmR',
      'robotFistL', 'robotFistR',
      'robotThighL', 'robotThighR',
      'robotShinL', 'robotShinR',
      'robotFootL', 'robotFootR',
      // Car detail — hidden in robot mode
      'frontBumper', 'rearBumper', 'trunkLid', 'rearWindow',
      'tailLightL', 'tailLightR', 'sideVentL', 'sideVentR',
      'frontWheelArchL', 'frontWheelArchR', 'rearWheelArchL', 'rearWheelArchR',
      'eyeGlowStrip',
    ],
  },
  {
    start: 0.48,
    end: 0.84,
    easing: easeInOut,
    parts: [
      'roofShell', 'head', 'grille', 'windshield',
      'exhaustPipeL', 'exhaustPipeR', 'jointNeck',
    ],
  },
  {
    start: 0.72,
    end: 1.0,
    easing: spring,
    parts: ['body'],
  },
]

export function getPartProgress(globalProgress: number, partId: string): number {
  for (const phase of PHASES) {
    if (phase.parts.includes(partId)) {
      return getPhaseProgress(globalProgress, phase)
    }
  }
  return globalProgress
}

export function getPhaseProgress(globalProgress: number, phase: Phase): number {
  const { start, end, easing } = phase
  if (globalProgress <= start) return 0
  if (globalProgress >= end) return 1
  const t = (globalProgress - start) / (end - start)
  return easing(t)
}