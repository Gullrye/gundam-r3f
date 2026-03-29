import { ContactShadows, Grid, Environment, OrbitControls } from '@react-three/drei'

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <Environment preset="city" background={false} environmentIntensity={0.3} />
      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={20} blur={2} far={4} />
      <Grid infiniteGrid fadeDistance={50} cellColor="#444" sectionColor="#666" />
      <OrbitControls makeDefault />
    </>
  )
}
