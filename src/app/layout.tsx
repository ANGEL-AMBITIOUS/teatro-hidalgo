import type { Metadata } from 'next'
import { Inter, Bodoni_Moda } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-bodoni' })

export const metadata: Metadata = {
  title: 'Teatro Hidalgo Ignacio Retes',
  description: 'Plataforma oficial de boletos — Teatro Hidalgo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${bodoni.variable}`}>
        {children}
      </body>
    </html>
  )
}
