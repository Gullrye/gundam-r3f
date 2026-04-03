import { useTransformerStore } from '../store/useTransformerStore'
import { triggerTransformGlobal } from '../hooks/useTransformAnimation'

export function UI() {
  const { state, progress, debugMode, setProgress, setDebugMode } =
    useTransformerStore()

  const isLocked = state === 'to-car' || state === 'to-robot'
  const label = state === 'robot' || state === 'to-car' ? '→ CAR' : '→ ROBOT'

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* State indicator */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: state === 'to-car' || state === 'to-robot' ? '#ffaa00' : '#00fff0',
          fontFamily: 'monospace',
          fontSize: 14,
          letterSpacing: 4,
          textShadow: '0 0 10px currentColor',
        }}
      >
        {state === 'car' && 'CAR MODE'}
        {state === 'robot' && 'ROBOT MODE'}
        {(state === 'to-robot' || state === 'to-car') && `TRANSFORMING... ${Math.round(progress * 100)}%`}
      </div>

      {/* Transform button */}
      <button
        onClick={triggerTransformGlobal}
        disabled={isLocked}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          padding: '12px 40px',
          border: `1px solid ${isLocked ? '#333' : '#00fff0'}`,
          background: isLocked ? 'rgba(0,0,0,0.5)' : 'rgba(0,255,240,0.1)',
          color: isLocked ? '#555' : '#00fff0',
          fontFamily: 'monospace',
          fontSize: 16,
          letterSpacing: 3,
          cursor: isLocked ? 'not-allowed' : 'pointer',
          textShadow: isLocked ? 'none' : '0 0 10px #00fff0',
          boxShadow: isLocked ? 'none' : '0 0 20px rgba(0,255,240,0.2)',
          transition: 'all 0.3s',
        }}
      >
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

      {/* Debug scrubber slider */}
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
          <span style={{ color: '#555', fontFamily: 'monospace', fontSize: 11 }}>
            0
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(e) => {
              const val = parseFloat(e.target.value)
              // Set state to debug mode
              const currentState = useTransformerStore.getState().state
              if (currentState === 'car' || currentState === 'robot') {
                // Force into a transform state for scrubbing
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
          <span style={{ color: '#555', fontFamily: 'monospace', fontSize: 11 }}>
            1
          </span>
        </div>
      )}
    </div>
  )
}
