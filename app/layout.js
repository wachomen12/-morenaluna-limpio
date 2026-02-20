import './globals.css'

export const metadata = {
  metadataBase: new URL('https://morenaluna.com'),
  title: 'MORENA LUNA | Accesorios & Joyería Exclusiva',
  description: 'Descubre nuestra colección exclusiva de collares, pulseras, chokers y accesorios artesanales. Diseños únicos hechos con amor por Arianna. Envíos a todo Ecuador.',
  keywords: ['accesorios', 'pulseras', 'collares', 'chokers', 'joyería', 'morena luna', 'accesorios Ecuador', 'pulseras artesanales'],
  authors: [{ name: 'Morena Luna by Arianna' }],
  creator: 'Morena Luna',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'MORENA LUNA | Accesorios & Joyería Exclusiva',
    description: 'Colección exclusiva de collares, pulseras y accesorios artesanales. Diseños únicos por Arianna.',
    type: 'website',
    locale: 'es_EC',
    siteName: 'MORENA LUNA',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Morena Luna Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MORENA LUNA | Accesorios Exclusivos',
    description: 'Colección exclusiva de collares, pulseras y accesorios artesanales.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#8B5A8B" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
