import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jointRef } from './Gundam'
import type { ColorConfig } from '../types'

interface HeadProps {
  colors: ColorConfig
}

export function Head({ colors }: HeadProps) {
  const groupRef = useRef<any>(null!)

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    const j = jointRef.current
    g.rotation.x = j.headRotX ?? 0
    g.rotation.y = j.headRotY ?? 0
  })

  return (
    <group ref={groupRef} position={[0, 0.85, 0]}>
      {/* Main helmet */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.45]} />
        <meshStandardMaterial color={colors.primary} metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Helmet top crest */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.35]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.3} roughness={0.5} />
      </mesh>
      {/* V-fin left wing */}
      <mesh position={[-0.15, 0.3, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.35, 0.06, 0.04]} />
        <meshStandardMaterial color={colors.yellow} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* V-fin right wing */}
      <mesh position={[0.15, 0.3, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.35, 0.06, 0.04]} />
        <meshStandardMaterial color={colors.yellow} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Face plate */}
      <mesh position={[0, -0.02, 0.23]}>
        <boxGeometry args={[0.4, 0.2, 0.02]} />
        <meshStandardMaterial color={colors.primary} metalness={0.2} roughness={0.7} />
      </mesh>
      {/* Eyes / visor */}
      <mesh position={[0, 0.02, 0.24]}>
        <boxGeometry args={[0.32, 0.06, 0.02]} />
        <meshStandardMaterial color="#00ffff" emissive="#00cccc" emissiveIntensity={0.8} metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Chin */}
      <mesh position={[0, -0.15, 0.2]}>
        <boxGeometry args={[0.2, 0.1, 0.08]} />
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}
