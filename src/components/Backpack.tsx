import type { ColorConfig } from '../types'

interface BackpackProps {
  colors: ColorConfig
}

export function Backpack({ colors }: BackpackProps) {
  return (
    <group position={[0, 0.2, -0.35]}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.7, 0.25]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Left thruster */}
      <mesh position={[-0.25, 0.45, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 8]} />
        <meshStandardMaterial color={colors.dark} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Right thruster */}
      <mesh position={[0.25, 0.45, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 8]} />
        <meshStandardMaterial color={colors.dark} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Thruster exhaust glow left */}
      <mesh position={[-0.25, 0.55, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.1, 8]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.5} />
      </mesh>
      {/* Thruster exhaust glow right */}
      <mesh position={[0.25, 0.55, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.1, 8]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
