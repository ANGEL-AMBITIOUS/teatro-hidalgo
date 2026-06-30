import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Página no encontrada · Teatro Hidalgo',
}

export default function NotFound() {
  return (
    <div style={{
      background: 'var(--bg-deep)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center',
    }}>
      {/* Logo */}
      <Link href="/" aria-label="Teatro Hidalgo — inicio" style={{ textDecoration: 'none', marginBottom: '3rem' }}>
        <span style={{
          fontFamily: 'var(--font-bebas)', fontSize: '1.1rem',
          color: 'var(--gold)', letterSpacing: '0.2em',
        }}>
          TEATRO HIDALGO
        </span>
      </Link>

      {/* 404 number */}
      <div style={{
        fontFamily: 'var(--font-bebas)', fontSize: 'clamp(7rem, 25vw, 14rem)',
        lineHeight: 0.85, color: 'rgba(212,175,55,0.12)',
        letterSpacing: '-0.02em', userSelect: 'none',
        position: 'relative',
      }}>
        404
      </div>

      <h1 style={{
        fontFamily: 'var(--font-bebas)', fontWeight: 900,
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#fff',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        margin: '1.5rem 0 0.75rem',
      }}>
        Página no encontrada
      </h1>

      <p style={{
        color: 'var(--muted)', fontSize: '0.95rem',
        maxWidth: '360px', lineHeight: 1.6,
        marginBottom: '2.5rem',
      }}>
        La función que buscas no está en cartelera o la URL ha cambiado.
      </p>

      <Link href="/" style={{
        fontFamily: 'var(--font-bebas)', fontSize: '0.9rem',
        background: 'var(--gold)', color: '#0c1a1f',
        padding: '0.875rem 2.5rem', textDecoration: 'none',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        display: 'inline-block', minHeight: '44px',
        lineHeight: '1.4',
      }}>
        Ver cartelera
      </Link>

      {/* subtle curtain decoration */}
      <div aria-hidden style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '3px', background: 'var(--gold)', opacity: 0.6,
      }} />
    </div>
  )
}
