export type ShowStatus = 'on_sale' | 'sold_out' | 'cancelled' | 'postponed'
export type SeatStatus = 'available' | 'sold_out' | 'held'
export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'refunded'

export interface Venue {
  id: string
  name: string
  address: string | null
  metro: string | null
  parking: string | null
  svg_map: string | null
  capacity: number | null
  created_at: string
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
  created_at?: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
}

export interface Seat {
  id: string
  section_id: string
  row_label: string
  seat_number: number
  status: 'available' | 'sold_out' | 'held'
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
  is_active: boolean
  created_at?: string
  price_sections: PriceSection[]
  funciones: Funcion[]
  faqs: Faq[]
}

export interface Order {
  id: string
  user_id: string | null
  funcion_id: string | null
  email: string
  total_mxn: number
  status: OrderStatus
  payment_intent_id: string | null
  paid_at: string | null
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  seat_id: string
  price_mxn: number
}

export interface Ticket {
  id: string
  order_item_id: string
  qr_payload: string
  delivery_email: string | null
  delivered_at: string | null
  scanned_at: string | null
  created_at: string
}
