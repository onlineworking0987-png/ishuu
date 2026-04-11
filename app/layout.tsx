import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { inter, jetbrainsMono, playfairDisplay } from '@/lib/fonts'
import { chewy } from '@/lib/font-chewy'
import './globals.css'

export const metadata: Metadata = {
  title: 'ishuu - Your Digital Operations Partner',
  description: 'We are a strategic partner that functions as your internal technology department, so you stop being the bottleneck and start being the owner again.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${chewy.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
