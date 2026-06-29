import Link from 'next/link'

export default function ShowFooter() {
  return (
    <footer style={{
      background: '#080f12', borderTop: '1px solid var(--border)',
      padding: '2.5rem 2rem', marginTop: '4rem',
    }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.75rem',
          letterSpacing: '0.15em', color: 'var(--muted)' }}>
          © {new Date().getFullYear()} TEATRO HIDALGO IGNACIO RETES · TODOS LOS DERECHOS RESERVADOS
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Ver shows', href: '/' },
            { label: 'Política de privacidad', href: '#' },
            { label: 'Términos y condiciones', href: '#' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{ color: 'var(--muted)', textDecoration: 'none',
              fontFamily: 'Barlow Condensed', fontSize: '0.8rem', letterSpacing: '0.08em' }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
