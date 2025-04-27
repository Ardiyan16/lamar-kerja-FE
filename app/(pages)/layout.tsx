import type { Metadata, Viewport } from "next";
import "../../style/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next";
import { ThemeProvider } from 'next-themes'
import Navbar from "@/components/pages/layouts/navbar";
import LoadingBarProvider from "@/components/progress-bar";

export const viewport: Viewport = {
  height: "device-height",
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
}

export const metadata: Metadata = {
  title: "Lamar Kerja",
  description: "Bingung menjari lowongan kerja, daftarkan segera ke website kami",

  openGraph: {
    title: "Lamar Kerja",
    description: "Bingung menjari lowongan kerja, daftarkan segera ke website kami",
    type: "website",
    locale: "id_ID",
    siteName: "Lamar Kerja"
  },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: 'images/favico.png'
}
};

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <LoadingBarProvider />
        <ThemeProvider attribute="class" enableSystem={false}>
          <div className="antialiased bg-zinc-100 text-zinc-900 font-primary">
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </div>
        </ThemeProvider>
    </NuqsAdapter>
  );
}
