import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { useTransformerStore } from '../store/useTransformerStore'

export function useIdleAnimation(
  bodyRef: React.RefObject<Group | null>,
  wheelRefs?: React.RefObject<Record<string, Group>>
) {
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    const { state } = useTransformerStore.getState()
    if (!bodyRef.current) return

    timeRef.current += delta
    const t = timeRef.current

    if (state === 'car') {
      // Suspension bob: subtle vertical oscillation
      bodyRef.current.position.y = Math.sin(t * Math.PI) * 0.015
      // Wheel rotation
      if (wheelRefs?.current) {
        for (const key of ['frontWheelL', 'frontWheelR', 'rearWheelL', 'rearWheelR']) {
          const wheel = wheelRefs.current[key]
          if (wheel) wheel.rotation.x += delta * 2
        }
      }
    } else if (state === 'robot') {
      // Breathing: subtle scale pulse on y-axis
      const breathe = 1 + Math.sin(t * 1.5) * 0.008
      bodyRef.current.scale.y = breathe
      // Weight shift: subtle lateral sway
      bodyRef.current.position.x = Math.sin(t * 0.5) * 0.02
    } else {
      // Reset during transformation
      bodyRef.current.position.y = 0
      bodyRef.current.position.x = 0
      bodyRef.current.scale.y = 1
    }
  })
}
