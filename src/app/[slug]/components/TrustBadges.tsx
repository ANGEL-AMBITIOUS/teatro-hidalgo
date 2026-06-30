const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconQr = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    <line x1="14" y1="14" x2="14" y2="14"/><line x1="17" y1="14" x2="17" y2="14"/><line x1="21" y1="14" x2="21" y2="14"/>
    <line x1="14" y1="17" x2="14" y2="17"/><line x1="17" y1="17" x2="17" y2="17"/><line x1="21" y1="17" x2="21" y2="17"/>
    <line x1="14" y1="21" x2="14" y2="21"/><line x1="17" y1="21" x2="17" y2="21"/><line x1="21" y1="21" x2="21" y2="21"/>
  </svg>
)

export default function TrustBadges() {
  const badges = [
    { Icon: IconLock,   label: 'PAGO SEGURO' },
    { Icon: IconShield, label: 'BOLETOS OFICIALES' },
    { Icon: IconQr,     label: 'ENTREGA DIGITAL' },
  ]
  return (
    <section style={{ padding: '2.5rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {badges.map(({ Icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--muted)' }}><Icon /></span>
            <span style={{ fontFamily: 'var(--font-bebas)', fontWeight: 700, fontSize: '0.75rem',
              letterSpacing: '0.15em', color: 'var(--muted)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
