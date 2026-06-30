import Link from 'next/link'
import Image from 'next/image'
import type { Show } from '@/lib/types'

function nextFuncion(show: Show) {
  if (!show.funciones?.length) return null
  const onSale = show.funciones.filter(f => f.estado === 'on_sale')
  return onSale.sort((a, b) => a.fecha.localeCompare(b.fecha))[0] ?? show.funciones[0]
}

function formatDate(fecha: string) {
  const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
  const d = new Date(fecha + 'T12:00:00')
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function minPrice(show: Show) {
  const prices = show.price_sections?.map(s => s.price_mxn) ?? []
  return prices.length ? Math.min(...prices) : null
}

export default function ShowCard({ show }: { show: Show }) {
  const funcion = nextFuncion(show)
  const soldOut = show.funciones?.every(f => f.estado === 'sold_out')
  const desde = minPrice(show)

  return (
    <Link href={`/${show.slug}`} style={{ textDecoration: 'none', display: 'block' }} aria-label={`Ver ${show.title}`}>
      <article className="show-card" style={{
        position: 'relative', borderRadius: 4, overflow: 'hidden',
        background: show.image_hero_url ? undefined : 'linear-gradient(135deg, #0f2028 0%, #0c1a1f 100%)',
        minHeight: 380,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '1.5rem',
        cursor: 'pointer',
        border: '1px solid var(--border)',
      }}>
        {/* Poster via next/image — WebP + Vercel CDN + lazy load */}
        {show.image_hero_url && (
          <Image
            src={show.image_hero_url}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority={false}
          />
        )}

        {/* Gradient overlay — scrim so text reads on any poster */}
        {show.image_hero_url && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(12,26,31,0.05) 0%, rgba(12,26,31,0.72) 52%, rgba(12,26,31,0.98) 100%)',
          }} />
        )}

        {/* Genre badge */}
        {show.genre && (
          <div style={{
            position: 'absolute', zIndex: 1, top: '1rem', left: '1rem',
            border: '1px solid var(--gold)', color: 'var(--gold)',
            padding: '0.25rem 0.75rem', borderRadius: 1,
            fontFamily: 'var(--font-bebas)', fontSize: '0.75rem', letterSpacing: '0.18em',
          }}>
            {show.genre.toUpperCase()}
          </div>
        )}

        {/* Sold out badge */}
        {soldOut && (
          <div style={{
            position: 'absolute', top: '1rem', right: '1rem', zIndex: 1,
            background: 'rgba(200,30,30,0.85)', color: '#fff',
            padding: '0.25rem 0.75rem', borderRadius: 1,
            fontFamily: 'var(--font-bebas)', fontSize: '0.75rem', letterSpacing: '0.15em',
          }}>
            AGOTADO
          </div>
        )}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {funcion && (
            <p style={{
              fontFamily: 'var(--font-bebas)', fontSize: '0.8rem', letterSpacing: '0.15em',
              color: 'var(--muted)', marginBottom: '0.4rem', textTransform: 'uppercase',
            }}>
              {formatDate(funcion.fecha)}
              {funcion.venue?.name && ` · ${funcion.venue.name.toUpperCase()}`}
            </p>
          )}

          <h3 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            color: '#fff', letterSpacing: '0.02em', lineHeight: 0.95,
            marginBottom: show.artist ? '0.5rem' : '1rem', textTransform: 'uppercase',
          }}>
            {show.title}
          </h3>

          {show.artist && (
            <p style={{
              fontFamily: 'var(--font-bebas)', fontSize: '0.9rem', letterSpacing: '0.12em',
              color: 'rgba(240,234,216,0.65)', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              {show.artist}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-block',
              background: soldOut ? 'rgba(100,100,100,0.4)' : 'var(--gold)',
              color: soldOut ? 'var(--muted)' : '#0c1a1f',
              fontFamily: 'var(--font-bebas)', fontSize: '0.85rem', letterSpacing: '0.12em',
              padding: '0.5rem 1.25rem', borderRadius: 2, textTransform: 'uppercase',
            }}>
              {soldOut ? 'SIN DISPONIBILIDAD' : 'COMPRAR BOLETOS →'}
            </span>
            {desde && !soldOut && (
              <span style={{
                fontFamily: 'var(--font-bebas)', fontSize: '0.78rem', letterSpacing: '0.1em',
                color: 'rgba(240,234,216,0.5)', textTransform: 'uppercase',
              }}>
                DESDE ${desde.toLocaleString('es-MX')}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
