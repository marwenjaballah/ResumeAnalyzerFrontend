import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { env } from "@/config/env"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${env.site.name} | AI-Powered Resume Analysis`,
    template: `%s | ${env.site.name}`
  },
  description: env.site.description,
  keywords: [
    "resume analysis",
    "AI resume analyzer",
    "resume optimization",
    "job application",
    "career advice",
    "resume improvement",
    "job search",
    "resume tips",
    "resume scoring",
    "resume feedback"
  ],
  authors: [{ name: "Marwen Jaballah" }],
  creator: env.site.name,
  publisher: env.site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(env.site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${env.site.name} | AI-Powered Resume Analysis`,
    description: env.site.description,
    siteName: env.site.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${env.site.name} - AI-Powered Resume Analysis`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${env.site.name} | AI-Powered Resume Analysis`,
    description: env.site.description,
    images: ["/og-image.png"],
    creator: env.site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
