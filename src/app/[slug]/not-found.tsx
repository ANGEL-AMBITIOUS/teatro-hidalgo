import Link from 'next/link'
import ShowNav from './components/ShowNav'
import ShowFooter from './components/ShowFooter'

export default function ShowNotFound() {
  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <ShowNav />

      <div style={{
        paddingTop: '80px', minHeight: 'calc(100vh - 80px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 2rem 4rem', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(5rem, 20vw, 10rem)',
          lineHeight: 0.85, color: 'rgba(212,175,55,0.1)',
          letterSpacing: '-0.02em', userSelect: 'none',
        }}>
          404
        </div>

        <h1 style={{
          fontFamily: 'var(--font-bebas)', fontWeight: 900,
          fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: '#fff',
          textTransform: 'uppercase', letterSpacing: '0.05em',
          margin: '1.5rem 0 0.75rem',
        }}>
          Función no encontrada
        </h1>

        <p style={{
          color: 'var(--muted)', fontSize: '0.9rem',
          maxWidth: '320px', lineHeight: 1.6,
          marginBottom: '2.5rem',
        }}>
          Este espectáculo no está disponible o la URL ha cambiado.
        </p>

        <Link href="/" style={{
          fontFamily: 'var(--font-bebas)', fontSize: '0.9rem',
          background: 'var(--gold)', color: '#0c1a1f',
          padding: '0.875rem 2.5rem', textDecoration: 'none',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          display: 'inline-block', minHeight: '44px', lineHeight: '1.4',
        }}>
          Ver cartelera
        </Link>
      </div>

      <ShowFooter />
    </div>
  )
}
