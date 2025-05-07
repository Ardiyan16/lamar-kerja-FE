'use client'

import Image from "next/image"
import Link from "next/link"
import { RiBriefcaseLine, RiCalendarEventLine, RiCustomerServiceLine, RiDashboardLine, RiHome2Line, RiMenuLine, RiServiceLine, RiUser2Line, RiUser3Line } from "react-icons/ri"
import logo from "@/assets/images/logo.png"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDisableBodyScroll } from "@/hooks/useDisableBodyScroll"
import { useOnClickOutside } from "usehooks-ts"

const NavbarCompany = () => {

    const Menu = [
        {
            name: 'Beranda',
            link: '/perusahaan',
            icon: <RiHome2Line className="w-5 h-5" />
        },
        {
            name: 'Layanan Kami',
            link: '/perusahaan/layanan-kami',
            icon: <RiServiceLine className="w-5 h-5" />
        },
        {
            name: 'Tips & Trick',
            link: '/perusahaan/tips-trick',
            icon: <RiCustomerServiceLine className="w-5 h-5" />
        },
        {
            name: 'Event',
            link: '/perusahaan/event',
            icon: <RiCalendarEventLine className="w-5 h-5" />
        },
    ]

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [isMenuMdOpen, setIsMenuMdOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isMount, setIsMount] = useState<boolean>(false)

    const menuMdRef = useRef(null!)
    const menuSmRef = useRef(null!)
    const btnMenuMdRef = useRef<HTMLDivElement | null>(null)

    useDisableBodyScroll(menuOpen);

    useOnClickOutside(menuMdRef, (event) => {
        if (btnMenuMdRef.current && !btnMenuMdRef.current.contains(event.target as Node)) {
            setIsMenuMdOpen(false);
        }
    })


    useOnClickOutside(menuSmRef, () => {
        setMenuOpen(false);
    })

    useEffect(() => {
        const a = localStorage.getItem('a')
        const b = localStorage.getItem('b')
        const c = localStorage.getItem('c')
        const d = localStorage.getItem('d')
        const e = localStorage.getItem('e')
        if (a && b && c && d && e) {
            if (e == '3') {
                setIsLoggedIn(true)
            }
        }
        setIsMount(true)
    }, [])
    return (
        <div className='relative z-50'>
            <div className="h-20 bg-white text-zinc-900 shadow-md">
                <div className="relative container mx-auto h-full flex sm:flex-row items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center ">
                            <Link href="/" className="text-base md:text-lg flex gap-2 items-center">
                                <Image alt="logo" src={logo} width={175} height={40} className='drop-shadow-[0_0px_1px_rgba(255,255,255,.5)] aspect-square object-scale-down min-w-12 min-h-12 rounded' />
                                {/* <div className='ml-2'>
                                <span className="tracking-wide">
                                    Lamar
                                </span>
                                <span className="font-bold">Kerja.com</span>
                            </div> */}
                            </Link>
                        </div>
                        <div className='hidden lg:ml-6 sm:flex flex-col sm:flex-row items-center'>
                            {Menu.map((menu, i) => (
                                <Link key={i} href={menu.link} className="cursor-pointer hover:contrast-150 px-2 md:px-3 text-sm text-primary hover:text-zinc-900 hover:underline rounded transition duration-300 py-1">{menu.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2 text-sm lg:text-base md:space-x-6">
                        <Fragment>
                            <Link href="/masuk-perusahaan" className="hidden xl:block text-primary hover:text-zinc-900 hover:underline cursor-pointer text-sm">Masuk</Link>
                            {isMount ? isLoggedIn ? (
                                <Link href="/perusahaan/dashboard" className="hidden md:flex px-3 py-2 rounded-md text-white bg-primary items-center gap-2">
                                    <RiDashboardLine />
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href="/masuk-perusahaan" className="hidden md:flex px-3 py-2 rounded-md text-white bg-primary items-center gap-2">
                                    <RiBriefcaseLine />
                                    Pasang Lowongan
                                </Link>
                            ) : (
                                <div className="skeleton-container gap-4 flex justify-end">
                                    <div className='h-4 rounded-lg bg-zinc-800 w-5 md:w-32' />
                                </div>
                            )}
                            <Link href="/" className="hidden md:flex px-3 py-2 rounded-md text-white bg-primary items-center gap-2">
                                <RiUser2Line />
                                Sebagai Pelamar
                            </Link>
                        </Fragment>


                        {/* <div className='md:hidden xl:block'>
                            <ThemeToggle />
                        </div> */}
                        <div
                            ref={btnMenuMdRef}
                            className='hidden md:block xl:hidden'
                            onClick={() => setIsMenuMdOpen(prev => !prev)}
                        >
                            <RiMenuLine className="w-5 h-5" />
                        </div>
                        <div className='block sm:hidden' onClick={() => setMenuOpen(true)} >
                            <RiMenuLine className="w-6 h-6" />
                        </div>
                        <div className="hidden sm:block md:hidden"><RiUser3Line className='w-5 h-5' /></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NavbarCompany

