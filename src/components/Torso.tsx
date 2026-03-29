import type { ColorConfig } from '../types'

interface TorsoProps {
  colors: ColorConfig
}

export function Torso({ colors }: TorsoProps) {
  return (
    <group>
      {/* Upper chest - wider trapezoid shape approximated with two boxes */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.6]} />
        <meshStandardMaterial color={colors.primary} metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Chest center detail - blue */}
      <mesh position={[0, 0.35, 0.31]}>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Left chest vent */}
      <mesh position={[-0.35, 0.2, 0.31]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color={colors.yellow} metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Right chest vent */}
      <mesh position={[0.35, 0.2, 0.31]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color={colors.yellow} metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Core fighter hatch (center circle approx) */}
      <mesh position={[0, 0.35, 0.32]}>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Waist block */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.9, 0.3, 0.5]} />
        <meshStandardMaterial color={colors.dark} metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Waist front armor - red */}
      <mesh position={[0, -0.12, 0.26]}>
        <boxGeometry args={[0.6, 0.2, 0.02]} />
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}
