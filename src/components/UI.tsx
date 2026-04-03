import { useTransformerStore } from '../store/useTransformerStore'
import { triggerTransformGlobal } from '../hooks/useTransformAnimation'

export function UI() {
  const { state, progress, debugMode, setProgress, setDebugMode } =
    useTransformerStore()

  const isLocked = state === 'to-car' || state === 'to-robot'
  const label = state === 'robot' || state === 'to-car' ? '\u2192 CAR' : '\u2192 ROBOT'

  const btnStyle = (isActive: boolean) => ({
    position: 'absolute' as const,
    bottom: 40,
    left: '50%' as const,
    transform: 'translateX(-50%)',
    pointerEvents: 'auto' as const,
    padding: '12px 40px',
    border: `1px solid ${isActive ? '#333' : '#00fff0'}`,
    background: isActive ? 'rgba(0,0,0,0.5)' : 'rgba(0,255,240,0.1)',
    color: isActive ? '#555' : '#00fff0',
    fontFamily: 'monospace',
    fontSize: 16,
    letterSpacing: 3,
    cursor: isActive ? ('not-allowed' as const) : ('pointer' as const),
    textShadow: isActive ? 'none' : '0 0 10px #00fff0',
    boxShadow: isActive ? 'none' : '0 0 20px rgba(0,255,240,0.2)',
    transition: 'all 0.3s',
  })

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* State indicator */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: isLocked ? '#ffaa00' : '#00fff0',
          fontFamily: 'monospace',
          fontSize: 14,
          letterSpacing: 4,
          textShadow: '0 0 10px currentColor',
        }}
      >
        {state === 'car' && 'CAR MODE'}
        {state === 'robot' && 'ROBOT MODE \u2014 WASD to walk'}
        {(state === 'to-robot' || state === 'to-car') &&
          `TRANSFORMING... ${Math.round(progress * 100)}%`}
      </div>

      {/* Transform button */}
      <button onClick={triggerTransformGlobal} disabled={isLocked} style={btnStyle(isLocked)}>
        {label}
      </button>

      {/* Debug toggle */}
      <button
        onClick={() => setDebugMode(!debugMode)}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          pointerEvents: 'auto',
          padding: '4px 10px',
          border: '1px solid #333',
          background: debugMode ? 'rgba(255,170,0,0.2)' : 'rgba(0,0,0,0.5)',
          color: debugMode ? '#ffaa00' : '#555',
          fontFamily: 'monospace',
          fontSize: 11,
          cursor: 'pointer',
        }}
      >
        DEBUG
      </button>

      {/* Debug scrubber */}
      {debugMode && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 400,
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ color: '#555', fontFamily: 'monospace', fontSize: 11 }}>0</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(e) => {
              const val = parseFloat(e.target.value)
              const currentState = useTransformerStore.getState().state
              if (currentState === 'car' || currentState === 'robot') {
                if (val > 0 && currentState === 'car') {
                  useTransformerStore.setState({ state: 'to-robot', progress: val })
                } else if (val < 1 && currentState === 'robot') {
                  useTransformerStore.setState({ state: 'to-car', progress: val })
                }
              } else {
                setProgress(val)
              }
            }}
            style={{ flex: 1, accentColor: '#ffaa00' }}
          />
          <span style={{ color: '#555', fontFamily: 'monospace', fontSize: 11 }}>1</span>
        </div>
      )}
    </div>
  )
}
