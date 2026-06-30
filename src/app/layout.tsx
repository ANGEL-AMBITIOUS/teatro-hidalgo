import type { Metadata } from 'next'
import { Hanken_Grotesk, Bebas_Neue } from 'next/font/google'
import './globals.css'

// Roobert (body vivo) es self-hosted en WP — sin licencia libre. Hanken Grotesk es el humanist sans más cercano en Google Fonts.
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-hanken' })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' })

export const metadata: Metadata = {
  title: 'Teatro Hidalgo Ignacio Retes',
  description: 'Plataforma oficial de boletos — Teatro Hidalgo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${hanken.variable} ${bebas.variable}`}>
        {children}
      </body>
    </html>
  )
}
