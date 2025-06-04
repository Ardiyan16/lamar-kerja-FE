import FooterManage from "@/components/admin/layouts/footer";
import NavbarManage from "@/components/admin/layouts/navbar";
import Sidebar from "@/components/admin/layouts/sidebar";
import Image404 from "@/assets/images/404.png"
import Image from "next/image";
import Button from "@/components/admin/form/button";

export default function NotFound() {

    return (
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
                                <h2>Halaman tidak ditemukan</h2>
                                <div className="flex gap-3 justify-center mt-6">
                                    <Button size="lg" href="/member">Dashboard</Button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <FooterManage />
                </div>
            </div>
        </div>
    )

}

