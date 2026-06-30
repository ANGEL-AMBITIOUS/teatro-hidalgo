import type { Metadata } from 'next'
import Link from 'next/link'
import ShowNav from '@/app/[slug]/components/ShowNav'
import ShowFooter from '@/app/[slug]/components/ShowFooter'
import WhatsAppFloat from '@/app/[slug]/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Teatro Hidalgo',
  description: 'Conoce cómo Teatro Hidalgo recopila, usa y protege tus datos personales conforme a la LFPDPPP.',
}

const SECTIONS = [
  {
    title: 'Datos que Recopilamos',
    content: null,
    list: [
      'Nombre completo',
      'Correo electrónico',
      'Número de teléfono',
      'Datos de facturación (como RFC y método de pago)',
      'Información técnica (como dirección IP, sistema operativo, tipo de navegador y dispositivo)',
      'Preferencias de eventos y compras anteriores',
    ],
  },
  {
    title: 'Finalidades del Tratamiento',
    content: 'Utilizamos tus datos personales para:',
    list: [
      'Procesar y gestionar la compra de boletos',
      'Enviar confirmaciones y accesos digitales',
      'Brindar atención al cliente y soporte',
      'Compartir información con teatros y producciones para facilitar tu acceso al evento',
      'Cumplir con obligaciones fiscales y legales',
      'Mantenerte informado sobre eventos, promociones o actualizaciones',
    ],
  },
  {
    title: 'Transferencia de Datos',
    content: 'Tus datos personales pueden ser compartidos únicamente en los siguientes casos:',
    list: [
      'Con el teatro o recinto correspondiente, con el fin de validar tu acceso al evento.',
      'Con proveedores de servicios necesarios para procesar tu compra, como plataformas de pago, sistemas de soporte o herramientas de mensajería (incluyendo WhatsApp, cuando el soporte al cliente lo requiera).',
      'Con analistas internos, personal de taquilla y promotores del evento, siempre bajo acuerdos de confidencialidad y únicamente con fines operativos y de control.',
      'Con autoridades competentes, cuando así lo exija la ley.',
    ],
    footer: 'En ningún caso vendemos tus datos personales a terceros. La información que compartimos se limita estrictamente a lo necesario para garantizar tu experiencia y seguridad dentro del proceso de compra y acceso al evento.',
  },
  {
    title: 'Base Legal del Tratamiento',
    content: 'Tratamos tus datos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Las bases legales incluyen:',
    list: [
      'Tu consentimiento',
      'La ejecución de un contrato (compra de boletos)',
      'Obligaciones legales',
      'Interés legítimo para garantizar una mejor experiencia',
    ],
    footer: 'En caso de corresponder, también cumplimos con el Reglamento General de Protección de Datos (GDPR) de la Unión Europea.',
  },
  {
    title: 'Medidas de Seguridad',
    content: 'Implementamos medidas administrativas, técnicas y físicas para proteger tus datos contra pérdida, uso indebido, acceso no autorizado o alteración.',
    list: null,
  },
  {
    title: 'Uso de Cookies',
    content: 'Este sitio utiliza cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el uso del sitio y mostrarte contenido personalizado. Puedes desactivarlas desde la configuración de tu navegador.',
    list: null,
  },
  {
    title: 'Derechos ARCO',
    content: 'Tienes derecho a acceder, rectificar, cancelar u oponerte al uso de tus datos personales. Para ejercer estos derechos, puedes contactarnos directamente a través del botón de WhatsApp disponible en nuestra página.',
    list: null,
  },
  {
    title: 'Modificaciones a esta Política',
    content: 'Nos reservamos el derecho de actualizar esta política en cualquier momento. Cualquier cambio será publicado en esta misma sección con la fecha correspondiente.',
    list: null,
  },
]

export default function PoliticaPrivacidadPage() {
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
            Política de Privacidad
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem', fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}>
            Última actualización: 24 de junio de 2025
          </p>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <p style={{
          color: 'rgba(240,234,216,0.75)', fontSize: '1rem', lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          En este sitio web nos tomamos muy en serio la privacidad de tus datos personales. A continuación te explicamos qué información recopilamos, cómo la usamos, con quién la compartimos y cómo la protegemos.
        </p>

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
          <Link href="/terminos-y-condiciones" style={{
            fontFamily: 'var(--font-bebas)', fontSize: '0.8rem',
            color: 'var(--muted)', textDecoration: 'none',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Términos y Condiciones →
          </Link>
        </div>
      </main>

      <ShowFooter />
      <WhatsAppFloat />
    </div>
  )
}
