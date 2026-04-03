import { create } from 'zustand'

export type TransformerState = 'car' | 'robot' | 'to-car' | 'to-robot'

interface TransformerStore {
  state: TransformerState
  progress: number
  debugMode: boolean
  walkPosition: [number, number]
  triggerTransform: () => void
  setProgress: (p: number) => void
  setDebugMode: (on: boolean) => void
}

const isLocked = (state: TransformerState) =>
  state === 'to-car' || state === 'to-robot'

export const useTransformerStore = create<TransformerStore>((set, get) => ({
  state: 'car',
  progress: 0,
  debugMode: false,
  walkPosition: [0, 0],

  triggerTransform: () => {
    const { state } = get()
    if (isLocked(state)) return

    if (state === 'car') {
      set({ state: 'to-robot', progress: 0 })
    } else {
      set({ state: 'to-car', progress: 1 })
    }
  },

  setProgress: (p: number) => {
    const { state } = get()
    const clamped = Math.max(0, Math.min(1, p))

    if (state === 'to-robot') {
      if (clamped >= 1) {
        set({ state: 'robot', progress: 1 })
      } else {
        set({ progress: clamped })
      }
    } else if (state === 'to-car') {
      if (clamped <= 0) {
        set({ state: 'car', progress: 0 })
      } else {
        set({ progress: clamped })
      }
    }
  },

  setDebugMode: (on: boolean) => set({ debugMode: on }),
}))
