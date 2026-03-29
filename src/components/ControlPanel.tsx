import type { PoseName, ColorConfig } from '../types'

interface ControlPanelProps {
  pose: PoseName
  onPoseChange: (pose: PoseName) => void
  autoRotate: boolean
  onAutoRotateChange: (v: boolean) => void
  colors: ColorConfig
  onColorChange: (key: keyof ColorConfig, value: string) => void
}

const POSES: { name: PoseName; label: string }[] = [
  { name: 'stand', label: 'Standing' },
  { name: 'fighting', label: 'Fighting' },
  { name: 'flying', label: 'Flying' },
  { name: 'walking', label: 'Walking' },
]

const COLOR_LABELS: Record<keyof ColorConfig, string> = {
  primary: 'Primary (White)',
  secondary: 'Secondary (Blue)',
  accent: 'Accent (Red)',
  dark: 'Dark (Gray)',
  yellow: 'Yellow',
}

const keyStyle: React.CSSProperties = {
  background: '#333', color: '#fff', padding: '3px 8px', borderRadius: 4,
  fontSize: 11, fontWeight: 'bold', minWidth: 56, textAlign: 'center',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
  border: '1px solid rgba(255,255,255,0.15)',
}

export function ControlPanel({ pose, onPoseChange, autoRotate, onAutoRotateChange, colors, onColorChange }: ControlPanelProps) {
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', color: '#fff', padding: 16,
      borderRadius: 12, fontFamily: 'sans-serif', minWidth: 200,
      backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ marginBottom: 12, fontWeight: 'bold', fontSize: 14 }}>Gundam Controls</div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, marginBottom: 6, color: '#aaa' }}>Pose</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {POSES.map(p => (
            <button key={p.name} onClick={() => onPoseChange(p.name)} style={{
              padding: '4px 10px', fontSize: 12, borderRadius: 4, border: 'none', cursor: 'pointer',
              background: pose === p.name ? '#4a9eff' : '#333', color: '#fff',
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: '#aaa', display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={autoRotate} onChange={e => onAutoRotateChange(e.target.checked)} />
          Auto Rotate
        </label>
      </div>

      {/* Keyboard controls guide */}
      <div style={{ marginBottom: 12, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 10 }}>
        <div style={{ fontSize: 12, marginBottom: 8, color: '#aaa' }}>Keyboard Controls</div>
        {/* WASD visual keyboard layout */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginBottom: 6 }}>
          <div style={keyStyle}>W <span style={{ fontSize: 9, color: '#888' }}>Forward</span></div>
          <div style={{ display: 'flex', gap: 3 }}>
            <div style={keyStyle}>A <span style={{ fontSize: 9, color: '#888' }}>Left</span></div>
            <div style={keyStyle}>S <span style={{ fontSize: 9, color: '#888' }}>Back</span></div>
            <div style={keyStyle}>D <span style={{ fontSize: 9, color: '#888' }}>Right</span></div>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            <div style={keyStyle}>Q <span style={{ fontSize: 9, color: '#888' }}>Turn L</span></div>
            <div style={keyStyle}>E <span style={{ fontSize: 9, color: '#888' }}>Turn R</span></div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>Camera-relative movement</div>
      </div>

      <div>
        <div style={{ fontSize: 12, marginBottom: 6, color: '#aaa' }}>Colors</div>
        {(Object.keys(colors) as (keyof ColorConfig)[]).map(key => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <input
              type="color"
              value={colors[key]}
              onChange={e => onColorChange(key, e.target.value)}
              style={{ width: 24, height: 24, border: 'none', cursor: 'pointer', background: 'none' }}
            />
            <span style={{ fontSize: 11, color: '#ccc' }}>{COLOR_LABELS[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
