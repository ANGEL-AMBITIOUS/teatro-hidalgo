import type { Show, Funcion } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'

function formatMonth(fecha: string) {
  const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
  const d = new Date(fecha + 'T12:00:00')
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function ShowHero({ show, funcion }: { show: Show; funcion?: Funcion }) {
  return (
    <section className="show-hero" style={{
      position: 'relative', minHeight: '100vh', paddingTop: '64px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden',
      background: show.image_hero_url ? undefined : 'linear-gradient(135deg, #0c1a1f 0%, #122530 50%, #0c1a1f 100%)',
    }}>
      {/* LCP image — priority preload, WebP via Vercel CDN */}
      {show.image_hero_url && (
        <Image
          src={show.image_hero_url}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      )}
      {/* Scrim overlay */}
      {show.image_hero_url && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(12,26,31,0.35) 0%, rgba(12,26,31,0.55) 50%, rgba(12,26,31,0.95) 100%)',
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4rem 2rem 7rem' }}>
        {funcion && (
          <div className="hero-badge" style={{
            display: 'inline-block', border: '1px solid var(--gold)',
            color: 'var(--gold)', padding: '0.35rem 1.25rem',
            fontFamily: 'var(--font-bebas)', fontWeight: 600, fontSize: '0.8rem',
            letterSpacing: '0.2em', marginBottom: '2rem', borderRadius: '1px',
          }}>
            {formatMonth(funcion.fecha)} &bull; {funcion.venue?.name?.toUpperCase() ?? 'TEATRO HIDALGO'}
          </div>
        )}

        <h1 className="hero-title" style={{
          fontFamily: 'var(--font-bebas, "Bebas Neue", Impact, sans-serif)',
          fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em',
          fontSize: 'clamp(2.4rem, 7.4vw, 6.5rem)', lineHeight: 0.9,
          color: '#fff', margin: '0 auto 1.5rem',
          wordBreak: 'break-word',
          textShadow: '0 0 60px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)',
        }}>
          {show.title}
        </h1>

        {show.subtitle && (
          <p className="hero-subtitle" style={{
            color: 'rgba(240,234,216,0.85)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            maxWidth: '560px', margin: '0 auto 0.75rem', lineHeight: 1.6,
            fontStyle: 'italic',
          }}>
            {show.subtitle}
          </p>
        )}

        {show.artist && (
          <p className="font-display" style={{
            fontSize: 'clamp(1.4rem, 4vw, 2.8rem)', color: 'rgba(255,255,255,0.7)',
            marginBottom: '2.5rem', letterSpacing: '0.12em',
          }}>
            {show.artist}
          </p>
        )}

        <Link href={`/${show.slug}/boletos`} className="btn-gold" aria-label={`Comprar boletos para ${show.title}`} style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
          COMPRAR BOLETOS →
        </Link>
      </div>
    </section>
  )
}
