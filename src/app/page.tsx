import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ShowNav from '@/app/[slug]/components/ShowNav'
import ShowFooter from '@/app/[slug]/components/ShowFooter'
import ShowCard from '@/components/ShowCard'
import type { Show } from '@/lib/types'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('shows')
    .select('title, image_hero_url')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()
  return {
    title: 'Cartelera',
    description: 'Descubre los espectáculos en cartelera en el Teatro Hidalgo Ignacio Retes · Compra tus boletos en línea · Centro Histórico, CDMX',
    openGraph: {
      title: 'Teatro Hidalgo Ignacio Retes — Cartelera',
      description: 'Descubre los espectáculos en cartelera · Compra tus boletos en línea',
      ...(data?.image_hero_url ? { images: [{ url: data.image_hero_url, width: 1200, height: 630, alt: `${data.title} — Teatro Hidalgo en cartelera` }] } : {}),
    },
  }
}

const SOBRE_TEATRO = `El Teatro Hidalgo Ignacio Retes es uno de los recintos escénicos más emblemáticos de la Ciudad de México. Con décadas de trayectoria, ha sido testigo de las más importantes producciones del teatro mexicano, formando generaciones de artistas y públicos apasionados por las artes escénicas.

Su escenario ha albergado desde clásicos universales hasta vanguardias contemporáneas, consolidándose como un espacio de encuentro entre la tradición y la innovación.`

export default async function HomePage() {
  const supabase = await createClient()
  const { data: showRows } = await supabase
    .from('shows')
    .select(`
      id, slug, title, subtitle, artist, genre, image_hero_url,
      duration_min, age_min, description,
      funciones(id, fecha, hora, puertas, estado, venue:venues(id, name, address, metro, parking, svg_map)),
      price_sections(id, name, price_mxn, color_hex, sort_order),
      faqs(id, question, answer, sort_order)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  const shows = (showRows ?? []) as unknown as Show[]

  // Derived stats for info strip
  const allPrices = shows.flatMap(s => s.price_sections?.map(p => p.price_mxn) ?? [])
  const minPrice = allPrices.length ? Math.min(...allPrices) : null
  const allFunciones = shows.flatMap(s => s.funciones ?? [])
  const temporadaYear = allFunciones.length
    ? Math.min(...allFunciones.map(f => new Date(f.fecha + 'T12:00:00').getFullYear()))
    : new Date().getFullYear()

  // Up to 3 hero panels from active shows (all with images)
  const heroShows = shows.slice(0, 3)

  return (
    <>
      <ShowNav />

      <main style={{ paddingTop: '64px' }}>
        {/* ───── HERO — show artwork mosaic ───── */}
        <section
          aria-label="Teatro Hidalgo"
          style={{ position: 'relative', minHeight: '85vh', overflow: 'hidden' }}
        >
          {/* Show image panels — split when 2+, full when 1, dark fallback */}
          <div aria-hidden="true" className="hero-panels" style={{ position: 'absolute', inset: 0, display: 'flex' }}>
            {heroShows.length > 0 ? heroShows.map(show => (
              <div key={show.id} className="hero-panel" style={{
                flex: 1,
                background: show.image_hero_url
                  ? `url(${show.image_hero_url}) center/cover no-repeat`
                  : 'linear-gradient(135deg, #0f2028, #0c1a1f)',
              }} />
            )) : (
              <div className="hero-panel" style={{ flex: 1, background: 'linear-gradient(135deg, #0a1a20, #0c1a1f)' }} />
            )}
          </div>

          {/* Unified dark overlay so brand text reads */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(12,26,31,0.38) 0%, rgba(12,26,31,0.58) 50%, rgba(12,26,31,0.92) 100%)',
          }} />

          {/* Cinematic grain */}
          <div aria-hidden="true" className="grain-overlay" />

          {/* Brand overlay */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '85vh', padding: '4rem 2rem', textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
              letterSpacing: '0.45em', color: 'var(--gold)', textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              CENTRO HISTÓRICO · CIUDAD DE MÉXICO
            </p>

            <h1 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              lineHeight: 0.88, letterSpacing: '0.01em',
              color: '#fff', textTransform: 'uppercase',
              textShadow: '0 2px 40px rgba(0,0,0,0.7)',
              marginBottom: '0.5rem',
            }}>
              Teatro<br />Hidalgo
            </h1>

            <p style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
              letterSpacing: '0.45em', color: 'rgba(240,234,216,0.65)', textTransform: 'uppercase',
              marginBottom: '2rem',
            }}>
              Ignacio Retes
            </p>

            <p style={{
              color: 'rgba(240,234,216,0.78)', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              maxWidth: '440px', lineHeight: 1.65, marginBottom: 0,
              fontFamily: 'var(--font-hanken)',
            }}>
              Un escenario emblemático donde la tradición escénica se encuentra con la vanguardia.
              El corazón del teatro en la Ciudad de México.
            </p>
          </div>
        </section>

        {/* ───── INFO STRIP ───── */}
        <div className="info-strip-accent" style={{
          background: '#080f12',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: '1rem clamp(1rem, 4vw, 3rem)',
            display: 'flex', gap: '1.5rem', alignItems: 'center',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {([
              `TEMPORADA ${temporadaYear}`,
              `${shows.length} ${shows.length === 1 ? 'PRODUCCIÓN' : 'PRODUCCIONES'}`,
              ...(minPrice ? [`DESDE $${minPrice.toLocaleString('es-MX')}`] : []),
              'TAQUILLA 12:00',
            ] as string[]).map((item, i, arr) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-bebas)', fontSize: '0.85rem', letterSpacing: '0.22em',
                  color: 'rgba(240,234,216,0.65)', textTransform: 'uppercase',
                }}>
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ───── CARTELERA ───── */}
        <section
          id="cartelera"
          aria-label="Cartelera"
          style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)', maxWidth: '1200px', margin: '0 auto' }}
        >
          {/* Section header */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-bebas)', fontSize: '0.75rem', letterSpacing: '0.4em',
                color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.25rem',
              }}>
                En escena
              </p>
              <h2 style={{
                fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#fff', letterSpacing: '0.02em', lineHeight: 1,
              }}>
                CARTELERA
              </h2>
            </div>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)', minWidth: 40 }} aria-hidden="true" />
          </div>

          {shows.length === 0 ? (
            <div style={{
              padding: '4rem 2rem', textAlign: 'center',
              fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', letterSpacing: '0.1em',
              color: 'var(--muted)', textTransform: 'uppercase',
            }}>
              Sin funciones programadas por el momento
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem',
            }}>
              {shows.map(show => <ShowCard key={show.id} show={show} />)}
            </div>
          )}
        </section>

        {/* Divider */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 3rem)' }}>
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} aria-hidden="true" />
        </div>

        {/* ───── EL TEATRO ───── */}
        <section
          id="el-teatro"
          aria-label="Sobre el Teatro Hidalgo"
          style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)', maxWidth: '1200px', margin: '0 auto' }}
        >
          <div style={{ maxWidth: '780px' }}>
            <p style={{
              fontFamily: 'var(--font-bebas)', fontSize: '0.75rem', letterSpacing: '0.4em',
              color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.25rem',
            }}>
              Nuestro recinto
            </p>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#fff', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '2rem',
            }}>
              EL TEATRO
            </h2>

            {SOBRE_TEATRO.split('\n\n').map((p, i) => (
              <p key={i} style={{
                color: 'rgba(240,234,216,0.8)', fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
                lineHeight: 1.75, marginBottom: '1.25rem',
                fontFamily: 'var(--font-hanken)',
              }}>
                {p}
              </p>
            ))}

            {/* Venue info pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
              {[
                { icon: '📍', text: 'Pueblo de Tepito S/N, Colonia Tepito, CDMX' },
                { icon: '🚇', text: 'Metro Tepito (Línea B)' },
                { icon: '🅿️', text: 'Estacionamiento disponible' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  padding: '0.6rem 1rem', borderRadius: 2,
                  fontFamily: 'var(--font-hanken)', fontSize: '0.85rem', color: 'var(--muted)',
                }}>
                  <span aria-hidden="true">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ShowFooter />
    </>
  )
}
