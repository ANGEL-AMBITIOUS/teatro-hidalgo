import type { Venue } from '@/lib/types'
import Link from 'next/link'

export default function VenueSection({ venue }: { venue?: Venue }) {
  if (!venue) return null
  return (
    <section style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.7rem',
        letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '0.75rem' }}>
        EL ESCENARIO
      </div>
      <h2 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
        {venue.name}
      </h2>
      <p style={{ color: 'rgba(240,234,216,0.7)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {venue.address}
      </p>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {venue.metro && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🚇</span>
            <div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.15em', color: 'var(--muted)' }}>METRO</div>
              <div style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>{venue.metro}</div>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🅿️</span>
          <div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.15em', color: 'var(--muted)' }}>ESTACIONAMIENTO</div>
            <div style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>{venue.parking ?? 'No disponible'}</div>
          </div>
        </div>
      </div>
      <Link
        href={`https://maps.google.com/?q=${encodeURIComponent(venue.address ?? venue.name)}`}
        target="_blank"
        className="btn-outline"
      >
        📍 CÓMO LLEGAR
      </Link>
    </section>
  )
}
