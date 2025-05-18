import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Resume Analyzer | AI-Powered Resume Analysis",
    template: "%s | Resume Analyzer"
  },
  description: "Get instant AI-powered analysis of your resume. Improve your chances of landing interviews with personalized suggestions, keyword matching, and section scores.",
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
  creator: "Resume Analyzer",
  publisher: "Resume Analyzer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Resume Analyzer | AI-Powered Resume Analysis",
    description: "Get instant AI-powered analysis of your resume. Improve your chances of landing interviews with personalized suggestions, keyword matching, and section scores.",
    siteName: "Resume Analyzer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Analyzer - AI-Powered Resume Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Analyzer | AI-Powered Resume Analysis",
    description: "Get instant AI-powered analysis of your resume. Improve your chances of landing interviews with personalized suggestions, keyword matching, and section scores.",
    images: ["/og-image.png"],
    creator: "@MarwenJaballah",
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
