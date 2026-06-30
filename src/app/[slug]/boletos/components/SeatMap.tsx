'use client'
import { useState } from 'react'
import type { PriceSection, Seat } from '@/lib/types'

const ROWS = ['A','B','C','D','E','F','G','H','I','J'] as const
const SECTION_FIRST: Record<string, true> = { A: true, C: true, E: true, H: true }

function SeatBtn({ seat, color, selected, onToggle }: {
  seat: Seat; color: string; selected: boolean; onToggle: () => void
}) {
  const available = seat.status === 'available'
  const statusLabel = available ? 'Disponible' : seat.status === 'sold_out' ? 'Agotado' : 'Reservado'

  return (
    <button
      onClick={available ? onToggle : undefined}
      disabled={!available}
      aria-label={`Fila ${seat.row_label} Asiento ${seat.seat_number}${selected ? ' (seleccionado)' : ''}`}
      aria-pressed={selected}
      title={`${seat.row_label}${seat.seat_number} · ${statusLabel}`}
      style={{
        width: 20, height: 20, borderRadius: '50%', border: 'none', padding: 0,
        cursor: available ? 'pointer' : 'default', flexShrink: 0,
        background: seat.status === 'sold_out' ? '#1a2530'
          : seat.status === 'held' ? '#d97706'
          : selected ? '#fff'
          : color,
        outline: selected ? '2px solid var(--gold)' : 'none',
        outlineOffset: '1px',
        opacity: seat.status === 'sold_out' ? 0.35 : 1,
        transition: 'transform 0.1s, background 0.12s',
      }}
    />
  )
}

export default function SeatMap({ seats, sections }: { seats: Seat[]; sections: PriceSection[] }) {
  const [selected, setSelected] = useState(new Set<string>())

  const sectionMap = Object.fromEntries(sections.map(s => [s.id, s]))

  const rowToSectionId = seats.reduce<Record<string, string>>((acc, s) => {
    acc[s.row_label] ||= s.section_id
    return acc
  }, {})

  const seatsByRow = seats.reduce<Record<string, Seat[]>>((acc, s) => {
    (acc[s.row_label] ||= []).push(s)
    return acc
  }, {})

  const toggle = (id: string) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const selectedList = seats.filter(s => selected.has(s.id))
  const totalPrice = selectedList.reduce((sum, s) => sum + (sectionMap[s.section_id]?.price_mxn ?? 0), 0)

  return (
    <div>
      {/* Stage */}
      <div style={{
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #1e3a4a, #162a38)',
        border: '1px solid #2a4a5a',
        borderRadius: '6px 6px 28px 28px',
        padding: '0.6rem 2rem',
        margin: '0 auto 1.75rem',
        maxWidth: 480,
        color: 'rgba(240,234,216,0.3)',
        fontFamily: 'var(--font-bebas)',
        fontSize: '0.75rem',
        letterSpacing: '0.4em',
      }}>
        ESCENARIO
      </div>

      {/* Seat grid */}
      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ minWidth: 380, display: 'inline-block', width: '100%' }}>
          {ROWS.map(row => {
            const rowSeats = (seatsByRow[row] || []).sort((a, b) => a.seat_number - b.seat_number)
            const section = sectionMap[rowToSectionId[row]]
            const color = section?.color_hex ?? '#888888'

            return (
              <div key={row}>
                {SECTION_FIRST[row] && section && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    margin: row === 'A' ? '0 0 4px 28px' : '14px 0 4px 28px',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--font-bebas)', fontSize: '0.65rem',
                      color: color, letterSpacing: '0.2em',
                    }}>
                      {section.name.toUpperCase()}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-bebas)', fontSize: '0.6rem',
                      color: 'var(--muted)', marginLeft: '0.125rem',
                    }}>
                      ${section.price_mxn.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                  <span style={{
                    width: 22, textAlign: 'right', flexShrink: 0,
                    fontFamily: 'monospace', fontSize: '0.6rem',
                    color: 'rgba(240,234,216,0.22)',
                  }}>
                    {row}
                  </span>
                  {rowSeats.map(seat => (
                    <SeatBtn
                      key={seat.id}
                      seat={seat}
                      color={color}
                      selected={selected.has(seat.id)}
                      onToggle={() => toggle(seat.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: '1.25rem', flexWrap: 'wrap',
        marginTop: '1.25rem', paddingLeft: 28,
      }}>
        {sections.map(s => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color_hex ?? '#888' }} />
            <span style={{
              fontFamily: 'var(--font-bebas)', fontSize: '0.6rem',
              color: 'var(--muted)', letterSpacing: '0.12em',
            }}>
              {s.name.toUpperCase()}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a2530', border: '1px solid #263040', opacity: 0.5 }} />
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.12em' }}>AGOTADO</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#d97706' }} />
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.12em' }}>RESERVADO</span>
        </div>
      </div>

      {/* Floating selection bar */}
      {selected.size > 0 && (
        <div style={{
          position: 'fixed', bottom: '5.5rem', left: '50%', transform: 'translateX(-50%)',
          background: '#09151c', border: '1px solid var(--gold)', borderRadius: '6px',
          padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem',
          zIndex: 50, boxShadow: '0 8px 40px rgba(0,0,0,0.8)', whiteSpace: 'nowrap',
          fontFamily: 'var(--font-bebas)',
        }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--cream)', letterSpacing: '0.06em' }}>
            {selected.size} {selected.size === 1 ? 'ASIENTO' : 'ASIENTOS'}
          </span>
          <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>
            ${totalPrice.toLocaleString('es-MX')} MXN
          </span>
          <button
            onClick={() => setSelected(new Set())}
            aria-label="Limpiar selección"
            style={{
              background: 'none', border: 'none', color: 'var(--muted)',
              cursor: 'pointer', fontSize: '0.75rem', padding: '0 0.25rem',
              fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em',
            }}
          >
            LIMPIAR
          </button>
          <button
            className="btn-gold"
            style={{ fontSize: '0.75rem', padding: '0.4rem 1.1rem', minHeight: 'auto' }}
          >
            CONTINUAR →
          </button>
        </div>
      )}
    </div>
  )
}
