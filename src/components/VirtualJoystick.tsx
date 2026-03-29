import { useRef, useEffect } from 'react'

const DEAD_ZONE = 0.25

function pressKeys(active: Set<string>, next: Set<string>) {
  active.forEach(k => {
    if (!next.has(k)) window.dispatchEvent(new KeyboardEvent('keyup', { key: k }))
  })
  next.forEach(k => {
    if (!active.has(k)) window.dispatchEvent(new KeyboardEvent('keydown', { key: k }))
  })
}

export function VirtualJoystick() {
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const activeKeys = useRef(new Set<string>())
  const dragging = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const thumb = thumbRef.current
    if (!container || !thumb) return

    const calcOffset = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const maxR = rect.width / 2 - 24
      let dx = clientX - cx
      let dy = clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > maxR) { dx = (dx / dist) * maxR; dy = (dy / dist) * maxR }
      thumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
      return { nx: dx / maxR, ny: dy / maxR }
    }

    const emit = (nx: number, ny: number) => {
      const next = new Set<string>()
      if (nx < -DEAD_ZONE) next.add('a')
      if (nx > DEAD_ZONE) next.add('d')
      if (ny < -DEAD_ZONE) next.add('w')
      if (ny > DEAD_ZONE) next.add('s')
      pressKeys(activeKeys.current, next)
      activeKeys.current = next
    }

    const release = () => {
      dragging.current = false
      pressKeys(activeKeys.current, new Set())
      activeKeys.current.clear()
      thumb.style.transform = 'translate(-50%, -50%)'
    }

    // --- Touch events ---
    let activeTouchId: number | null = null

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (activeTouchId !== null) return
      const t = e.changedTouches[0]
      activeTouchId = t.identifier
      const o = calcOffset(t.clientX, t.clientY)
      if (o) emit(o.nx, o.ny)
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (activeTouchId === null) return
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === activeTouchId) {
          const o = calcOffset(e.touches[i].clientX, e.touches[i].clientY)
          if (o) emit(o.nx, o.ny)
          return
        }
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === activeTouchId) {
          activeTouchId = null
          release()
          return
        }
      }
    }

    // --- Mouse events ---
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      dragging.current = true
      const o = calcOffset(e.clientX, e.clientY)
      if (o) emit(o.nx, o.ny)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const o = calcOffset(e.clientX, e.clientY)
      if (o) emit(o.nx, o.ny)
    }

    const onMouseUp = () => {
      if (dragging.current) release()
    }

    container.addEventListener('touchstart', onTouchStart, { passive: false })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', onTouchEnd)
    container.addEventListener('touchcancel', () => { activeTouchId = null; release() })

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      pressKeys(activeKeys.current, new Set())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', bottom: 40, left: 40, width: 130, height: 130,
        borderRadius: '50%', background: 'rgba(0,0,0,0.4)',
        border: '3px solid rgba(0,0,0,0.3)',
        touchAction: 'none', zIndex: 100, cursor: 'pointer',
      }}
    >
      <div
        ref={thumbRef}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.55)',
          border: '2px solid rgba(0,0,0,0.35)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
