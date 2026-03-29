import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jointRef } from './Gundam'
import type { ColorConfig } from '../types'

interface LegProps {
  colors: ColorConfig
  side: 'left' | 'right'
}

export function Leg({ colors, side }: LegProps) {
  const hipRef = useRef<any>(null!)
  const kneeRef = useRef<any>(null!)
  const xSign = side === 'left' ? -1 : 1
  const baseX = xSign * 0.28

  useFrame(() => {
    const j = jointRef.current
    if (hipRef.current) {
      hipRef.current.rotation.x = side === 'left' ? (j.leftHipRotX ?? 0) : (j.rightHipRotX ?? 0)
    }
    if (kneeRef.current) {
      kneeRef.current.rotation.x = side === 'left' ? (j.leftKneeRotX ?? 0) : (j.rightKneeRotX ?? 0)
    }
  })

  return (
    <group position={[baseX, -0.3, 0]}>
      {/* Hip joint */}
      <group ref={hipRef}>
        {/* Thigh */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.35, 0.45, 0.35]} />
          <meshStandardMaterial color={colors.primary} metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Thigh side armor */}
        <mesh position={[xSign * 0.2, -0.25, 0]}>
          <boxGeometry args={[0.08, 0.35, 0.3]} />
          <meshStandardMaterial color={colors.secondary} metalness={0.3} roughness={0.5} />
        </mesh>

        {/* Knee joint */}
        <group ref={kneeRef} position={[0, -0.6, 0]}>
          {/* Knee cap */}
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[0.25, 0.15, 0.12]} />
            <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
          </mesh>

          {/* Shin */}
          <mesh position={[0, -0.35, 0]}>
            <boxGeometry args={[0.38, 0.55, 0.4]} />
            <meshStandardMaterial color={colors.primary} metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Shin front armor */}
          <mesh position={[0, -0.35, 0.21]}>
            <boxGeometry args={[0.3, 0.45, 0.02]} />
            <meshStandardMaterial color={colors.secondary} metalness={0.3} roughness={0.5} />
          </mesh>
          {/* Shin side vents */}
          <mesh position={[0, -0.2, 0.21]}>
            <boxGeometry args={[0.12, 0.12, 0.02]} />
            <meshStandardMaterial color={colors.yellow} metalness={0.4} roughness={0.4} />
          </mesh>

          {/* Foot */}
          <mesh position={[0, -0.72, 0.08]}>
            <boxGeometry args={[0.36, 0.12, 0.55]} />
            <meshStandardMaterial color={colors.dark} metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Foot toe */}
          <mesh position={[0, -0.72, 0.32]}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
