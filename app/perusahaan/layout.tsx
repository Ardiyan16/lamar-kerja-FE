
import Footer from "@/components/pages/layouts/footer";
import NavbarCompany from "@/components/pages/layouts/navbar-company";
import LoadingBarProvider from "@/components/progress-bar";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastContainer } from "react-toastify";

export const viewport: Viewport = {
    height: "device-height",
    width: "device-width",
    initialScale: 1.0,
    minimumScale: 1.0,
}

export const metadata: Metadata = {
    title: "Posting Lowongan Kerja",
    description: "Anda mencari talenta terbaik dibidangnya, percayakan pada platform lowongan kerja kami",

    openGraph: {
        title: "Posting Lowongan Kerja",
        description: "Anda mencari talenta terbaik dibidangnya, percayakan pada platform lowongan kerja kami",
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

export default function PerusahaanLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NuqsAdapter>
            <LoadingBarProvider />
            <ThemeProvider attribute="class" enableSystem={false}>
                <div className="antialiased bg-zinc-100 text-zinc-900 font-primary">
                    <NavbarCompany />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
            <ToastContainer />
        </NuqsAdapter>
    );
}

