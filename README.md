# 3D Gundam RX-78-2

An interactive 3D RX-78-2 Gundam robot built with React Three Fiber. Walk around, switch poses, customize colors, and orbit the camera.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Controls

| Key | Action |
|-----|--------|
| W / S | Move forward / backward (camera-relative) |
| A / D | Strafe left / right (camera-relative) |
| Q / E | Rotate in place |
| Mouse drag | Orbit camera |

## Features

- **Pose switching** — Standing, Fighting, Flying with smooth interpolation
- **Walking animation** — Sinusoidal joint oscillation with body bob
- **Color customization** — 5 color channels (primary, secondary, accent, dark, yellow)
- **Auto-rotate** — Slow Y-axis rotation for showcase viewing

## Tech Stack

React 19 + TypeScript + Vite + React Three Fiber + Drei + Three.js
