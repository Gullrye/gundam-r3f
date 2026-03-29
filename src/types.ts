export interface JointAngles {
  headRotX: number
  headRotY: number
  leftShoulderRotX: number
  leftShoulderRotZ: number
  leftElbowRotX: number
  rightShoulderRotX: number
  rightShoulderRotZ: number
  rightElbowRotX: number
  leftHipRotX: number
  leftKneeRotX: number
  rightHipRotX: number
  rightKneeRotX: number
}

export interface ColorConfig {
  primary: string
  secondary: string
  accent: string
  dark: string
  yellow: string
}

export type PoseName = 'stand' | 'fighting' | 'flying' | 'walking'

export const DEFAULT_COLORS: ColorConfig = {
  primary: '#ffffff',
  secondary: '#1a3a8a',
  accent: '#cc2020',
  dark: '#3a3a3a',
  yellow: '#e8c820',
}
