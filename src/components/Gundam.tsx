import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Torso } from './Torso'
import { Head } from './Head'
import { Arm } from './Arm'
import { Leg } from './Leg'
import { Backpack } from './Backpack'
import type { JointAngles, ColorConfig, PoseName } from '../types'

interface GundamProps {
  colors: ColorConfig
  targetPose: JointAngles
  poseName: PoseName
  autoRotate: boolean
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getWalkAngles(time: number): JointAngles {
  const speed = 3
  const t = time * speed
  const swing = Math.sin(t)

  return {
    headRotX: 0,
    headRotY: 0,
    leftShoulderRotX: swing * 0.5,
    leftShoulderRotZ: 0.1,
    leftElbowRotX: -Math.max(0, -swing) * 0.4,
    rightShoulderRotX: -swing * 0.5,
    rightShoulderRotZ: -0.1,
    rightElbowRotX: -Math.max(0, swing) * 0.4,
    leftHipRotX: swing * 0.5,
    leftKneeRotX: -Math.max(0, -swing) * 0.7,
    rightHipRotX: -swing * 0.5,
    rightKneeRotX: -Math.max(0, swing) * 0.7,
  }
}

const MOVE_SPEED = 2.5
const TURN_SPEED = 4.0

export const jointRef = { current: {} as JointAngles }
export const poseActive = { current: '' as PoseName }

export function Gundam({ colors, targetPose, poseName, autoRotate }: GundamProps) {
  const groupRef = useRef<any>(null!)
  const keys = useRef<Set<string>>(new Set())

  useEffect(() => {
    const down = (e: KeyboardEvent) => keys.current.add(e.key.toLowerCase())
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase())
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame(({ clock, camera }, delta) => {
    const t = Math.min(delta * 5, 1)
    const k = keys.current
    const g = groupRef.current
    if (!g) return

    // Camera-relative directions (XZ plane)
    const camDir = new THREE.Vector3()
    camera.getWorldDirection(camDir)
    camDir.y = 0
    camDir.normalize()
    const camRight = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize()

    let moveX = 0
    let moveZ = 0
    if (k.has('w')) { moveX += camDir.x; moveZ += camDir.z }
    if (k.has('s')) { moveX -= camDir.x; moveZ -= camDir.z }
    if (k.has('a')) { moveX -= camRight.x; moveZ -= camRight.z }
    if (k.has('d')) { moveX += camRight.x; moveZ += camRight.z }

    const isWalking = moveX !== 0 || moveZ !== 0

    if (isWalking) {
      // Normalize diagonal movement
      const len = Math.sqrt(moveX * moveX + moveZ * moveZ)
      moveX /= len
      moveZ /= len
      g.position.x += moveX * MOVE_SPEED * delta
      g.position.z += moveZ * MOVE_SPEED * delta

      // Face movement direction
      const targetAngle = Math.atan2(moveX, moveZ)
      let diff = targetAngle - g.rotation.y
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      g.rotation.y += diff * Math.min(delta * TURN_SPEED, 1)
    }

    // Q/E: turn in place
    if (k.has('q')) g.rotation.y += TURN_SPEED * delta
    if (k.has('e')) g.rotation.y -= TURN_SPEED * delta

    // Determine target joint angles
    let target: JointAngles
    if (isWalking) {
      target = getWalkAngles(clock.elapsedTime)
      poseActive.current = poseName
      g.position.y = 1.0 + Math.sin(clock.elapsedTime * 6) * 0.03
    } else {
      target = targetPose
      poseActive.current = poseName
      g.position.y = 1.0
    }

    // Lerp and write to shared ref
    const c = jointRef.current
    c.headRotX = lerp((c.headRotX ?? 0), target.headRotX, t)
    c.headRotY = lerp((c.headRotY ?? 0), target.headRotY, t)
    c.leftShoulderRotX = lerp((c.leftShoulderRotX ?? 0), target.leftShoulderRotX, t)
    c.leftShoulderRotZ = lerp((c.leftShoulderRotZ ?? 0), target.leftShoulderRotZ, t)
    c.leftElbowRotX = lerp((c.leftElbowRotX ?? 0), target.leftElbowRotX, t)
    c.rightShoulderRotX = lerp((c.rightShoulderRotX ?? 0), target.rightShoulderRotX, t)
    c.rightShoulderRotZ = lerp((c.rightShoulderRotZ ?? 0), target.rightShoulderRotZ, t)
    c.rightElbowRotX = lerp((c.rightElbowRotX ?? 0), target.rightElbowRotX, t)
    c.leftHipRotX = lerp((c.leftHipRotX ?? 0), target.leftHipRotX, t)
    c.leftKneeRotX = lerp((c.leftKneeRotX ?? 0), target.leftKneeRotX, t)
    c.rightHipRotX = lerp((c.rightHipRotX ?? 0), target.rightHipRotX, t)
    c.rightKneeRotX = lerp((c.rightKneeRotX ?? 0), target.rightKneeRotX, t)

    if (autoRotate && !isWalking && !k.has('q') && !k.has('e')) {
      g.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={groupRef} position={[0, 1.0, 0]}>
      <Head colors={colors} />
      <Torso colors={colors} />
      <Arm colors={colors} side="left" />
      <Arm colors={colors} side="right" />
      <Leg colors={colors} side="left" />
      <Leg colors={colors} side="right" />
      <Backpack colors={colors} />
    </group>
  )
}
