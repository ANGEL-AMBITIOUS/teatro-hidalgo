export type ShowStatus = 'on_sale' | 'sold_out' | 'cancelled' | 'postponed'

export interface Venue {
  id: string
  name: string
  address: string | null
  metro: string | null
  parking: string | null
  svg_map: string | null
}

export interface PriceSection {
  id: string
  name: string
  price_mxn: number
  color_hex: string | null
  sort_order: number
}

export interface Funcion {
  id: string
  fecha: string
  hora: string
  puertas: string
  estado: ShowStatus
  venue: Venue
}

export interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
}

export interface Show {
  id: string
  slug: string
  title: string
  subtitle: string | null
  artist: string | null
  genre: string | null
  description: string | null
  age_min: number
  duration_min: number | null
  image_hero_url: string | null
  price_sections: PriceSection[]
  funciones: Funcion[]
  faqs: Faq[]
}
