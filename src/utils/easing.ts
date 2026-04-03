// Easing functions for transformation animation

export function easeIn(t: number): number {
  return t * t
}

export function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export function spring(t: number, damping = 0.6): number {
  if (t >= 1) return 1
  const frequency = 4
  const decay = Math.exp(-damping * t * 6)
  const oscillation = Math.cos(frequency * t * Math.PI)
  return 1 - decay * oscillation * (1 - t)
}

export type EasingFn = (t: number) => number
