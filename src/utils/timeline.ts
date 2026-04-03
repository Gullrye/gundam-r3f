import type { EasingFn } from './easing'
import { easeOut, easeInOut } from './easing'

export interface Phase {
  start: number  // 0-1 normalized start
  end: number    // 0-1 normalized end
  easing: EasingFn
  parts: string[] // part IDs affected by this phase
}

// 5 phases with 20-30% overlap, normalized to 0-1 over 2.5s
export const PHASES: Phase[] = [
  {
    start: 0.0,
    end: 0.16, // 0.0-0.4s
    easing: easeInOut,
    parts: ['body'],
  },
  {
    start: 0.08, // 0.2s
    end: 0.36,   // 0.9s
    easing: easeInOut,
    parts: ['chassisUpper', 'chassisLower', 'hood', 'headlightL', 'headlightR'],
  },
  {
    start: 0.24, // 0.6s
    end: 0.64,   // 1.6s
    easing: easeOut,
    parts: [
      'doorUpperL', 'doorLowerL', 'doorUpperR', 'doorLowerR',
      'frontWheelL', 'frontWheelR', 'fenderL', 'fenderR',
      'trunkLeft', 'trunkRight', 'rearWheelL', 'rearWheelR',
      'sideSkirtL', 'sideSkirtR',
    ],
  },
  {
    start: 0.48, // 1.2s
    end: 0.84,   // 2.1s
    easing: easeInOut,
    parts: ['roofShell', 'head', 'grille', 'windshield', 'exhaustPipeL', 'exhaustPipeR'],
  },
]

// Get per-part progress based on global progress
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
