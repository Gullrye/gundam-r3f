import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Select } from '@react-three/postprocessing'
import { useTransformerStore, type TransformerState } from '../store/useTransformerStore'
import { MATERIALS } from '../utils/materials'
import { useTransformAnimation } from '../hooks/useTransformAnimation'
import { useIdleAnimation } from '../hooks/useIdleAnimation'
import { useWalkingAnimation } from '../hooks/useWalkingAnimation'
import { useSoundManager } from '../hooks/useSoundManager'

const WHEEL_RADIUS = 0.32
const WHEEL_WIDTH = 0.18

export function Transformer() {
  const { setPartRef, neonRef, partRefs } = useTransformAnimation()
  const bodyRef = useRef<Group>(null)
  const rootGroupRef = useRef<Group>(null)
  const wheelRefs = useRef<Record<string, Group>>({})
  useIdleAnimation(bodyRef, wheelRefs)
  useWalkingAnimation(partRefs, rootGroupRef)
  const { updateSound } = useSoundManager()

  const prevStatRef = useRef<TransformerState>('car')
  useFrame(() => {
    const { state } = useTransformerStore.getState()
    if (prevStatRef.current !== state) {
      updateSound(state, prevStatRef.current)
      prevStatRef.current = state
    }
  })

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      <group ref={(ref) => { setPartRef('body')(ref); if (ref) (bodyRef as React.MutableRefObject<Group | null>).current = ref }}>

        {/* === CORE CHASSIS === */}
        <group ref={setPartRef('chassisLower')}>
          <mesh castShadow>
            <boxGeometry args={[1.7, 0.12, 3.8]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        <group ref={setPartRef('chassisUpper')}>
          <mesh position={[0, 0.13, -0.2]} castShadow>
            <boxGeometry args={[1.5, 0.1, 3.0]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0.1, -0.2]}>
            <boxGeometry args={[0.3, 0.06, 2.8]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        {/* === HOOD === */}
        <group ref={setPartRef('hood')}>
          <mesh position={[0, 0.05, -0.65]} castShadow>
            <boxGeometry args={[1.7, 0.08, 1.4]} />
            <meshStandardMaterial {...MATERIALS.bodyAccent} />
          </mesh>
          <mesh position={[0, 0.12, -0.5]} castShadow>
            <boxGeometry args={[0.5, 0.06, 0.4]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* Front bumper */}
        <group ref={setPartRef('frontBumper')}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.25, 0.15]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* Grille / face mask */}
        <group ref={setPartRef('grille')}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.15, 0.05]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* Headlights / eyes */}
        <group ref={setPartRef('headlightL')}>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.12, 0.05]} />
            <meshStandardMaterial {...MATERIALS.eyeBlue} />
          </mesh>
        </group>
        <group ref={setPartRef('headlightR')}>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.12, 0.05]} />
            <meshStandardMaterial {...MATERIALS.eyeBlue} />
          </mesh>
        </group>

        {/* Windshield / chest window */}
        <group ref={setPartRef('windshield')}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.03, 0.7]} />
            <meshStandardMaterial {...MATERIALS.glass} />
          </mesh>
        </group>

        {/* === ROOF + HEAD === */}
        <group ref={setPartRef('roofShell')}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.06, 1.0]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Back panel center ridge */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.08, 0.04, 0.9]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Back panel top edge trim */}
          <mesh position={[0, 0.02, 0.45]}>
            <boxGeometry args={[1.3, 0.04, 0.06]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Back panel bottom edge trim */}
          <mesh position={[0, 0.02, -0.45]}>
            <boxGeometry args={[1.3, 0.04, 0.06]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* Head — scales from 0 to 1, G1 Optimus Prime */}
        <group ref={setPartRef('head')}>
          {/* Helmet — blue dome */}
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.5, 0.45]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Center crest — tall and prominent */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.08, 0.18, 0.35]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Crest top ridge */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.06, 0.04, 0.3]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* LEFT ANTENNA — tall, pointed upward */}
          <mesh position={[-0.26, 0.42, -0.05]} castShadow>
            <boxGeometry args={[0.06, 0.4, 0.1]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Right antenna */}
          <mesh position={[0.26, 0.42, -0.05]} castShadow>
            <boxGeometry args={[0.06, 0.4, 0.1]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Antenna tips — subtle glow */}
          <mesh position={[-0.26, 0.63, -0.05]}>
            <boxGeometry args={[0.05, 0.05, 0.08]} />
            <meshStandardMaterial {...MATERIALS.eyeBlue} />
          </mesh>
          <mesh position={[0.26, 0.63, -0.05]}>
            <boxGeometry args={[0.05, 0.05, 0.08]} />
            <meshStandardMaterial {...MATERIALS.eyeBlue} />
          </mesh>
          {/* Eyes / visor — bright blue band */}
          <mesh position={[0, 0.06, -0.23]}>
            <boxGeometry args={[0.42, 0.1, 0.04]} />
            <meshStandardMaterial {...MATERIALS.eyeBlue} />
          </mesh>
          {/* Face mask — chrome lower face, flush with face */}
          <mesh position={[0, -0.08, -0.225]}>
            <boxGeometry args={[0.28, 0.12, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Mask center vent slit */}
          <mesh position={[0, -0.08, -0.25]}>
            <boxGeometry args={[0.03, 0.1, 0.01]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Ear guards — side panels */}
          <mesh position={[-0.32, 0.02, 0]} castShadow>
            <boxGeometry args={[0.06, 0.3, 0.3]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0.32, 0.02, 0]} castShadow>
            <boxGeometry args={[0.06, 0.3, 0.3]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Chin guard */}
          <mesh position={[0, -0.22, -0.15]} castShadow>
            <boxGeometry args={[0.25, 0.06, 0.2]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* Rear window */}
        <group ref={setPartRef('rearWindow')}>
          <mesh rotation={[0.4, 0, 0]}>
            <boxGeometry args={[1.4, 0.03, 0.5]} />
            <meshStandardMaterial {...MATERIALS.glass} />
          </mesh>
        </group>

        {/* === LEFT ARM === */}
        <group ref={setPartRef('doorUpperL')}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.45, 1.1]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.02, 0.25, 0.6]} />
            <meshStandardMaterial {...MATERIALS.glass} />
          </mesh>
        </group>

        <group ref={setPartRef('doorLowerL')}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.35, 1.1]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0.05, 0.05, 0.2]}>
            <boxGeometry args={[0.02, 0.03, 0.12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        <group ref={setPartRef('exhaustPipeL')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* === RIGHT ARM === */}
        <group ref={setPartRef('doorUpperR')}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.45, 1.1]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.02, 0.25, 0.6]} />
            <meshStandardMaterial {...MATERIALS.glass} />
          </mesh>
        </group>

        <group ref={setPartRef('doorLowerR')}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.35, 1.1]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[-0.05, 0.05, 0.2]}>
            <boxGeometry args={[0.02, 0.03, 0.12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        <group ref={setPartRef('exhaustPipeR')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* === LEFT LEG === */}
        <group ref={setPartRef('trunkLeft')}>
          <mesh castShadow>
            <boxGeometry args={[0.75, 0.3, 0.9]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        <group ref={setPartRef('sideSkirtL')}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.15, 2.4]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        <group ref={(ref) => { setPartRef('rearWheelL')(ref); if (ref) wheelRefs.current['rearWheelL'] = ref }}>
          <mesh castShadow>
            <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_WIDTH, 16]} />
            <meshStandardMaterial {...MATERIALS.tire} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[WHEEL_RADIUS * 0.65, WHEEL_RADIUS * 0.65, WHEEL_WIDTH + 0.02, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* === RIGHT LEG === */}
        <group ref={setPartRef('trunkRight')}>
          <mesh castShadow>
            <boxGeometry args={[0.75, 0.3, 0.9]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        <group ref={setPartRef('sideSkirtR')}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.15, 2.4]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        <group ref={(ref) => { setPartRef('rearWheelR')(ref); if (ref) wheelRefs.current['rearWheelR'] = ref }}>
          <mesh castShadow>
            <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_WIDTH, 16]} />
            <meshStandardMaterial {...MATERIALS.tire} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[WHEEL_RADIUS * 0.65, WHEEL_RADIUS * 0.65, WHEEL_WIDTH + 0.02, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* === FRONT WHEELS / SHOULDERS === */}
        <group ref={(ref) => { setPartRef('frontWheelL')(ref); if (ref) wheelRefs.current['frontWheelL'] = ref }}>
          <mesh castShadow>
            <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_WIDTH, 16]} />
            <meshStandardMaterial {...MATERIALS.tire} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[WHEEL_RADIUS * 0.65, WHEEL_RADIUS * 0.65, WHEEL_WIDTH + 0.02, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        <group ref={(ref) => { setPartRef('frontWheelR')(ref); if (ref) wheelRefs.current['frontWheelR'] = ref }}>
          <mesh castShadow>
            <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_WIDTH, 16]} />
            <meshStandardMaterial {...MATERIALS.tire} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[WHEEL_RADIUS * 0.65, WHEEL_RADIUS * 0.65, WHEEL_WIDTH + 0.02, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        <group ref={setPartRef('fenderL')}>
          <mesh castShadow>
            <boxGeometry args={[0.15, 0.25, 0.6]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        <group ref={setPartRef('fenderR')}>
          <mesh castShadow>
            <boxGeometry args={[0.15, 0.25, 0.6]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        {/* Car detail parts — hidden in robot mode */}
        <group ref={setPartRef('trunkLid')}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>
        <group ref={setPartRef('rearBumper')}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.2, 0.12]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>
        <group ref={setPartRef('tailLightL')}>
          <mesh>
            <boxGeometry args={[0.2, 0.08, 0.03]} />
            <meshStandardMaterial color="#cc2222" emissive="#cc2222" emissiveIntensity={0.5} />
          </mesh>
        </group>
        <group ref={setPartRef('tailLightR')}>
          <mesh>
            <boxGeometry args={[0.2, 0.08, 0.03]} />
            <meshStandardMaterial color="#cc2222" emissive="#cc2222" emissiveIntensity={0.5} />
          </mesh>
        </group>
        <group ref={setPartRef('sideVentL')}>
          <mesh>
            <boxGeometry args={[0.02, 0.15, 0.4]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>
        <group ref={setPartRef('sideVentR')}>
          <mesh>
            <boxGeometry args={[0.02, 0.15, 0.4]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>
        <group ref={setPartRef('frontWheelArchL')}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.08, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>
        <group ref={setPartRef('frontWheelArchR')}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.08, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>
        <group ref={setPartRef('rearWheelArchL')}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.08, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>
        <group ref={setPartRef('rearWheelArchR')}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.08, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        {/* === NEON — minimal: only eyes via Selective Bloom === */}
        <Select>
          {/* Eye glow strips (car mode headlights, robot mode eyes) */}
          <group ref={setPartRef('eyeGlowStrip')}>
            <mesh>
              <boxGeometry args={[1.4, 0.02, 0.02]} />
              <meshStandardMaterial {...MATERIALS.eyeBlue} />
            </mesh>
          </group>
        </Select>

        {/* === JOINT CONNECTORS (hidden in car, appear in robot) === */}
        <group ref={setPartRef('jointShoulderL')}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointShoulderR')}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointElbowL')}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointElbowR')}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointKneeL')}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.22, 0.3]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointKneeR')}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.22, 0.3]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointNeck')}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.15, 0.3, 8]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointHipL')}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>
        <group ref={setPartRef('jointHipR')}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* === ROBOT-SPECIFIC MESHES (hidden in car, scale 0→1) === */}

        {/* Blue torso block — wide, blocky core body */}
        <group ref={setPartRef('robotTorso')}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.9, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Center panel line (vertical split) */}
          <mesh position={[0, 0, 0.36]}>
            <boxGeometry args={[0.03, 0.8, 0.01]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Upper chest detail bar */}
          <mesh position={[0, 0.35, 0.36]}>
            <boxGeometry args={[1.2, 0.06, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Lower torso detail bar */}
          <mesh position={[0, -0.35, 0.36]}>
            <boxGeometry args={[1.0, 0.05, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Back plate detail */}
          <mesh position={[0, 0, -0.36]}>
            <boxGeometry args={[1.2, 0.7, 0.01]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* Dark pelvis — narrower than torso */}
        <group ref={setPartRef('robotPelvis')}>
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.35, 0.6]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Chrome waist belt */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.95, 0.06, 0.62]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Belt buckle (center diamond) */}
          <mesh position={[0, 0.1, 0.31]}>
            <boxGeometry args={[0.12, 0.12, 0.02]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Front panel detail */}
          <mesh position={[0, -0.05, 0.31]}>
            <boxGeometry args={[0.7, 0.15, 0.01]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
        </group>

        {/* LEFT red chest plate with window — large, prominent */}
        <group ref={setPartRef('robotChestL')}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.75, 0.2]} />
            <meshStandardMaterial {...MATERIALS.bodyAccent} />
          </mesh>
          {/* Chest window — large and clear */}
          <mesh position={[0, 0.02, 0.1]}>
            <boxGeometry args={[0.42, 0.52, 0.03]} />
            <meshStandardMaterial {...MATERIALS.glass} />
          </mesh>
          {/* Window chrome frame */}
          <mesh position={[0, 0.02, 0.09]}>
            <boxGeometry args={[0.48, 0.58, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Horizontal window divider */}
          <mesh position={[0, 0.02, 0.115]}>
            <boxGeometry args={[0.42, 0.03, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Plate edge detail */}
          <mesh position={[0.28, 0, 0]}>
            <boxGeometry args={[0.04, 0.7, 0.22]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* RIGHT red chest plate with window */}
        <group ref={setPartRef('robotChestR')}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.75, 0.2]} />
            <meshStandardMaterial {...MATERIALS.bodyAccent} />
          </mesh>
          <mesh position={[0, 0.02, 0.1]}>
            <boxGeometry args={[0.42, 0.52, 0.03]} />
            <meshStandardMaterial {...MATERIALS.glass} />
          </mesh>
          <mesh position={[0, 0.02, 0.09]}>
            <boxGeometry args={[0.48, 0.58, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          <mesh position={[0, 0.02, 0.115]}>
            <boxGeometry args={[0.42, 0.03, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          <mesh position={[-0.28, 0, 0]}>
            <boxGeometry args={[0.04, 0.7, 0.22]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* LEFT shoulder armor — broad, red, imposing */}
        <group ref={setPartRef('robotShoulderArmorL')}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.45, 0.5]} />
            <meshStandardMaterial {...MATERIALS.bodyAccent} />
          </mesh>
          {/* Top chrome strip */}
          <mesh position={[0, 0.23, 0]}>
            <boxGeometry args={[0.5, 0.03, 0.45]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Front edge detail */}
          <mesh position={[0, 0, -0.26]}>
            <boxGeometry args={[0.5, 0.38, 0.03]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Side rivet detail */}
          <mesh position={[-0.25, 0.1, 0]}>
            <boxGeometry args={[0.04, 0.12, 0.12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* RIGHT shoulder armor */}
        <group ref={setPartRef('robotShoulderArmorR')}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.45, 0.5]} />
            <meshStandardMaterial {...MATERIALS.bodyAccent} />
          </mesh>
          <mesh position={[0, 0.23, 0]}>
            <boxGeometry args={[0.5, 0.03, 0.45]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          <mesh position={[0, 0, -0.26]}>
            <boxGeometry args={[0.5, 0.38, 0.03]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          <mesh position={[0.25, 0.1, 0]}>
            <boxGeometry args={[0.04, 0.12, 0.12]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* LEFT upper arm — thick blue block */}
        <group ref={setPartRef('robotUpperArmL')}>
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.6, 0.38]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Hydraulic detail at top */}
          <mesh position={[0, 0.25, 0.12]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 6]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Panel line */}
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.3, 0.5, 0.01]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* RIGHT upper arm — thick blue block */}
        <group ref={setPartRef('robotUpperArmR')}>
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.6, 0.38]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0.25, 0.12]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 6]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.3, 0.5, 0.01]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* LEFT forearm — thick, wider than upper arm (G1 style) */}
        <group ref={setPartRef('robotForearmL')}>
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.55, 0.36]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Forearm panel */}
          <mesh position={[0, 0, 0.19]}>
            <boxGeometry args={[0.28, 0.45, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* RIGHT forearm */}
        <group ref={setPartRef('robotForearmR')}>
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.55, 0.36]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0, 0.19]}>
            <boxGeometry args={[0.28, 0.45, 0.01]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* LEFT fist — blocky, dark */}
        <group ref={setPartRef('robotFistL')}>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.25, 0.22]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Knuckle detail */}
          <mesh position={[0, 0.05, -0.12]}>
            <boxGeometry args={[0.22, 0.08, 0.03]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* RIGHT fist */}
        <group ref={setPartRef('robotFistR')}>
          <mesh castShadow>
            <boxGeometry args={[0.25, 0.25, 0.22]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          <mesh position={[0, 0.05, -0.12]}>
            <boxGeometry args={[0.22, 0.08, 0.03]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* LEFT thigh — thick blue block */}
        <group ref={setPartRef('robotThighL')}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.65, 0.42]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Thigh detail plate */}
          <mesh position={[0, 0.05, 0.22]}>
            <boxGeometry args={[0.35, 0.5, 0.02]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* RIGHT thigh */}
        <group ref={setPartRef('robotThighR')}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.65, 0.42]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0.05, 0.22]}>
            <boxGeometry args={[0.35, 0.5, 0.02]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* LEFT shin — thick, with chrome guard */}
        <group ref={setPartRef('robotShinL')}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.65, 0.44]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Chrome shin guard — large, prominent */}
          <mesh position={[0, 0.08, 0.23]}>
            <boxGeometry args={[0.38, 0.5, 0.03]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          {/* Lower shin plate */}
          <mesh position={[0, -0.2, 0.23]}>
            <boxGeometry args={[0.4, 0.15, 0.02]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* RIGHT shin */}
        <group ref={setPartRef('robotShinR')}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.65, 0.44]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, 0.08, 0.23]}>
            <boxGeometry args={[0.38, 0.5, 0.03]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
          <mesh position={[0, -0.2, 0.23]}>
            <boxGeometry args={[0.4, 0.15, 0.02]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
        </group>

        {/* LEFT foot — wide, flat, stable */}
        <group ref={setPartRef('robotFootL')}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.16, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          {/* Toe cap — extends forward */}
          <mesh position={[0, -0.02, -0.3]} castShadow>
            <boxGeometry args={[0.55, 0.1, 0.15]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Heel */}
          <mesh position={[0, -0.02, 0.28]} castShadow>
            <boxGeometry args={[0.45, 0.1, 0.18]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          {/* Chrome strip on top */}
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.6]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* RIGHT foot */}
        <group ref={setPartRef('robotFootR')}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.16, 0.7]} />
            <meshStandardMaterial {...MATERIALS.body} />
          </mesh>
          <mesh position={[0, -0.02, -0.3]} castShadow>
            <boxGeometry args={[0.55, 0.1, 0.15]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          <mesh position={[0, -0.02, 0.28]} castShadow>
            <boxGeometry args={[0.45, 0.1, 0.18]} />
            <meshStandardMaterial {...MATERIALS.darkMetal} />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.6]} />
            <meshStandardMaterial {...MATERIALS.chrome} />
          </mesh>
        </group>

        {/* Neon ref — kept for compatibility, minimal content */}
        <group ref={neonRef} visible={false} />

      </group>
    </group>
  )
}
