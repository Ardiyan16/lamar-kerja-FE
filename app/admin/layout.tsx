
import FooterManage from "@/components/admin/layouts/footer";
import NavbarManage from "@/components/admin/layouts/navbar";
import Sidebar from "@/components/admin/layouts/sidebar";
import { CheckAuthMember } from "@/components/pages/navigation/check-auth";
import LoadingBarProvider from "@/components/progress-bar";
import { Provider } from "jotai";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastContainer } from "react-toastify";


export const viewport: Viewport = {
    height: "device-height",
    width: "device-width",
    initialScale: 1.0,
    minimumScale: 1.0,
}

export const metadata: Metadata = {
    title: "Admin - LamarKerja.com",
    description: "Halaman Admin",

    openGraph: {
        title: "Posting Lowongan Kerja",
        description: "Halaman Admin",
        type: "website",
        locale: "id_ID",
        siteName: "Lamar Kerja"
    },

    icons: {
        icon: 'images/favico.png'
    }
};


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NuqsAdapter>
            <LoadingBarProvider />
            <ThemeProvider attribute="class" enableSystem={false}>
                <Provider>
                    <div className="antialiased bg-gray-100 text-gray-900 font-primary">
                        <div className="flex h-screen overflow-hidden">
                            <Sidebar />
                            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden text-gray-800 bg-gray-100">
                                <CheckAuthMember />
                                <NavbarManage />
                                <main className="flex-grow text-sm md:text-base">
                                    {children}
                                </main>
                                <FooterManage />
                            </div>
                        </div>
                    </div>
                </Provider>
            </ThemeProvider>
            <ToastContainer />
        </NuqsAdapter>
    );
}

