import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { Gundam } from './components/Gundam'
import { ControlPanel } from './components/ControlPanel'
import { poses } from './constants/poses'
import { DEFAULT_COLORS } from './types'
import type { PoseName, ColorConfig } from './types'

export default function App() {
  const [pose, setPose] = useState<PoseName>('stand')
  const [autoRotate, setAutoRotate] = useState(false)
  const [colors, setColors] = useState<ColorConfig>(DEFAULT_COLORS)

  const handleColorChange = (key: keyof ColorConfig, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <Scene />
        <Gundam colors={colors} targetPose={poses[pose] ?? poses.stand} poseName={pose} autoRotate={autoRotate} />
      </Canvas>
      <ControlPanel
        pose={pose}
        onPoseChange={setPose}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
        colors={colors}
        onColorChange={handleColorChange}
      />
    </>
  )
}
