'use client'
import Link from 'next/link'

export default function ShowNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="show-nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(12,26,31,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}
    >
      <Link aria-label="Ir al inicio de Teatro Hidalgo" href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <div style={{ width: 32, height: 32, background: 'var(--gold)', borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 800, color: '#0c1a1f', fontFamily: 'Barlow Condensed' }}>
          TH
        </div>
        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem',
          color: 'var(--cream)', letterSpacing: '0.05em', lineHeight: 1.1 }}>
          TEATRO<br />
          <span style={{ fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.15em', color: 'var(--muted)' }}>
            HIDALGO IGNACIO RETES
          </span>
        </div>
      </Link>
      <div className="show-nav-actions" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" className="btn-gold" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
          VER CARTELERA
        </Link>
      </div>
    </nav>
  )
}
