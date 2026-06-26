import type { Show } from '@/lib/types'
import Link from 'next/link'

export default function ShowDescription({ show }: { show: Show }) {
  if (!show.description) return null
  return (
    <section style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h2 className="font-display" style={{
        fontSize: 'clamp(1.45rem, 3vw, 2.15rem)', color: '#fff', lineHeight: 1,
        marginBottom: '1.5rem', letterSpacing: '0.02em', maxWidth: '620px',
      }}>
        Una Puesta en Escena de Clase Mundial
      </h2>
      <div style={{
        color: 'rgba(240,234,216,0.8)', fontSize: '1.05rem', lineHeight: 1.8,
        marginBottom: '2.5rem',
      }}>
        {show.description.split('\n').map((p, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>{p}</p>
        ))}
      </div>
      <Link href={`/${show.slug}/boletos`} className="btn-gold" aria-label={`Selecciona tus asientos para ${show.title}`}>
        SELECCIONA TUS ASIENTOS
      </Link>
    </section>
  )
}
