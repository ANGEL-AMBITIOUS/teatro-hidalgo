import type { Show, Funcion } from '@/lib/types'
import Link from 'next/link'

function formatMonth(fecha: string) {
  const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
  const d = new Date(fecha + 'T12:00:00')
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function ShowHero({ show, funcion }: { show: Show; funcion?: Funcion }) {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', paddingTop: '64px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden',
      background: show.image_hero_url
        ? `linear-gradient(to bottom, rgba(12,26,31,0.55) 0%, rgba(12,26,31,0.75) 60%, rgba(12,26,31,1) 100%), url(${show.image_hero_url}) center/cover no-repeat`
        : 'linear-gradient(135deg, #0c1a1f 0%, #122530 50%, #0c1a1f 100%)',
    }}>
      {/* Decorative overlay pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '4rem 2rem 6rem' }}>
        {/* Date badge */}
        {funcion && (
          <div style={{
            display: 'inline-block', border: '1px solid var(--gold)',
            color: 'var(--gold)', padding: '0.35rem 1.25rem',
            fontFamily: 'Barlow Condensed', fontWeight: 600, fontSize: '0.8rem',
            letterSpacing: '0.2em', marginBottom: '2rem', borderRadius: '1px',
          }}>
            {formatMonth(funcion.fecha)} &bull; {funcion.venue?.name?.toUpperCase() ?? 'TEATRO HIDALGO'}
          </div>
        )}

        {/* Main title */}
        <h1 className="font-display" style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.95,
          color: '#fff', marginBottom: '1.5rem', maxWidth: '1000px', margin: '0 auto 1.5rem',
          whiteSpace: 'nowrap',
        }}>
          {show.title}
        </h1>

        {/* Subtitle */}
        {show.subtitle && (
          <p style={{
            color: 'rgba(240,234,216,0.75)', fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '580px', margin: '0 auto 0.75rem', lineHeight: 1.5,
            fontStyle: 'italic',
          }}>
            {show.subtitle}
          </p>
        )}

        {/* Artist */}
        {show.artist && (
          <p className="font-display" style={{
            fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', color: 'rgba(255,255,255,0.6)',
            marginBottom: '2.5rem', letterSpacing: '0.1em',
          }}>
            {show.artist}
          </p>
        )}

        {/* CTA */}
        <Link href={`/${show.slug}/boletos`} className="btn-gold" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
          COMPRAR BOLETOS →
        </Link>
      </div>
    </section>
  )
}
