import { useCallback, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import type { TransformerState } from '../store/useTransformerStore'

// Placeholder sound files — replace with actual assets
const SOUNDS = {
  engineIdle: '/sounds/engine-idle.mp3',
  transformSfx: '/sounds/transform.mp3',
  heartbeat: '/sounds/heartbeat.mp3',
} as const

export function useSoundManager() {
  const engineRef = useRef<Howl | null>(null)
  const heartbeatRef = useRef<Howl | null>(null)
  const transformRef = useRef<Howl | null>(null)
  const reversedBufferRef = useRef<AudioBuffer | null>(null)
  const prevAudioCtxRef = useRef<AudioContext | null>(null)
  const prevSourceRef = useRef<AudioBufferSourceNode | null>(null)

  useEffect(() => {
    // Pre-create howls (sounds won't exist yet, but structure is ready)
    engineRef.current = new Howl({
      src: [SOUNDS.engineIdle],
      loop: true,
      volume: 0.3,
      preload: false,
    })
    heartbeatRef.current = new Howl({
      src: [SOUNDS.heartbeat],
      loop: true,
      volume: 0.25,
      preload: false,
    })
    transformRef.current = new Howl({
      src: [SOUNDS.transformSfx],
      loop: false,
      volume: 0.6,
      preload: false,
    })

    return () => {
      engineRef.current?.unload()
      heartbeatRef.current?.unload()
      transformRef.current?.unload()
    }
  }, [])

  const playReverseTransform = useCallback(async () => {
    // Reverse playback via Web Audio API buffer reversal
    if (!transformRef.current) return

    try {
      const audioCtx = prevAudioCtxRef.current || new AudioContext()
      prevAudioCtxRef.current = audioCtx

      // Fetch and decode
      const response = await fetch(SOUNDS.transformSfx)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)

      // Reverse buffer channels
      const reversed = audioCtx.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      )
      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        const src = audioBuffer.getChannelData(i)
        const dst = reversed.getChannelData(i)
        for (let j = 0; j < src.length; j++) {
          dst[j] = src[src.length - 1 - j]
        }
      }
      reversedBufferRef.current = reversed

      // Play reversed
      const source = audioCtx.createBufferSource()
      source.buffer = reversed
      source.connect(audioCtx.destination)
      source.start()
      prevSourceRef.current = source
    } catch {
      // Sound file not found — silent fallback
    }
  }, [])

  const stopReversePlayback = useCallback(() => {
    prevSourceRef.current?.stop()
    prevSourceRef.current = null
  }, [])

  const updateSound = useCallback(
    (newState: TransformerState, prevState: TransformerState) => {
      // Fade out previous idle sounds
      if (prevState === 'car') {
        engineRef.current?.fade(0.3, 0, 300)
      }
      if (prevState === 'robot') {
        heartbeatRef.current?.fade(0.25, 0, 300)
      }

      // Stop reverse playback if switching away from to-car
      if (prevState === 'to-car' && newState !== 'to-car') {
        stopReversePlayback()
      }

      // Play transform SFX
      if (newState === 'to-robot') {
        transformRef.current?.play()
      } else if (newState === 'to-car') {
        playReverseTransform()
      }

      // Fade in new idle sounds when settled
      if (newState === 'robot') {
        heartbeatRef.current?.play()
        heartbeatRef.current?.fade(0, 0.25, 500)
      } else if (newState === 'car') {
        engineRef.current?.play()
        engineRef.current?.fade(0, 0.3, 500)
      }
    },
    [playReverseTransform, stopReversePlayback]
  )

  return { updateSound }
}
