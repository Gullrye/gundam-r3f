import type { JointAngles, PoseName } from '../types'

export const poses: Record<PoseName, JointAngles> = {
  stand: {
    headRotX: 0, headRotY: 0,
    leftShoulderRotX: 0, leftShoulderRotZ: 0.1, leftElbowRotX: 0,
    rightShoulderRotX: 0, rightShoulderRotZ: -0.1, rightElbowRotX: 0,
    leftHipRotX: 0, leftKneeRotX: 0,
    rightHipRotX: 0, rightKneeRotX: 0,
  },
  fighting: {
    headRotX: 0, headRotY: -0.2,
    leftShoulderRotX: -0.5, leftShoulderRotZ: 0.3, leftElbowRotX: -1.2,
    rightShoulderRotX: -1.5, rightShoulderRotZ: -0.2, rightElbowRotX: -1.5,
    leftHipRotX: -0.1, leftKneeRotX: 0,
    rightHipRotX: 0.3, rightKneeRotX: -0.4,
  },
  flying: {
    headRotX: -0.1, headRotY: 0,
    leftShoulderRotX: -0.8, leftShoulderRotZ: 0.6, leftElbowRotX: -0.3,
    rightShoulderRotX: -0.8, rightShoulderRotZ: -0.6, rightElbowRotX: -0.3,
    leftHipRotX: 0.2, leftKneeRotX: -0.6,
    rightHipRotX: 0.4, rightKneeRotX: -0.8,
  },
  walking: {
    headRotX: 0, headRotY: 0,
    leftShoulderRotX: 0, leftShoulderRotZ: 0.1, leftElbowRotX: 0,
    rightShoulderRotX: 0, rightShoulderRotZ: -0.1, rightElbowRotX: 0,
    leftHipRotX: 0, leftKneeRotX: 0,
    rightHipRotX: 0, rightKneeRotX: 0,
  },
}
