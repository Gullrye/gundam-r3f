import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Selection, Select } from '@react-three/postprocessing'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Scene } from './components/Scene'
import { UI } from './components/UI'
import { useCameraReframe } from './hooks/useCameraReframe'

function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  useCameraReframe(controlsRef)

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      minDistance={3}
      maxDistance={25}
      target={[0, 0.6, 0]}
    />
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [5, 3, -5], fov: 50 }}
        style={{ background: '#0a0a0f' }}
      >
        <Scene />
        <CameraRig />
        <Selection>
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.8}
              luminanceSmoothing={0.3}
              intensity={0.5}
              mipmapBlur
            />
          </EffectComposer>
        </Selection>
      </Canvas>
      <UI />
    </div>
  )
}

export { Select }
