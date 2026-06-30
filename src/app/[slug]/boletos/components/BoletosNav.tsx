import Link from 'next/link'

export default function BoletosNav({ slug, title }: { slug: string; title: string }) {
  return (
    <nav
      aria-label="Navegación boletos"
      className="show-nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(12,26,31,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}
    >
      <Link href="/" aria-label="Ir al inicio de Teatro Hidalgo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <div style={{ width: 32, height: 32, background: 'var(--gold)', borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 800, color: '#0c1a1f', fontFamily: 'var(--font-bebas)' }}>
          TH
        </div>
        <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '1rem',
          color: 'var(--cream)', letterSpacing: '0.05em', lineHeight: 1.1 }}>
          TEATRO<br />
          <span style={{ fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.15em', color: 'var(--muted)' }}>
            HIDALGO IGNACIO RETES
          </span>
        </div>
      </Link>
      <Link
        href={`/${slug}`}
        className="btn-outline"
        style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
        aria-label={`Volver a ${title}`}
      >
        ← VOLVER AL SHOW
      </Link>
    </nav>
  )
}
