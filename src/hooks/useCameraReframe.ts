import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTransformerStore } from '../store/useTransformerStore'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const CAR_TARGET = new THREE.Vector3(0, 0.6, 0)
const ROBOT_TARGET = new THREE.Vector3(0, 2.5, 0)

const tmpVec = new THREE.Vector3()

export function useCameraReframe(controlsRef: React.RefObject<OrbitControlsImpl | null>) {
  useFrame(() => {
    const { progress, walkPosition } = useTransformerStore.getState()
    const controls = controlsRef.current
    if (!controls) return

    tmpVec.lerpVectors(CAR_TARGET, ROBOT_TARGET, progress)
    tmpVec.x += walkPosition[0]
    tmpVec.z += walkPosition[1]
    controls.target.lerp(tmpVec, 0.05)
    controls.update()
  })
}
