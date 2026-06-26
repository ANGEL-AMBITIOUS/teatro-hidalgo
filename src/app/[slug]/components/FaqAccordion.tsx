'use client'
import { useId, useState } from 'react'
import type { Faq } from '@/lib/types'

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false)
  const answerId = useId()
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.25rem 0', textAlign: 'left', color: 'var(--cream)',
        }}
      >
        <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 600, fontSize: '1.05rem' }}>
          {faq.question}
        </span>
        <span style={{
          fontFamily: 'Barlow Condensed', fontSize: '1.4rem', color: 'var(--gold)',
          transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s',
          flexShrink: 0, marginLeft: '1rem',
        }}>
          +
        </span>
      </button>
      {open && (
        <div id={answerId} style={{
          color: 'rgba(240,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.7,
          paddingBottom: '1.25rem',
        }}>
          {faq.answer}
        </div>
      )}
    </div>
  )
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null
  return (
    <section style={{
      background: 'rgba(15,32,40,0.4)', borderTop: '1px solid var(--border)',
      padding: '4rem 2rem',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h2 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginBottom: '2rem' }}>
          FAQ
        </h2>
        {faqs.map(faq => <FaqItem key={faq.id} faq={faq} />)}
      </div>
    </section>
  )
}
