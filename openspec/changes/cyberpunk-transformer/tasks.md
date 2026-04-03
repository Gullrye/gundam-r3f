## 1. Project Scaffold

- [x] 1.1 Initialize Vite + React + TypeScript project with required dependencies (@react-three/fiber, @react-three/drei, @react-three/postprocessing, three, zustand, howler)
- [x] 1.2 Set up basic R3F Canvas with scene, camera, and lights
- [x] 1.3 Add ground plane with shadow reception
- [x] 1.4 Add OrbitControls from drei

## 2. Car Model — Core Parts

- [x] 2.1 Build ChassisUpper mesh (upper sliding section) with car position
- [x] 2.2 Build ChassisLower mesh (lower sliding section) with car position
- [x] 2.3 Build Hood mesh with HoodPivot (pivot at back edge) and car position
- [x] 2.4 Build Windshield mesh (planar) with WindshieldPivot and car position
- [x] 2.5 Build RoofShell mesh with RoofPivot (pivot at back edge) and hidden Head mesh inside
- [x] 2.6 Build Grille mesh with GrillePivot and car position
- [x] 2.7 Build Headlight meshes (x2) at front with emissive material

## 3. Car Model — Limbs

- [x] 3.1 Build LeftArmGroup: DoorUpperPivot + DoorUpper mesh (upper arm segment)
- [x] 3.2 Build LeftArmGroup: ElbowJoint + DoorLowerPivot + DoorLower mesh (forearm segment)
- [x] 3.3 Build LeftArmGroup: ExhaustPipe mesh (hidden weapon)
- [x] 3.4 Build RightArmGroup (mirror of left)
- [x] 3.5 Build LeftLegGroup: TrunkLeftHalf mesh, SideSkirtLeft mesh, RearWheelLeft mesh
- [x] 3.6 Build RightLegGroup (mirror of left)

## 4. Car Model — Details

- [x] 4.1 Build FrontWheel meshes (x2) with shoulder pivot positions + FenderConnector meshes
- [x] 4.2 Assemble full TransformerGroup hierarchy (CoreGroup, UpperBodyGroup, ArmGroups, LegGroups)
- [x] 4.3 Verify all parts form a complete sports car silhouette in car mode
- [x] 4.4 Add cyberpunk materials: dark metallic base, chrome highlights, neon cyan emissive accents

## 5. Cyberpunk Visuals

- [x] 5.1 Set up lighting system: ambient light, directional key light, fill light from below
- [x] 5.2 Add underglow neon strip mesh at car bottom
- [x] 5.3 Create NeonEffectsGroup with joint energy ring meshes (hidden in car mode)
- [x] 5.4 Set up selective Bloom post-processing using drei Selection + postprocessing

## 6. Transform Animation System

- [x] 6.1 Create Zustand store: state (car/robot/to-car/to-robot), progress (0-1), transform actions, lock logic
- [x] 6.2 Define robotConfig for every part (position, rotation, scale relative to its pivot)
- [x] 6.3 Implement phase-based timeline system with 20-30% overlap (5 phases, 2.5s total)
- [x] 6.4 Implement easing functions: ease-out, ease-in, ease-in-out, spring with overshoot
- [x] 6.5 Implement lerp interpolation per part using phase progress and easing
- [x] 6.6 Implement camera reframing: interpolate target and distance based on transform progress

## 7. Transform — Part Animations

- [x] 7.1 Wire Phase 1: car body lift + neon flash
- [x] 7.2 Wire Phase 2: chassis telescope + hood flip to chest + headlights become eyes
- [x] 7.3 Wire Phase 3: doors swing to arms + wheels to shoulders + trunk splits to legs
- [x] 7.4 Wire Phase 4: roof opens to reveal head + grille folds to mask + exhaust pipes deploy
- [x] 7.5 Wire Phase 5: spring settling + neon fade-in + hero pose

## 8. Reverse Transform

- [x] 8.1 Implement reverse transformation: same phases in reverse order, progress 1→0
- [x] 8.2 Verify car-to-robot-to-car roundtrip produces identical start/end states

## 9. Sound System

- [x] 9.1 Integrate Howler.js, create sound manager hook
- [x] 9.2 Implement engine idle loop for car mode
- [x] 9.3 Implement transformation SFX (single 2.5s pre-rendered clip)
- [x] 9.4 Implement mechanical heartbeat loop for robot mode
- [x] 9.5 Wire sound state transitions: fade out current loop, play transform SFX, fade in new loop

## 10. Idle Animations

- [x] 10.1 Implement car idle: suspension bob (vertical oscillation), wheel rotation, neon pulse
- [x] 10.2 Implement robot idle: chest breathing (scale oscillation), weight shift, head slow tracking

## 11. UI and Polish

- [x] 11.1 Build transform button UI: shows available action, disabled during transformation
- [x] 11.2 Build state indicator UI (CAR MODE / ROBOT MODE / TRANSFORMING...)
- [x] 11.3 Build debug transformation scrubber slider (0-1 progress override)
- [x] 11.4 Overall visual polish: material tuning, bloom threshold adjustment, animation timing refinement
- [x] 11.5 Performance pass: verify 60fps target, optimize draw calls if needed
