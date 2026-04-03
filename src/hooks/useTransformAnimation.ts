import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'
import { useTransformerStore } from '../store/useTransformerStore'
import { CAR_CONFIGS, ROBOT_CONFIGS, lerpConfig } from '../utils/config'
import { getPartProgress } from '../utils/timeline'

const TRANSFORM_DURATION = 2.5 // seconds

let wrappedTrigger: (() => void) | null = null

/** Call this from UI to trigger transform with timer reset */
export function triggerTransformGlobal() {
  wrappedTrigger?.()
}

export function useTransformAnimation() {
  const elapsedRef = useRef(0)
  const partRefs = useRef<Record<string, Group>>({})
  const neonRef = useRef<Group>(null)

  const setPartRef = (id: string) => (ref: Group | null) => {
    if (ref) partRefs.current[id] = ref
  }

  useFrame((_, delta) => {
    const { state, debugMode, setProgress } = useTransformerStore.getState()

    if (debugMode) {
      applyTransforms(useTransformerStore.getState().progress)
      return
    }

    if (state === 'to-robot' || state === 'to-car') {
      elapsedRef.current += delta
      const newProgress = elapsedRef.current / TRANSFORM_DURATION

      if (state === 'to-robot') {
        setProgress(Math.min(newProgress, 1))
      } else {
        setProgress(Math.max(1 - newProgress, 0))
      }
    }

    applyTransforms(useTransformerStore.getState().progress)
  })

  function applyTransforms(globalProgress: number) {
    for (const [id, group] of Object.entries(partRefs.current)) {
      const carConfig = CAR_CONFIGS[id]
      const robotConfig = ROBOT_CONFIGS[id]
      if (!carConfig || !robotConfig) continue

      const partT = getPartProgress(globalProgress, id)
      const { position, rotation, scale } = lerpConfig(carConfig, robotConfig, partT)

      group.position.copy(position)
      group.rotation.copy(rotation)
      group.scale.copy(scale)
    }

    // Dynamic headlight intensity: dim in car mode, bright in robot mode
    const headlightIntensity = 1.5 + globalProgress * 3.5
    for (const id of ['headlightL', 'headlightR']) {
      const group = partRefs.current[id]
      if (!group) continue
      group.traverse((child) => {
        if ('material' in child && child.material) {
          (child.material as THREE.MeshStandardMaterial).emissiveIntensity = headlightIntensity
        }
      })
    }

    // Neon effects layer: fade in during transformation
    if (neonRef.current) {
      neonRef.current.visible = globalProgress > 0.3
      const neonOpacity = Math.max(0, (globalProgress - 0.3) / 0.7)
      neonRef.current.traverse((child) => {
        if ('material' in child && child.material) {
          (child.material as THREE.MeshStandardMaterial).opacity = neonOpacity
        }
      })
    }
  }

  wrappedTrigger = () => {
    elapsedRef.current = 0
    useTransformerStore.getState().triggerTransform()
  }

  return { setPartRef, neonRef, partRefs }
}
