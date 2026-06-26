import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Show } from '@/lib/types'
import ShowNav from './components/ShowNav'
import ShowHero from './components/ShowHero'
import InfoStrip from './components/InfoStrip'
import TrustBadges from './components/TrustBadges'
import ShowDescription from './components/ShowDescription'
import ShowDetails from './components/ShowDetails'
import VenueSection from './components/VenueSection'
import FaqAccordion from './components/FaqAccordion'
import ShowFooter from './components/ShowFooter'
import WhatsAppFloat from './components/WhatsAppFloat'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('shows').select('title, subtitle').eq('slug', slug).single()
  if (!data) return { title: 'Teatro Hidalgo' }
  return {
    title: `${data.title} — Teatro Hidalgo`,
    description: data.subtitle ?? undefined,
  }
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
        venue:venue_id ( id, name, address, metro, parking )
      ),
      faqs ( id, question, answer, sort_order )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null

  return {
    ...data,
    price_sections: (data.price_sections ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order),
    funciones: (data.funciones ?? []).sort((a: any, b: any) => a.fecha.localeCompare(b.fecha)),
    faqs: (data.faqs ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  } as Show
}

export default async function ShowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const show = await getShow(slug)
  if (!show) notFound()

  const nextFuncion = show.funciones.find(f => f.estado === 'on_sale') ?? show.funciones[0]

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <ShowNav />
      <ShowHero show={show} funcion={nextFuncion} />
      <InfoStrip show={show} funcion={nextFuncion} />
      <TrustBadges />
      <ShowDescription show={show} />
      <ShowDetails show={show} />
      <VenueSection venue={nextFuncion?.venue} />
      <FaqAccordion faqs={show.faqs} />
      <ShowFooter />
      <WhatsAppFloat />
    </div>
  )
}
