import type { Show, Funcion } from '@/lib/types'

function formatDate(fecha: string) {
  const months = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
  const d = new Date(fecha + 'T12:00:00')
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}
function formatDuration(min: number | null) {
  if (!min) return null
  const h = Math.floor(min / 60); const m = min % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
  </svg>
)
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconTimer = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

export default function InfoStrip({ show, funcion }: { show: Show; funcion?: Funcion }) {
  const items = [
    { Icon: IconCalendar, label: 'FECHA',    value: funcion ? formatDate(funcion.fecha) : 'POR CONFIRMAR' },
    { Icon: IconPin,      label: 'LUGAR',    value: funcion?.venue?.name?.toUpperCase() ?? 'TEATRO HIDALGO' },
    { Icon: IconClock,    label: 'PUERTAS',  value: funcion?.puertas?.slice(0,5) ?? '19:00' },
    { Icon: IconTimer,    label: 'DURACIÓN', value: formatDuration(show.duration_min) ?? '—' },
  ]
  return (
    <section style={{ background: 'rgba(15,32,40,0.95)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto', padding: '1.5rem 2rem',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
      }}>
        {items.map(({ Icon, label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--gold)', marginBottom: '0.3rem', display: 'flex', justifyContent: 'center' }}>
              <Icon />
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.2rem' }}>
              {label}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem', color: 'var(--cream)', letterSpacing: '0.05em' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
