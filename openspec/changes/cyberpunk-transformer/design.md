## Context

Greenfield web project — no existing codebase. Building a 3D interactive transformer experience from scratch using React Three Fiber. The core challenge is making a car that transforms into a robot where both states look intentional and the transformation animation is satisfying.

Key constraint: no external 3D models. All geometry is procedural (code-generated), which limits visual fidelity but gives full control over part decomposition and pivot points.

Unit system: 1 unit = 1 meter. Car body approximately 4.5m long, robot approximately 8-10m tall (broad Optimus Prime proportions).

## Goals / Non-Goals

**Goals:**
- Cyberpunk sports car that looks like a complete, intentional car
- Optimus Prime-style robot (broad chest, strong legs, heroic proportions)
- Smooth, cinematic transformation animation (~2.5s) with cascading phase overlap
- Satisfying mechanical feel: easing, spring settling, sound sync
- Interactive: orbit controls, one-click transform, debug scrubber
- Selective bloom for neon glow without muddying the whole scene

**Non-Goals:**
- Realistic PBR rendering or photorealistic models
- External GLTF/GLB model loading
- Mobile-first optimization (desktop target)
- Multi-character or scene complexity
- Networking / multiplayer

## Decisions

### 1. React Three Fiber over vanilla Three.js

**Choice:** R3F + drei + postprocessing
**Why:** Transformer is fundamentally a collection of composable parts. R3F's declarative component model maps naturally to the part hierarchy (Hood, Door, Wheel as separate components with their own configs). drei provides OrbitControls, helpers, and postprocessing integration out of the box.
**Alternative:** Vanilla Three.js gives more control but requires imperative scene management that scales poorly with 15+ independent animated parts.

### 2. Dual-config per part (carConfig + robotConfig) with lerp

**Choice:** Each part stores two sets of { position, rotation, scale }. Animation interpolates between them based on progress (0-1).
**Why:** Simple, debuggable, predictable. The debug scrubber slider maps directly to the progress value. Reversing the transformation is trivial (1 - progress).
**Alternative:** Morph targets — requires same topology across all parts, harder to debug, overkill for rigid-part animation.
**Alternative:** Skeletal animation — industry standard for character animation but adds rigging complexity and doesn't naturally handle parts splitting (trunk → two legs).

### 3. Part hierarchy with explicit pivot objects

**Choice:** Each rotating part is wrapped in a pivot Object3D (empty group) at the rotation origin point. The mesh is offset from the pivot.
**Why:** Three.js rotation is always around the object's local origin. To rotate the hood around its back edge, the pivot must be at the back edge with the hood mesh offset forward. Without explicit pivots, rotation calculations become complex and error-prone.
**Structure:**
```
TransformerGroup
  CoreGroup (chassis/waist — telescoping sections)
    ChassisUpper, ChassisLower
    NeonRings (independent mesh, hidden in car mode)
  UpperBodyGroup
    HoodPivot → Hood (chest)
    WindshieldPivot → Windshield (chest window)
    RoofPivot → RoofShell → Head (hidden inside roof)
    GrillePivot → Grille (face mask)
    Headlights (eyes)
    ShoulderWheels + FenderConnectors (left/right)
  LeftArmGroup / RightArmGroup (symmetric)
    DoorUpperPivot → DoorUpper (upper arm)
    ElbowJoint
    DoorLowerPivot → DoorLower (forearm)
    ExhaustPipe (weapon)
  LeftLegGroup / RightLegGroup (symmetric)
    TrunkHalf (left/right)
    SideSkirt
    RearWheel (foot)
  NeonEffectsGroup (independent layer)
```

### 4. Phased timeline with 20-30% overlap

**Choice:** 5 phases with staggered start times, each phase controlling a subset of parts.
**Why:** Sequential phases look robotic and stiff. Overlap creates cascading momentum — the transformation feels like a chain reaction.
**Timeline:**
- Phase 1 (0.0-0.4s): Prep — car lifts, neons flash
- Phase 2 (0.2-0.9s): Torso — chassis extends, hood flips to chest, eyes light
- Phase 3 (0.6-1.6s): Limbs — doors swing to arms, trunk splits to legs, wheels move
- Phase 4 (1.2-2.1s): Head+details — roof opens, grille becomes mask, weapons deploy
- Phase 5 (1.8-2.5s): Settle — spring physics, neon fade-in, hero pose

### 5. Corrected part mappings (from expert review)

Key corrections based on feasibility review:
- **Roof -> Head:** Roof doesn't fold into a head. Roof shell opens (hinged at back) to reveal a pre-modeled head stored inside. The head is always there, hidden in car mode.
- **Doors -> Arms:** Each door split into upper arm + forearm segments with visible elbow joint. Prevents the "door hanging off body" look.
- **Chassis -> Waist:** Telescoping overlapping sections that slide apart, not scale deformation. Prevents rubber-stretch look.
- **Neon effects:** Independent mesh layer, hidden in car mode, fades in during transformation. Not derived from underglow strip.

### 6. Selective Bloom via render layers

**Choice:** Use Three.js layers + selective bloom pass. Only objects on the bloom layer get post-processed.
**Why:** Global bloom makes the entire scene glow and muddies the cyberpunk aesthetic. Selective bloom ensures only emissive neon elements glow while the metallic body stays crisp.
**Implementation:** `@react-three/postprocessing` with `Selection` + `Select` components from drei.

### 7. Zustand for state management

**Choice:** Zustand store with state enum and progress float.
**Why:** Minimal API, no boilerplate. Animation loop reads progress from store. UI buttons dispatch state transitions.
**States:** `car` | `robot` | `to-car` | `to-robot`
**Lock:** State transitions blocked when in `to-*` states.

### 8. Pre-rendered transformation sound

**Choice:** Single audio file for the full transformation chain, not individual clips per phase.
**Why:** Avoids drift between animation progress and sound timing across different framerates. The sound is authored as one continuous 2.5s clip with built-in phase timing.
**Implementation:** Howler.js for normal playback. For reverse playback (robot-to-car), decode the audio file into a Web Audio API AudioBuffer, reverse the PCM channel data, and play via AudioBufferSourceNode. Only one source audio file is needed.

## Risks / Trade-offs

**[Procedural geometry looks blocky]** -> Lean into cyberpunk aesthetic: sharp edges, geometric forms, neon accents. Use chamfered edges where possible. The style covers for limited geometry complexity.

**[Z-fighting during transformation]** -> Parts pass through each other during intermediate frames. Mitigate with: (1) careful phase ordering so parts clear before others enter, (2) neon glow effects masking overlap moments, (3) render order hints.

**[Camera framing mismatch]** -> Car is ~4.5m wide, robot is ~10m tall. Camera must reframe during transformation. Use eased interpolation of camera target and distance based on transform progress.

**[Sound-animation sync drift]** -> Pre-rendered single audio file eliminates per-phase sync issues. Accept minor visual-audio offset on very slow devices.

**[Bloom performance]** -> Selective bloom reduces overdraw. If still heavy, provide quality toggle to disable postprocessing.

**[Mid-transformation interruption]** -> Block input during transformation (locked state). Prevents edge cases and keeps animation clean.

**[Gap visibility between parts]** -> Parts moving apart reveal structural gaps. Accept it as part of the mechanical aesthetic — real Transformers have visible panel lines. Neon edges at part boundaries can make gaps look intentional.
