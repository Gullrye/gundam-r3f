import { Transformer } from './Transformer'

export function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1.0} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={3.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-near={0.1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-4, 6, -4]} intensity={1.5} color="#4466ff" />
      <pointLight position={[0, 3, 4]} intensity={1.5} color="#00fff0" />
      <pointLight position={[0, 3, -4]} intensity={1.0} color="#ff00ff" />

      {/* Transformer */}
      <Transformer />

      {/* Ground plane */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.6}
        />
      </mesh>
    </>
  )
}
