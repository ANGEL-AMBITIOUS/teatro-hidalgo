import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Faq, Funcion, PriceSection, Show } from '@/lib/types'
import BoletosNav from './components/BoletosNav'
import TicketGrid from './components/TicketGrid'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5215512345678'

type ShowQueryResult = Omit<Show, 'price_sections' | 'funciones' | 'faqs'> & {
  price_sections?: PriceSection[] | null
  funciones?: Funcion[] | null
  faqs?: Faq[] | null
}

async function getShow(slug: string): Promise<Show | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('shows')
    .select(`
      *,
      price_sections ( id, name, price_mxn, color_hex, sort_order ),
      funciones (
        id, fecha, hora, puertas, estado,
        venue:venue_id ( id, name, address, metro, parking, svg_map )
      ),
      faqs ( id, question, answer, sort_order )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null
  const d = data as ShowQueryResult
  return {
    ...d,
    price_sections: [...(d.price_sections ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    funciones: [...(d.funciones ?? [])].sort((a, b) => a.fecha.localeCompare(b.fecha)),
    faqs: [...(d.faqs ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('shows').select('title').eq('slug', slug).single()
  if (!data) return { title: 'Boletos — Teatro Hidalgo' }
  return { title: `Boletos — ${data.title} | Teatro Hidalgo` }
}

function formatDateLong(fecha: string) {
  return new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function BoletosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const show = await getShow(slug)
  if (!show) notFound()

  const nextFuncion = show.funciones.find(f => f.estado === 'on_sale') ?? show.funciones[0]
  const minPrice = show.price_sections[show.price_sections.length - 1]?.price_mxn

  // Live seat availability
  const supabase = await createClient()
  const { data: seatRows } = nextFuncion
    ? await supabase.from('seats').select('section_id').eq('funcion_id', nextFuncion.id).eq('status', 'available')
    : { data: null }
  const availMap = (seatRows ?? []).reduce((acc: Record<string, number>, s: { section_id: string }) => {
    acc[s.section_id] = (acc[s.section_id] ?? 0) + 1
    return acc
  }, {})

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <BoletosNav slug={slug} title={show.title} />

      {/* Page header */}
      <header className="show-hero" style={{
        paddingTop: '64px',
        background: show.image_hero_url
          ? `linear-gradient(to bottom, rgba(12,26,31,0.7) 0%, rgba(12,26,31,0.95) 100%), url(${show.image_hero_url}) center/cover no-repeat`
          : 'linear-gradient(135deg, #0c1a1f 0%, #122530 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem 2rem' }}>
          <div style={{
            display: 'inline-block', border: '1px solid var(--gold)',
            color: 'var(--gold)', padding: '0.3rem 1rem',
            fontFamily: 'Barlow Condensed', fontWeight: 600, fontSize: '0.7rem',
            letterSpacing: '0.2em', marginBottom: '1rem', borderRadius: '1px',
          }}>
            BOLETOS OFICIALES
          </div>
          <h1 style={{
            fontFamily: 'Barlow Condensed', fontWeight: 900,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#fff',
            textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 0.95,
            marginBottom: '0.5rem',
          }}>
            {show.title}
          </h1>
          {show.subtitle && (
            <p style={{ color: 'rgba(240,234,216,0.7)', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>
              {show.subtitle}
            </p>
          )}
          {minPrice && (
            <p style={{
              fontFamily: 'Barlow Condensed', fontWeight: 600, fontSize: '0.9rem',
              color: 'var(--muted)', letterSpacing: '0.08em',
            }}>
              DESDE{' '}
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                ${minPrice.toLocaleString('es-MX')} MXN
              </span>
            </p>
          )}
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem 6rem' }}>

        {/* Funcion info bar */}
        {nextFuncion && (
          <div className="funcion-info-bar" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '4px', padding: '1.25rem 1.5rem',
            display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
            alignItems: 'center', marginBottom: '2.5rem',
          }}>
            <div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                Fecha
              </div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem',
                color: 'var(--cream)', letterSpacing: '0.04em', textTransform: 'capitalize' }}>
                {formatDateLong(nextFuncion.fecha)}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                Función
              </div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem',
                color: 'var(--cream)', fontVariantNumeric: 'tabular-nums' }}>
                {nextFuncion.hora.slice(0, 5)} hrs
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                Puertas
              </div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem',
                color: 'var(--cream)', fontVariantNumeric: 'tabular-nums' }}>
                {nextFuncion.puertas.slice(0, 5)} hrs
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                Lugar
              </div>
              <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem',
                color: 'var(--cream)' }}>
                {nextFuncion.venue?.name ?? 'Teatro Hidalgo'}
              </div>
            </div>
            <div className="funcion-badge" style={{ marginLeft: 'auto' }}>
              <span style={{
                display: 'inline-block', background: 'rgba(34,197,94,0.12)', color: '#4ade80',
                fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.7rem',
                letterSpacing: '0.15em', padding: '0.3rem 0.75rem', borderRadius: '2px',
                textTransform: 'uppercase',
              }}>
                ● A LA VENTA
              </span>
            </div>
          </div>
        )}

        {/* Ticket categories */}
        {show.price_sections.length > 0 ? (
          <TicketGrid
            sections={show.price_sections}
            funcion={nextFuncion}
            showTitle={show.title}
            whatsappPhone={WHATSAPP}
            availMap={availMap}
          />
        ) : (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            color: 'var(--muted)', fontFamily: 'Barlow Condensed', letterSpacing: '0.1em',
          }}>
            Categorías no disponibles. Contáctanos vía WhatsApp.
          </div>
        )}

        {/* Trust badges */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center',
          marginTop: '3rem', padding: '2rem 0',
          borderTop: '1px solid var(--border)',
        }}>
          {[
            { icon: '🔒', label: 'PAGO SEGURO' },
            { icon: '✓', label: 'BOLETOS OFICIALES' },
            { icon: '📱', label: 'ENTREGA DIGITAL' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--gold)', fontSize: '1rem' }} aria-hidden="true">{icon}</span>
              <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.7rem',
                letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
