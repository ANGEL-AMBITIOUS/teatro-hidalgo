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
          {['Ver shows', 'Política de privacidad', 'Términos y condiciones'].map(t => (
            <Link key={t} href="#" style={{ color: 'var(--muted)', textDecoration: 'none',
              fontFamily: 'Barlow Condensed', fontSize: '0.8rem', letterSpacing: '0.08em' }}>
              {t}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
