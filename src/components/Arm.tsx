import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jointRef } from './Gundam'
import type { ColorConfig } from '../types'

interface ArmProps {
  colors: ColorConfig
  side: 'left' | 'right'
}

export function Arm({ colors, side }: ArmProps) {
  const shoulderRef = useRef<any>(null!)
  const elbowRef = useRef<any>(null!)
  const xSign = side === 'left' ? -1 : 1
  const baseX = xSign * 0.75

  useFrame(() => {
    const j = jointRef.current
    if (shoulderRef.current) {
      shoulderRef.current.rotation.x = side === 'left' ? (j.leftShoulderRotX ?? 0) : (j.rightShoulderRotX ?? 0)
      shoulderRef.current.rotation.z = side === 'left' ? (j.leftShoulderRotZ ?? 0) : (j.rightShoulderRotZ ?? 0)
    }
    if (elbowRef.current) {
      elbowRef.current.rotation.x = side === 'left' ? (j.leftElbowRotX ?? 0) : (j.rightElbowRotX ?? 0)
    }
  })

  return (
    <group position={[baseX, 0.4, 0]}>
      {/* Shoulder joint */}
      <group ref={shoulderRef}>
        {/* Shoulder armor */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.4, 0.25, 0.45]} />
          <meshStandardMaterial color={colors.secondary} metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Shoulder top accent */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.35]} />
          <meshStandardMaterial color={colors.yellow} metalness={0.4} roughness={0.4} />
        </mesh>

        {/* Upper arm */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.25, 0.35, 0.25]} />
          <meshStandardMaterial color={colors.primary} metalness={0.3} roughness={0.6} />
        </mesh>

        {/* Elbow joint */}
        <group ref={elbowRef} position={[0, -0.5, 0]}>
          {/* Forearm */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color={colors.primary} metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Forearm armor plate */}
          <mesh position={[0, -0.2, 0.16]}>
            <boxGeometry args={[0.22, 0.3, 0.02]} />
            <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[0.18, 0.15, 0.15]} />
            <meshStandardMaterial color={colors.dark} metalness={0.3} roughness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
