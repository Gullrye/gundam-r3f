## Why

Build a web-based 3D interactive experience featuring a cyberpunk-styled sports car that can transform into an Optimus Prime-style robot (and back). This showcases advanced 3D web capabilities — procedural geometry, multi-phase animation, real-time post-processing, and interactive camera controls — all in the browser with no external models required.

Design philosophy: build the car first, then decompose each car part into a robot part. Each piece has dual identity (same mesh, two transform configurations), ensuring both states look intentional and the transformation is reversible without quality loss.

## What Changes

- New frontend project: React + Vite + TypeScript application
- Procedural 3D sports car model built from code geometry (BoxGeometry, CylinderGeometry, etc.), with each part as an independent component with defined pivot points
- Dual-transform configuration system: every part stores `carConfig` and `robotConfig` (position, rotation, scale)
- Multi-phase transformation animation engine with 20-30% phase overlap, easing functions, and spring physics for settling
- Cyberpunk visual style: dark metallic materials, neon glow effects (selective Bloom), cyberpunk color palette
- Interactive camera: OrbitControls for drag-to-rotate, automatic reframing during transformation
- Sound design: engine idle, transformation SFX chain, mechanical heartbeat
- Idle animations for both states (car: suspension bob, wheel spin, neon pulse; robot: breathing, weight shift, head tracking)
- Debug transformation scrubber slider (0-1 progress)
- State management via Zustand (car | robot | transforming-to-car | transforming-to-robot)

## Capabilities

### New Capabilities

- `car-model`: Procedural cyberpunk sports car model — geometry, materials, part decomposition, pivot points, and car-mode idle animations
- `transform-animation`: Multi-phase transformation system — dual configs per part, lerp engine with easing, phased timeline with overlap, spring settling, camera reframing, state management
- `cyberpunk-visuals`: Cyberpunk aesthetic — material system, selective Bloom post-processing, neon effects layer, lighting
- `sound-system`: Audio — engine idle loop, transformation SFX chain, mechanical heartbeat, sound state management
- `scene-controls`: Scene interaction — OrbitControls, transformation trigger button, debug scrubber slider, UI state indicator

### Modified Capabilities

## Impact

- New project: no existing code affected
- Dependencies: @react-three/fiber, @react-three/drei, @react-three/postprocessing, three, zustand, howler
- Browser requirements: WebGL 2.0 capable browser, desktop-first (mobile as stretch goal)
- Performance: selective bloom, shadow management needed for smooth 60fps
