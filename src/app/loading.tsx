export default function Loading() {
  return (
    <div style={{
      background: 'var(--bg-deep)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '2rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-bebas)', fontSize: '1rem',
        color: 'var(--gold)', letterSpacing: '0.2em',
      }}>
        TEATRO HIDALGO
      </span>

      {/* Skeleton bar stack */}
      <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[100, 75, 60].map((w, i) => (
          <div key={i} style={{
            height: i === 0 ? '14px' : '10px',
            width: `${w}%`,
            background: 'var(--border)',
            borderRadius: '2px',
            animation: 'pulse 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}
