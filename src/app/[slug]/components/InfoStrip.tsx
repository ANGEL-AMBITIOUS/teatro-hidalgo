import type { Show, Funcion } from '@/lib/types'

function formatDate(fecha: string) {
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const d = new Date(fecha + 'T12:00:00')
  return `${months[d.getMonth()].toUpperCase()} ${d.getFullYear()}`
}

function formatDuration(min: number | null) {
  if (!min) return null
  const h = Math.floor(min / 60)
  const m = min % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

export default function InfoStrip({ show, funcion }: { show: Show; funcion?: Funcion }) {
  const items = [
    { icon: '📅', label: 'FECHA', value: funcion ? formatDate(funcion.fecha) : 'POR CONFIRMAR' },
    { icon: '📍', label: 'LUGAR', value: funcion?.venue?.name?.toUpperCase() ?? 'TEATRO HIDALGO' },
    { icon: '🕖', label: 'PUERTAS', value: funcion?.puertas?.slice(0, 5) ?? '19:00' },
    { icon: '⏱', label: 'DURACIÓN', value: formatDuration(show.duration_min) ?? '—' },
  ]
  return (
    <section style={{
      background: 'rgba(15,32,40,0.95)', borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto', padding: '1.5rem 2rem',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
      }}>
        {items.map(({ icon, label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{icon}</div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.2rem' }}>
              {label}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem',
              color: 'var(--cream)', letterSpacing: '0.05em' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
