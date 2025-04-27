'use client'

import Link from "next/link"
import { FC, Fragment, useEffect, useRef, useState } from "react"
import { RiArrowDownSLine, RiBuilding4Line, RiLoginBoxLine, RiLoginCircleLine, RiLogoutBoxRLine, RiMenuLine, RiNotification4Line, RiPagesLine, RiSuitcaseLine, RiUser3Line } from "react-icons/ri"
import { useOnClickOutside } from "usehooks-ts"
import logo from "@/assets/images/logo.png"
import Image from "next/image"
import { AnimatePresence, motion } from 'motion/react';
import { useDisableBodyScroll } from "@/hooks/useDisableBodyScroll"
import { UsersType } from "@/interface/user"
import clsx from 'clsx';
import DefaultProfile from "@/public/images/user.png"
import callApi from "@/utils/callapi"
import { Notification, NotifLogout } from "@/utils/notification"
import { ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"

const Navbar = () => {

    const Menu = [
        {
            name: 'Lowongan Kerja',
            link: '/lowongan-kerja',
            icon: <RiSuitcaseLine className="w-5 h-5" />
        },
        {
            name: 'Perusahaan',
            link: '/perusahaan',
            icon: <RiBuilding4Line className="w-5 h-5" />
        },
        {
            name: 'Profile Anda',
            link: '/profile',
            icon: <RiUser3Line className="w-5 h-5" />
        },
        {
            name: 'Blog',
            link: '/blog',
            icon: <RiPagesLine className="w-5 h-5" />
        },
    ]

    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [isMenuMdOpen, setIsMenuMdOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isMount, setIsMount] = useState<boolean>(false)

    const menuMdRef = useRef(null)
    const menuSmRef = useRef(null)
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
            setIsLoggedIn(true)
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
                        {isMount ? isLoggedIn ? (
                            <button type="button">
                                <Avatar />
                            </button>
                        ) : (
                            <Fragment>
                                <Link href="/masuk" className="hidden xl:block text-primary hover:text-zinc-900 hover:underline cursor-pointer text-sm">Masuk</Link>
                                <Link href="/daftar" className="hidden xl:block text-primary hover:text-zinc-900 hover:underline cursor-pointer text-sm">Daftar</Link>
                                <Link href={``} className="hidden md:flex px-3 py-2 rounded-md text-white bg-primary items-center gap-2">
                                    <RiBuilding4Line />
                                    Sebagai Perusahaan
                                </Link>
                            </Fragment>
                        ) : (
                            <div className="skeleton-container gap-4 flex justify-end">
                                <div className='h-4 rounded-lg bg-zinc-800 w-5 md:w-32' />
                            </div>
                        )}


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

                    {/* toggle medium screen */}
                    <AnimatePresence mode="wait">
                        {isMenuMdOpen && (
                            <motion.div
                                ref={menuMdRef}
                                key="topMenu"
                                initial={{ x: 10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 10, opacity: 0 }}
                                className="absolute top-16 mx-16 right-0 min-w-52 shadow-custom space-y-1 rounded-lg bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-200 h-auto max-h-[calc(100vh-4rem)] overflow-y-auto z-50  text-sm ">
                                <div className="p-1">
                                    <Link href="/masuk" className='flex items-center gap-2 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer px-3 py-2 rounded-lg transition duration-300'>
                                        <RiLoginCircleLine />
                                        <span>Masuk</span>
                                    </Link>
                                    <Link href="/daftar" className='flex items-center gap-2 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer px-3 py-2 rounded-lg transition duration-300'>
                                        <RiLoginBoxLine />
                                        <span>Daftar</span>
                                    </Link>
                                </div>
                                {/* <div className='mx-auto text-center bg-zinc-100 dark:bg-zinc-800'>
                                    <ThemeToggle />
                                </div> */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

const Avatar = () => {
    const [profileOpen, setProfileOpen] = useState<boolean>(false)
    const toggleRefs = useRef(null)
    const [data, setData] = useState<UsersType>()

    const fetchData = async () => {
        try {
            const response = await callApi.get('/employee/user');
            const data_res = response.data.data
            setData(data_res)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="relative">
            <div className="flex gap-8">
                <div className="relative cursor-pointer top-2">
                    <RiNotification4Line className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        5
                    </span>
                </div>
                <div
                    ref={toggleRefs}
                    className="flex items-center justify-between gap-2  cursor-pointer"
                    onClick={() => setProfileOpen((prev) => !prev)}
                >
                    <Image className="rounded-full w-8 h-8" width={0} height={0} sizes='100%' src={DefaultProfile} alt="Avatar" />
                    <div className="mr-2 hidden sm:block">
                        <div className="text-primary">{data?.username}</div>
                        {/* <div className="text-sm text-gray-600">{memberKategori}</div> */}
                    </div>
                    <RiArrowDownSLine className={clsx("w-4 h-4 transition duration-500 transform-gpu", profileOpen && "rotate-180")} />
                    <AnimatePresence>
                {profileOpen && <DropdownProfile onClose={() => setProfileOpen(false)} excludeRefs={toggleRefs} nama={data?.username} type={data?.type} />}
            </AnimatePresence>
                </div>

            </div>
        </div>
    )

}

interface dropdownProfile {
    onClose: () => void,
    excludeRefs: any,
    nama: string | undefined,
    type: number | undefined,
}

const DropdownProfile: FC<dropdownProfile> = ({ onClose, excludeRefs, nama, type }) => {

    const profileRef = useRef<HTMLDivElement>(null!);
    const router = useRouter()
    useOnClickOutside(profileRef, (event) => {
        if (excludeRefs.current && !excludeRefs.current.contains(event.target as Node)) {
            onClose()
        }
    })

    const logout = () => {
        NotifLogout('silahkan klik button keluar untuk meninggalkan akses', 'question').then((result) => {
            if(result.isConfirmed) {
                localStorage.removeItem('a')
                localStorage.removeItem('b')
                localStorage.removeItem('c')
                localStorage.removeItem('d')
                localStorage.removeItem('e')
                Notification('Anda berhasil keluar', 'success', 1500)
                setTimeout(() => {
                    router.push('/masuk')
                }, 1500)
            }
        })
    }

    return (
        <motion.div
            ref={profileRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 left-12 bg-white rounded w-64 sm:w-56 shadow-lg"
        >
            <div className="p-1">
                <div className='block sm:hidden px-4 py-2 my-2'>
                    <div>{nama}</div>
                    <div className='text-xs text-gray-600'>{type == 2 ? 'Calon Pegawai' : 'Perusahaan'}</div>
                </div>

                <Link href="/member/profile"><div className="flex items-center justify-start gap-4 hover:bg-gray-200 text-primary cursor-pointer px-4 py-2 rounded">
                    <RiUser3Line className="w-5 h-5" />
                    <span>Profile</span>
                </div></Link>
            </div>
            <div className="border-t border-t-primary p-1">
                <div onClick={() => logout()} className="flex items-center justify-start gap-4 hover:bg-gray-200 text-primary cursor-pointer px-4 py-2 rounded">
                    <RiLogoutBoxRLine className="w-5 h-5" />
                    <span>Logout</span>
                </div>
            </div>

        </motion.div>
    )

}


export default Navbar


