// ponytail: swap PROVIDER to 'stripe' and implement buildStripeUrl() when ready
const PROVIDER = (process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER ?? 'whatsapp') as 'whatsapp' | 'stripe'

export interface CheckoutParams {
  showTitle: string
  funcionDate: string  // pre-formatted, e.g. "sábado 5 de julio de 2025"
  funcionHour: string  // e.g. "20:30"
  seats: { row: string; number: number; section: string }[]
  totalMxn: number
  whatsappNumber: string
}

export function buildCheckoutUrl(params: CheckoutParams): string {
  if (PROVIDER === 'stripe') return buildStripeUrl(params)
  return buildWhatsAppUrl(params)
}

function buildWhatsAppUrl({ showTitle, funcionDate, funcionHour, seats, totalMxn, whatsappNumber }: CheckoutParams): string {
  const seatList = seats.map(s => `Fila ${s.row}-${s.number} (${s.section})`).join(', ')
  const msg = [
    'Hola! Me interesa comprar boletos para:',
    `Espectaculo: ${showTitle}`,
    `Fecha: ${funcionDate} a las ${funcionHour} hrs`,
    `Asientos: ${seatList}`,
    `Total: $${totalMxn.toLocaleString('es-MX')} MXN`,
  ].join('\n')
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
}

// ponytail: implement with Stripe Checkout Sessions API when migrating
function buildStripeUrl(_params: CheckoutParams): string {
  throw new Error('Stripe checkout not implemented yet — set NEXT_PUBLIC_CHECKOUT_PROVIDER=whatsapp')
}
