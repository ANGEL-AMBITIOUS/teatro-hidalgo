import type { Show } from '@/lib/types'

export default function ShowDetails({ show }: { show: Show }) {
  const items = [
    { label: 'RESTRICCIÓN EDAD', value: `${show.age_min}+` },
    show.duration_min
      ? { label: 'DURACIÓN', value: `${Math.floor(show.duration_min / 60)}h ${show.duration_min % 60}min (con intermedio)` }
      : null,
    show.genre ? { label: 'GÉNERO', value: show.genre } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  if (!items.length) return null
  return (
    <section style={{
      background: 'rgba(15,32,40,0.6)', borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)', padding: '2.5rem 2rem',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', gap: '1.5rem', rowGap: '1rem', flexWrap: 'wrap' }}>
        {items.map(({ label, value }) => (
          <div key={label}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '0.7rem',
              letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.3rem' }}>
              {label}
            </div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--cream)' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
