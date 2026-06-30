import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Faq, Funcion, PriceSection, Show } from '@/lib/types'
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
import StickyCtaBar from './components/StickyCtaBar'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('shows').select('title, subtitle, description, image_hero_url').eq('slug', slug).single()
  if (!data) return { title: 'Teatro Hidalgo' }
  const ogDesc = data.subtitle ?? (data.description ? (data.description as string).slice(0, 155) + '…' : 'Boletos oficiales — Teatro Hidalgo Ignacio Retes')
  const ogImages = data.image_hero_url ? [{ url: data.image_hero_url, width: 1200, height: 630, alt: `${data.title} — Teatro Hidalgo` }] : []
  return {
    title: data.title,
    description: ogDesc,
    openGraph: { title: `${data.title} — Teatro Hidalgo`, description: ogDesc, images: ogImages },
    twitter: { card: 'summary_large_image', title: `${data.title} — Teatro Hidalgo`, description: ogDesc, images: ogImages.map(i => i.url) },
  }
}

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

  if (error) {
    console.error('[show.lookup.failed]', { slug, code: error.code, message: error.message })
    return null
  }
  if (!data) {
    console.error('[show.lookup.empty]', { slug })
    return null
  }

  const showData = data as ShowQueryResult

  return {
    ...showData,
    price_sections: [...(showData.price_sections ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    funciones: [...(showData.funciones ?? [])].sort((a, b) => a.fecha.localeCompare(b.fecha)),
    faqs: [...(showData.faqs ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }
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
      <StickyCtaBar
        slug={show.slug}
        title={show.title}
        price={show.price_sections[show.price_sections.length - 1]?.price_mxn}
      />
    </div>
  )
}
