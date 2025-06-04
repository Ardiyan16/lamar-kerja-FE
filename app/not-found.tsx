'use client'

import "../style/globals.css";
import FooterManage from "@/components/admin/layouts/footer";
import NavbarManage from "@/components/admin/layouts/navbar";
import Sidebar from "@/components/admin/layouts/sidebar";
import Image404 from "@/assets/images/404.png"
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/components/admin/form/button";
import Navbar from "@/components/pages/layouts/navbar";
import Footer from "@/components/pages/layouts/footer";
import NavbarCompany from "@/components/pages/layouts/navbar-company";

export default function NotFound() {

    const pathname = usePathname()
    const checkUrl = pathname.split('/')[1]

    return (
        <div>
            {checkUrl === 'member' || checkUrl === "admin" ? (
                <div className="antialiased bg-gray-100 text-gray-900 font-primary">
                    <div className="flex h-screen overflow-hidden">
                        <Sidebar />
                        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden text-gray-800 bg-gray-100">
                            <NavbarManage />
                            <main className="flex-grow text-sm md:text-base">
                                <div className="font-primary flex items-center justify-center w-full min-h-screen overflow-hidden">
                                    <div className="text-center">
                                        <div className="flex items-center gap-4 text-zinc-600">
                                            <Image alt="404" src={Image404} height={0} width={0} className="max-w-[400px]" />
                                        </div>
                                        <h2 className="text-3xl">Halaman tidak ditemukan</h2>
                                        <div className="flex gap-3 justify-center mt-6">
                                            <Button variant="primary" size="lg" href={checkUrl === "member" ? "/member" : "/admin"}>Dashboard</Button>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            <FooterManage />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="antialiased bg-gray-100 text-gray-900 font-primary">
                        {checkUrl === "perusahaan" ? <NavbarCompany /> : <Navbar />}
                        <main className="flex-grow text-sm md:text-base">
                            <div className="font-primary flex items-center justify-center w-full min-h-screen overflow-hidden">
                                <div className="text-center">
                                    <div className="flex items-center gap-4 text-zinc-600">
                                        <Image alt="404" src={Image404} height={0} width={0} className="max-w-[400px]" />
                                    </div>
                                    <h2 className="text-3xl">Halaman tidak ditemukan</h2>
                                    <div className="flex gap-3 justify-center mt-6">
                                        <Button variant="primary" size="lg" href={checkUrl === "perusahaan" ? "/perusahaan" : "/"}>Halaman Utama</Button>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            )
            }
        </div>
    )

}

