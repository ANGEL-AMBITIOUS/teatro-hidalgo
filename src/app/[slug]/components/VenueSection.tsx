import type { Venue } from '@/lib/types'
import Link from 'next/link'

const IconMetro = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 12l2 4 2-4 2 4 2-4"/>
  </svg>
)
const IconParking = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h5a3 3 0 0 1 0 6H9"/>
  </svg>
)

export default function VenueSection({ venue }: { venue?: Venue }) {
  if (!venue) return null

  const mapsQ = encodeURIComponent(`Teatro Hidalgo Ignacio Retes, ${venue.address ?? 'Centro Histórico, CDMX'}`)

  return (
    <section style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '0.7rem',
        letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '0.75rem' }}>
        EL ESCENARIO
      </div>
      <h2 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
        {venue.name}
      </h2>
      <p style={{ color: 'rgba(240,234,216,0.7)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {venue.address}
      </p>

      {/* Transit info */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {venue.metro && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--gold)' }}><IconMetro /></span>
            <div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.15em', color: 'var(--muted)' }}>METRO</div>
              <div style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>{venue.metro}</div>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--gold)' }}><IconParking /></span>
          <div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.15em', color: 'var(--muted)' }}>ESTACIONAMIENTO</div>
            <div style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>{venue.parking ?? 'No disponible'}</div>
          </div>
        </div>
      </div>

      {/* Google Maps embed — placeholder behind shows if tiles are slow/blocked */}
      <div style={{
        position: 'relative', borderRadius: '4px', overflow: 'hidden',
        border: '1px solid var(--border)', marginBottom: '1.5rem',
        minHeight: 220, background: 'var(--bg-card)',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          color: 'var(--muted)', pointerEvents: 'none', textAlign: 'center', padding: '1rem',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-bebas)', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {venue.address ?? venue.name}
          </span>
        </div>
        <iframe
          src={`https://maps.google.com/maps?q=${mapsQ}&output=embed`}
          width="100%"
          height="220"
          style={{ border: 0, display: 'block', position: 'relative' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Ubicación de ${venue.name}`}
        />
      </div>

      {/* Recinto SVG map */}
      {venue.svg_map && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '0.65rem',
            letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            Mapa del Recinto
          </div>
          <div
            style={{
              background: 'rgba(15,32,40,0.9)', borderRadius: '4px',
              border: '1px solid var(--border)', padding: '1rem',
              width: '100%',
            }}
            dangerouslySetInnerHTML={{ __html: venue.svg_map }}
          />
        </div>
      )}

      <Link
        href={`https://maps.google.com/?q=${mapsQ}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
        </svg>
        CÓMO LLEGAR
      </Link>
    </section>
  )
}
