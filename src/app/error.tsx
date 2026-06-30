'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Teatro Hidalgo]', error)
  }, [error])

  return (
    <div style={{
      background: 'var(--bg-deep)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center',
    }}>
      <Link href="/" aria-label="Teatro Hidalgo — inicio" style={{ textDecoration: 'none', marginBottom: '3rem' }}>
        <span style={{
          fontFamily: 'var(--font-bebas)', fontSize: '1.1rem',
          color: 'var(--gold)', letterSpacing: '0.2em',
        }}>
          TEATRO HIDALGO
        </span>
      </Link>

      <h1 style={{
        fontFamily: 'var(--font-bebas)', fontWeight: 900,
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#fff',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        margin: '0 0 0.75rem',
      }}>
        Algo salió mal
      </h1>

      <p style={{
        color: 'var(--muted)', fontSize: '0.9rem',
        maxWidth: '360px', lineHeight: 1.6,
        marginBottom: '2.5rem',
      }}>
        Hubo un error al cargar esta página. Puedes intentar de nuevo o regresar a la cartelera.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            fontFamily: 'var(--font-bebas)', fontSize: '0.9rem',
            background: 'var(--gold)', color: '#0c1a1f',
            padding: '0.875rem 2rem', border: 'none',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer', minHeight: '44px',
          }}
        >
          Intentar de nuevo
        </button>
        <Link href="/" style={{
          fontFamily: 'var(--font-bebas)', fontSize: '0.9rem',
          border: '1px solid var(--border)', color: 'var(--muted)',
          padding: '0.875rem 2rem', textDecoration: 'none',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', minHeight: '44px',
        }}>
          Ver cartelera
        </Link>
      </div>

      <div aria-hidden style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '3px', background: '#c0392b', opacity: 0.5,
      }} />
    </div>
  )
}
