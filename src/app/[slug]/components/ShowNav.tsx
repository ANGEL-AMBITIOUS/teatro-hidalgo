'use client'
import Link from 'next/link'
import { useState } from 'react'

const FBIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const NAV_LINKS = [
  { label: 'Cartelera', href: '/#cartelera' },
  { label: 'El Teatro', href: '/#el-teatro' },
]

const SOCIAL = [
  { label: 'Facebook de Teatro Hidalgo', href: 'https://www.facebook.com/profile.php?id=61579086620893', Icon: FBIcon },
  { label: 'Instagram de Teatro Hidalgo', href: 'https://www.instagram.com/teatro_hidalgo/', Icon: IGIcon },
]

export default function ShowNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className="show-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(12,26,31,0.88)', backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Teatro Hidalgo — inicio" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, background: 'var(--gold)', borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, color: '#0c1a1f', fontFamily: 'var(--font-bebas)',
          }}>
            TH
          </div>
          <div style={{
            fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '1rem',
            color: 'var(--cream)', letterSpacing: '0.05em', lineHeight: 1.1,
          }}>
            TEATRO<br />
            <span style={{ fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.15em', color: 'var(--muted)' }}>
              HIDALGO
            </span>
          </div>
        </Link>

        {/* Desktop links + CTA */}
        <div className="show-nav-actions" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{
              color: 'var(--cream)', textDecoration: 'none',
              fontFamily: 'var(--font-bebas)', fontSize: '0.95rem', letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/#cartelera" className="btn-gold" style={{ fontSize: '0.85rem', padding: '0.5rem 1.5rem', minHeight: 'auto' }}>
            VER CARTELERA
          </Link>
        </div>

        {/* Hamburger (mobile only — shown via CSS) */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream)', padding: '0.5rem' }}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49,
          background: 'rgba(8,15,18,0.98)', backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{
              color: 'var(--cream)', textDecoration: 'none',
              fontFamily: 'var(--font-bebas)', fontSize: '1.75rem', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            {SOCIAL.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-bebas)', fontSize: '0.85rem', letterSpacing: '0.1em', textDecoration: 'none',
                  textTransform: 'uppercase' }}>
                <Icon />
                {label.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
