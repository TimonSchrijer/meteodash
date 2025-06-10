import type React from "react"
import { inter } from "@/lib/fonts"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable}`}>
      <head>
        <title>Meteorologen Dashboard</title>
        <meta name="description" content="Buienradar Meteorologen Dashboard voor Nederlandse kustregio's" />
      </head>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
