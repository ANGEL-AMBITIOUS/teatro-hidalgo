'use client'
import type { PriceSection, Funcion } from '@/lib/types'

function buildWhatsAppUrl(phone: string, section: PriceSection, funcion: Funcion | undefined, showTitle: string): string {
  const fecha = funcion
    ? new Date(funcion.fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'fecha por confirmar'
  const hora = funcion?.hora?.slice(0, 5) ?? '20:00'
  const text = `Hola, me interesa adquirir boletos de categoría ${section.name} ($${section.price_mxn.toLocaleString('es-MX')} MXN) para ${showTitle} el ${fecha} a las ${hora}. ¿Me pueden dar más información?`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

function TicketCard({ section, funcion, showTitle, whatsappPhone, available }: {
  section: PriceSection
  funcion: Funcion | undefined
  showTitle: string
  whatsappPhone: string
  available?: number
}) {
  const waUrl = buildWhatsAppUrl(whatsappPhone, section, funcion, showTitle)
  const accent = section.color_hex ?? '#c9a227'
  const isLow = available !== undefined && available < 10
  const isSoldOut = available !== undefined && available === 0

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${accent}33`,
      borderRadius: '4px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      opacity: isSoldOut ? 0.55 : 1,
    }}>
      {/* Header: dot + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent, flexShrink: 0 }} aria-hidden="true" />
        <span style={{
          fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.75rem',
          letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase',
        }}>
          {section.name}
        </span>
      </div>

      {/* Focal price */}
      <div>
        <div style={{
          fontFamily: 'Barlow Condensed', fontWeight: 900,
          fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', color: 'var(--cream)',
          fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', lineHeight: 1,
        }}>
          ${section.price_mxn.toLocaleString('es-MX')}
        </div>
        <div style={{
          fontFamily: 'Barlow Condensed', fontWeight: 500,
          fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', marginTop: '0.2rem',
        }}>
          MXN POR BOLETO
        </div>
      </div>

      {/* Seat availability */}
      {available !== undefined && (
        <div style={{
          fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.72rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: isSoldOut ? '#f87171' : isLow ? '#fbbf24' : '#4ade80',
        }}>
          {isSoldOut ? '✕ AGOTADO' : isLow ? `⚠ ${available} LUGARES` : `${available} DISPONIBLES`}
        </div>
      )}

      {/* CTA */}
      {!isSoldOut && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Adquirir boletos ${section.name} — $${section.price_mxn.toLocaleString('es-MX')} MXN`}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: accent, color: '#0c1a1f',
            fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.65rem 1rem', borderRadius: '2px',
            textDecoration: 'none', minHeight: 44,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          ADQUIRIR BOLETOS
        </a>
      )}
    </div>
  )
}

export default function TicketGrid({ sections, funcion, showTitle, whatsappPhone, availMap }: {
  sections: PriceSection[]
  funcion: Funcion | undefined
  showTitle: string
  whatsappPhone: string
  availMap?: Record<string, number>
}) {
  return (
    <section aria-label="Categorías de boletos">
      <h2 style={{
        fontFamily: 'Barlow Condensed', fontWeight: 800,
        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
        color: 'var(--cream)', letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: '1.5rem',
      }}>
        Selecciona tu categoría
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
        gap: '1rem',
      }}>
        {sections.map(s => (
          <TicketCard
            key={s.id}
            section={s}
            funcion={funcion}
            showTitle={showTitle}
            whatsappPhone={whatsappPhone}
            available={availMap?.[s.id]}
          />
        ))}
      </div>
    </section>
  )
}
