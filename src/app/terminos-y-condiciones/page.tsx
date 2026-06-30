import type { Metadata } from 'next'
import Link from 'next/link'
import ShowNav from '@/app/[slug]/components/ShowNav'
import ShowFooter from '@/app/[slug]/components/ShowFooter'
import WhatsAppFloat from '@/app/[slug]/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Teatro Hidalgo',
  description: 'Conoce los términos y condiciones de compra y uso del sitio web de Teatro Hidalgo.',
}

const SECTIONS = [
  {
    title: '1. Objeto',
    content: 'El presente documento establece los términos y condiciones que rigen el uso de este sitio web y la compra de boletos a través del mismo. Al acceder o utilizar nuestro sitio, aceptas estos términos en su totalidad.',
    list: null,
  },
  {
    title: '2. Condiciones de Compra',
    content: 'Al realizar una compra, garantizas que:',
    list: [
      'Eres mayor de edad o cuentas con autorización de un tutor legal.',
      'La información que proporcionas es correcta y completa.',
      'El método de pago que utilizas es válido y te pertenece.',
    ],
    footer: 'Las compras están sujetas a disponibilidad. Los precios incluyen impuestos aplicables (IVA) y pueden incluir cargos por servicio.',
  },
  {
    title: '3. Entrega de Boletos',
    content: 'Los boletos se entregan de forma digital al correo electrónico proporcionado durante la compra. Es responsabilidad del comprador asegurarse de que el correo sea correcto. En caso de no recibir los boletos, deberá contactarnos a través de los canales de soporte disponibles en el sitio.',
    list: null,
  },
  {
    title: '4. Cambios y Cancelaciones',
    content: null,
    list: [
      'Los boletos adquiridos no son reembolsables, salvo en caso de cancelación o reprogramación del evento por parte del organizador.',
      'En caso de reprogramación, los boletos serán válidos para la nueva fecha o se ofrecerá un crédito a favor del comprador.',
      'No nos hacemos responsables por situaciones ajenas a nuestra voluntad (fuerza mayor, desastres naturales, pandemias, disposiciones gubernamentales) que impidan la realización del evento.',
    ],
  },
  {
    title: '5. Limitación de Responsabilidad',
    content: 'El sitio web y sus contenidos se ofrecen "tal como están". No garantizamos que el servicio sea ininterrumpido, libre de errores o exento de virus. En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso del sitio o de la compra de boletos.',
    list: null,
  },
  {
    title: '6. Uso del Sitio',
    content: 'Te comprometes a utilizar este sitio únicamente con fines lícitos y a no:',
    list: [
      'Intentar acceder sin autorización a sistemas o datos del sitio.',
      'Usar herramientas automatizadas para comprar boletos en masa (bots).',
      'Revender boletos a un precio superior al original sin autorización expresa.',
    ],
  },
  {
    title: '7. Propiedad Intelectual',
    content: 'Todos los contenidos de este sitio (imágenes, textos, logotipos, diseño gráfico) son propiedad de sus respectivos titulares o están licenciados para su uso en este sitio. Queda prohibida su reproducción, distribución o modificación sin autorización previa.',
    list: null,
  },
  {
    title: '8. Jurisdicción',
    content: 'Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia será resuelta ante los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponder.',
    list: null,
  },
  {
    title: '9. Contacto',
    content: 'Para cualquier duda o aclaración relacionada con estos términos, puedes contactarnos a través del botón de WhatsApp disponible en nuestra página. Atenderemos tu solicitud a la brevedad posible.',
    list: null,
  },
]

export default function TerminosCondicionesPage() {
  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh' }}>
      <ShowNav />

      {/* Page header */}
      <header style={{
        paddingTop: '80px',
        background: 'linear-gradient(to bottom, #0a1a20, var(--bg-deep))',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 2.5rem' }}>
          <div style={{
            display: 'inline-block',
            border: '1px solid var(--gold)', color: 'var(--gold)',
            padding: '0.25rem 0.875rem',
            fontFamily: 'var(--font-bebas)', fontSize: '0.65rem',
            letterSpacing: '0.25em', marginBottom: '1rem',
          }}>
            AVISO LEGAL
          </div>
          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff',
            textTransform: 'uppercase', letterSpacing: '0.03em',
            lineHeight: 0.95, marginBottom: '0.75rem',
          }}>
            Términos y Condiciones
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem', fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}>
            Última actualización: 24 de junio de 2025
          </p>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        {SECTIONS.map(({ title, content, list, footer }) => (
          <section key={title} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontWeight: 700,
              fontSize: '1.1rem', color: 'var(--gold)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '0.75rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border)',
            }}>
              {title}
            </h2>
            {content && (
              <p style={{ color: 'rgba(240,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: list ? '0.75rem' : 0 }}>
                {content}
              </p>
            )}
            {list && (
              <ul style={{ margin: '0', padding: '0 0 0 1.25rem' }}>
                {list.map(item => (
                  <li key={item} style={{
                    color: 'rgba(240,234,216,0.7)', fontSize: '0.9rem',
                    lineHeight: 1.7, marginBottom: '0.35rem',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {footer && (
              <p style={{ color: 'rgba(240,234,216,0.7)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.75rem' }}>
                {footer}
              </p>
            )}
          </section>
        ))}

        {/* Back link */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-bebas)', fontSize: '0.8rem',
            color: 'var(--gold)', textDecoration: 'none',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            ← Volver al inicio
          </Link>
          <span style={{ color: 'var(--muted)', margin: '0 1rem', fontSize: '0.75rem' }}>·</span>
          <Link href="/politica-de-privacidad" style={{
            fontFamily: 'var(--font-bebas)', fontSize: '0.8rem',
            color: 'var(--muted)', textDecoration: 'none',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Política de Privacidad →
          </Link>
        </div>
      </main>

      <ShowFooter />
      <WhatsAppFloat />
    </div>
  )
}
