export default function TrustBadges() {
  const badges = [
    { icon: '🔒', label: 'SECURE CHECKOUT' },
    { icon: '✅', label: 'OFFICIAL TICKETS' },
    { icon: '📱', label: 'DIGITAL DELIVERY' },
  ]
  return (
    <section style={{ padding: '2.5rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        {badges.map(({ icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>{icon}</span>
            <span style={{
              fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.75rem',
              letterSpacing: '0.15em', color: 'var(--muted)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
