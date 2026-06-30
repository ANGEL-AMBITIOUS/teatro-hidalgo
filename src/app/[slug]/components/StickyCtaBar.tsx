'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function StickyCtaBar({ slug, title, price }: { slug: string; title: string; price?: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`sticky-cta${visible ? ' visible' : ''}`} role="complementary" aria-label="Comprar boletos">
      <div className="show-title-small" style={{
        fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '1rem',
        color: 'var(--cream)', letterSpacing: '0.05em', textTransform: 'uppercase',
      }}>
        {title}
        {price && (
          <span style={{ color: 'var(--gold)', marginLeft: '1rem', fontWeight: 400, fontSize: '0.9rem' }}>
            desde ${price.toLocaleString('es-MX')} MXN
          </span>
        )}
      </div>
      <Link href={`/${slug}/boletos`} className="btn-gold" aria-label={`Comprar boletos para ${title}`} style={{ whiteSpace: 'nowrap' }}>
        COMPRAR BOLETOS →
      </Link>
    </div>
  )
}
