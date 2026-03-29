# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — start dev server (Vite, default port 5173)
- `pnpm build` — production build, type-check included
- `pnpm preview` — preview production build

No test framework is configured.

## Architecture

Interactive 3D RX-78-2 Gundam built with **React Three Fiber + Drei**. Each body part is a standalone R3F component constructed from basic Three.js box geometries.

### Animation Pattern (important)

Body parts do **not** receive rotation props. Instead:

1. `Gundam.tsx` exports a shared `jointRef` (mutable `{ current: JointAngles }`)
2. In `Gundam`'s `useFrame`, target joint angles are lerped and written to `jointRef.current`
3. Each body part component (`Head`, `Arm`, `Leg`) reads from `jointRef` in its **own** `useFrame` and directly mutates Three.js `group.rotation`

This is necessary because `useFrame` ref mutations don't trigger React re-renders — each part must self-update imperatively.

### Movement

WASD/QE movement is camera-relative:
- **W/S** — forward/backward relative to camera facing direction
- **A/D** — strafe left/right relative to camera
- **Q/E** — rotate Gundam in place
- Gundam auto-rotates to face movement direction when walking

Walking animation uses sinusoidal joint oscillation via `getWalkAngles(time)`.

### State Flow

- `App.tsx` owns state: `pose` (PoseName), `autoRotate` (boolean), `colors` (ColorConfig)
- `ControlPanel.tsx` is a fixed-position HTML overlay for pose switching, color pickers, and auto-rotate toggle
- Pose presets defined in `src/constants/poses.ts` as static `JointAngles` values
