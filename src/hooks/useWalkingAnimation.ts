import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'
import { useTransformerStore } from '../store/useTransformerStore'

const WALK_SPEED = 2.5
const ROT_SPEED = 8.0
const FADE_SPEED = 5
const ANIM_SPEED = 5.0
const LEG_SWING = 0.85
const ARM_SWING = 0.7
const SHIN_BEND = 1.2
const FOREARM_BEND = 0.5
const FOOT_TILT = 0.3

const CAR_SPEED = 8.0
const CAR_STEER_SPEED = 2.0
const FRONT_WHEEL_TURN = 0.3
const WHEEL_SPIN_FACTOR = 3.0
const WHEEL_IDS = ['frontWheelL', 'frontWheelR', 'rearWheelL', 'rearWheelR']

// Half-heights of main mesh per limb (Y dimension / 2)
const H: Record<string, number> = {
  robotThighL: 0.325,
  robotThighR: 0.325,
  robotShinL: 0.325,
  robotShinR: 0.325,
  robotFootL: 0.08,
  robotFootR: 0.08,
  robotUpperArmL: 0.3,
  robotUpperArmR: 0.3,
  robotForearmL: 0.275,
  robotForearmR: 0.275,
  robotFistL: 0.125,
  robotFistR: 0.125,
}

// Parts that need rotation.x reset when walking stops (limbs + followers)
const RESET_IDS = [...Object.keys(H), 'rearWheelL', 'rearWheelR', 'jointKneeL', 'jointKneeR', 'jointElbowL', 'jointElbowR']

const carForward = new THREE.Vector3()

/**
 * Swing a limb segment with forward kinematics.
 * Rotates around X keeping the TOP (joint end) fixed,
 * AND propagates parent displacement so the segment follows its parent.
 * Returns the BOTTOM displacement for chaining to children.
 */
function swingSegment(
  group: Group,
  halfH: number,
  angle: number,
  parentDy: number,
  parentDz: number,
): [number, number] {
  const fullH = halfH * 2
  group.rotation.x = angle
  // Follow parent + own compensation to keep top fixed
  group.position.y += parentDy + halfH * (1 - Math.cos(angle))
  group.position.z += parentDz + halfH * Math.sin(angle)
  // Bottom displacement for child chain
  return [
    parentDy + fullH * (1 - Math.cos(angle)),
    parentDz + fullH * Math.sin(angle),
  ]
}

export function useWalkingAnimation(
  partRefs: React.RefObject<Record<string, Group>>,
  rootRef: React.RefObject<Group | null>,
) {
  const keysRef = useRef(new Set<string>())
  const walkAmountRef = useRef(0)
  const timeRef = useRef(0)
  const wheelSpinRef = useRef(0)
  const steerAngleRef = useRef(0)

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if ('wasd'.includes(k) && k.length === 1) keysRef.current.add(k)
    }
    const onUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase())
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  useFrame((_, delta) => {
    const { state: mode, progress } = useTransformerStore.getState()
    const root = rootRef.current
    const p = partRefs.current
    if (!root || !p) return

    // Ground offset: lower robot so feet touch ground (body at y=0.3 but feet need body at y=0.02)
    root.position.y = -0.28 * progress

    // === CAR DRIVING ===
    if (mode === 'car') {
      const keys = keysRef.current

      // Steering (A = left, D = right)
      let steerInput = 0
      if (keys.has('a')) steerInput += 1
      if (keys.has('d')) steerInput -= 1

      // Throttle (W = forward, S = reverse)
      let throttle = 0
      if (keys.has('w')) throttle += 1
      if (keys.has('s')) throttle -= 1

      // Apply steering
      root.rotation.y += steerInput * CAR_STEER_SPEED * delta

      // Apply throttle along car's forward direction
      const speed = throttle * CAR_SPEED
      if (speed !== 0) {
        carForward.set(Math.sin(root.rotation.y), 0, Math.cos(root.rotation.y))
        root.position.x += carForward.x * speed * delta
        root.position.z += carForward.z * speed * delta
        useTransformerStore.setState({ walkPosition: [root.position.x, root.position.z] })
      }

      // Spin wheels proportional to speed
      wheelSpinRef.current += speed * delta * WHEEL_SPIN_FACTOR
      for (const id of WHEEL_IDS) {
        const wheel = p[id]
        if (wheel) wheel.rotation.x = wheelSpinRef.current
      }

      // Front wheel steering visual
      steerAngleRef.current = THREE.MathUtils.lerp(
        steerAngleRef.current,
        steerInput * FRONT_WHEEL_TURN,
        delta * 8,
      )
      for (const id of ['rearWheelL', 'rearWheelR']) {
        const wheel = p[id]
        if (wheel) wheel.rotation.y = steerAngleRef.current
      }

      return
    }

    // === ROBOT WALKING ===
    const keys = keysRef.current

    // Steering (A/D rotate robot)
    let steerInput = 0
    if (keys.has('a')) steerInput += 1
    if (keys.has('d')) steerInput -= 1
    if (mode === 'robot') {
      root.rotation.y += steerInput * ROT_SPEED * delta
    }

    // Forward/backward along robot's facing direction
    let throttle = 0
    if (keys.has('w')) throttle += 1
    if (keys.has('s')) throttle -= 1

    const isMoving = mode === 'robot' && throttle !== 0

    // Smooth fade in/out
    if (isMoving) {
      walkAmountRef.current = Math.min(1, walkAmountRef.current + delta * FADE_SPEED)
    } else {
      walkAmountRef.current = Math.max(0, walkAmountRef.current - delta * FADE_SPEED)
    }

    const amt = walkAmountRef.current

    // No walking — reset all limb rotations
    if (amt === 0) {
      for (const id of RESET_IDS) {
        const g = p[id]
        if (g) g.rotation.x = 0
      }
      const body = p['body']
      if (body) {
        body.rotation.x = 0
        body.rotation.z = 0
      }
      return
    }

    // Movement
    if (isMoving) {
      carForward.set(Math.sin(root.rotation.y), 0, Math.cos(root.rotation.y))
      root.position.x += carForward.x * throttle * WALK_SPEED * delta
      root.position.z += carForward.z * throttle * WALK_SPEED * delta
      useTransformerStore.setState({
        walkPosition: [root.position.x, root.position.z],
      })
    }

    // Forward kinematics chain
    timeRef.current += delta
    const phase = -timeRef.current * ANIM_SPEED
    const rPhase = phase + Math.PI // opposite phase for contralateral limbs

    // === LEFT LEG: thigh → shin → foot ===
    const thighLA = Math.sin(phase) * LEG_SWING * amt
    const kneeLBend = Math.max(0, Math.sin(phase)) * -SHIN_BEND * amt
    const shinLA = thighLA + kneeLBend // absolute angle (knee fold relative to thigh)
    const footLBend = Math.max(0, -Math.sin(phase)) * FOOT_TILT * amt // plantarflex during swing
    const footLA = shinLA + footLBend

    let kneeDy = 0, kneeDz = 0
    const thighL = p['robotThighL']
    if (thighL) [kneeDy, kneeDz] = swingSegment(thighL, H.robotThighL, thighLA, 0, 0)

    let ankleDy = 0, ankleDz = 0
    const shinL = p['robotShinL']
    if (shinL) [ankleDy, ankleDz] = swingSegment(shinL, H.robotShinL, shinLA, kneeDy, kneeDz)

    const footL = p['robotFootL']
    if (footL) swingSegment(footL, H.robotFootL, footLA, ankleDy, ankleDz)

    // Left rear wheel — follows knee
    const rwL = p['rearWheelL']
    if (rwL) {
      rwL.rotation.x = thighLA
      rwL.position.y += kneeDy
      rwL.position.z += kneeDz
    }

    // Left knee joint — follows knee displacement
    const jKneeL = p['jointKneeL']
    if (jKneeL) { jKneeL.position.y += kneeDy; jKneeL.position.z += kneeDz }

    // === RIGHT LEG: opposite phase ===
    const thighRA = Math.sin(rPhase) * LEG_SWING * amt
    const kneeRBend = Math.max(0, Math.sin(rPhase)) * -SHIN_BEND * amt
    const shinRA = thighRA + kneeRBend
    const footRBend = Math.max(0, -Math.sin(rPhase)) * FOOT_TILT * amt
    const footRA = shinRA + footRBend

    let kneeRDy = 0, kneeRDz = 0
    const thighR = p['robotThighR']
    if (thighR) [kneeRDy, kneeRDz] = swingSegment(thighR, H.robotThighR, thighRA, 0, 0)

    let ankleRDy = 0, ankleRDz = 0
    const shinR = p['robotShinR']
    if (shinR) [ankleRDy, ankleRDz] = swingSegment(shinR, H.robotShinR, shinRA, kneeRDy, kneeRDz)

    const footR = p['robotFootR']
    if (footR) swingSegment(footR, H.robotFootR, footRA, ankleRDy, ankleRDz)

    // Right rear wheel — follows knee
    const rwR = p['rearWheelR']
    if (rwR) {
      rwR.rotation.x = thighRA
      rwR.position.y += kneeRDy
      rwR.position.z += kneeRDz
    }

    // Right knee joint — follows knee displacement
    const jKneeR = p['jointKneeR']
    if (jKneeR) { jKneeR.position.y += kneeRDy; jKneeR.position.z += kneeRDz }

    // === LEFT ARM (contralateral with right leg): upper arm → forearm → fist ===
    const upperArmLA = Math.sin(rPhase) * ARM_SWING * amt
    const elbowLBend = Math.max(0, Math.sin(rPhase)) * -FOREARM_BEND * amt
    const forearmLA = upperArmLA + elbowLBend

    let elbowLDy = 0, elbowLDz = 0
    const upperArmL = p['robotUpperArmL']
    if (upperArmL) [elbowLDy, elbowLDz] = swingSegment(upperArmL, H.robotUpperArmL, upperArmLA, 0, 0)

    let wristLDy = 0, wristLDz = 0
    const forearmL = p['robotForearmL']
    if (forearmL) [wristLDy, wristLDz] = swingSegment(forearmL, H.robotForearmL, forearmLA, elbowLDy, elbowLDz)

    const fistL = p['robotFistL']
    if (fistL) {
      fistL.rotation.x = forearmLA
      fistL.position.y += wristLDy + H.robotFistL * (1 - Math.cos(forearmLA))
      fistL.position.z += wristLDz + H.robotFistL * Math.sin(forearmLA)
    }

    // Left elbow joint — follows elbow displacement
    const jElbowL = p['jointElbowL']
    if (jElbowL) { jElbowL.position.y += elbowLDy; jElbowL.position.z += elbowLDz }

    // === RIGHT ARM (contralateral with left leg) ===
    const upperArmRA = Math.sin(phase) * ARM_SWING * amt
    const elbowRBend = Math.max(0, Math.sin(phase)) * -FOREARM_BEND * amt
    const forearmRA = upperArmRA + elbowRBend

    let elbowRDy = 0, elbowRDz = 0
    const upperArmR = p['robotUpperArmR']
    if (upperArmR) [elbowRDy, elbowRDz] = swingSegment(upperArmR, H.robotUpperArmR, upperArmRA, 0, 0)

    let wristRDy = 0, wristRDz = 0
    const forearmR = p['robotForearmR']
    if (forearmR) [wristRDy, wristRDz] = swingSegment(forearmR, H.robotForearmR, forearmRA, elbowRDy, elbowRDz)

    const fistR = p['robotFistR']
    if (fistR) {
      fistR.rotation.x = forearmRA
      fistR.position.y += wristRDy + H.robotFistR * (1 - Math.cos(forearmRA))
      fistR.position.z += wristRDz + H.robotFistR * Math.sin(forearmRA)
    }

    // Right elbow joint — follows elbow displacement
    const jElbowR = p['jointElbowR']
    if (jElbowR) { jElbowR.position.y += elbowRDy; jElbowR.position.z += elbowRDz }

    // Body dynamics: forward lean + vertical bob + lateral sway
    const body = p['body']
    if (body) {
      body.rotation.x = -0.08 * amt
      body.rotation.z = Math.sin(phase) * 0.04 * amt
      body.position.y += Math.abs(Math.sin(phase * 2)) * 0.12 * amt
    }
  })
}
