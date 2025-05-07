'use client'

import { sidebarAtom } from "@/atom/sidebar"
import clsx from "clsx"
import { useAtom } from "jotai"
import Image from "next/image"
import Link from "next/link"
import { FC, Fragment, ReactNode, useEffect, useRef, useState } from "react"
import { RiArrowDownSLine, RiArrowRightSLine, RiBriefcaseLine, RiBuilding2Line, RiDashboardLine, RiFileListLine, RiFlagLine, RiNotification4Line, RiUser2Line, RiUserLine } from "react-icons/ri"
import { useOnClickOutside, useWindowSize } from "usehooks-ts"
import logo from "@/public/images/logo2.png"
import logo2 from "@/public/images/favico.png"
import { usePathname, useRouter } from "next/navigation"
import { safePolygon, useFloating, useHover, useInteractions } from '@floating-ui/react';

const Sidebar = () => {
    const [sideBarOpen, setSideBarOpen] = useAtom(sidebarAtom)
    const [mount, setMount] = useState<boolean>(false)
    const { width = 0 } = useWindowSize()
    const ref = useRef(null!);
    const [typeUser, setTypeUser] = useState<string | number | null>(1)

    let menu = companyMenu
    if (typeUser == 3) {
        menu = companyMenu
    } else if (typeUser == 1) {
        menu = adminMenu
    }

    useEffect(() => {
        const type = localStorage.getItem('e')
        setTypeUser(type)
        setMount(true)
    }, [])

    useOnClickOutside(ref, () => setSideBarOpen(false))

    if (!mount) {
        return <SkeletonSidebar />;
    }

    return (
        <aside
            ref={width < 1024 ? ref : null}
            className={clsx(
                "absolute left-0 top-0 z-50 flex h-screen flex-col duration-300 lg:static lg:translate-x-0 bg-blue2 p-5 transform-gpu transition-all",
                { "w-72 translate-x-0": sideBarOpen },
                { "w-20 -translate-x-full items-center": !sideBarOpen },
            )}
        >
            <div className="flex items-center justify-between text-gray-200 mb-10">
                {sideBarOpen ? (
                    <Link href="/" target="_blank" className="text link">
                        <Image alt="logo" src={logo} width={175} height={40} className='drop-shadow-[0_0px_1px_rgba(255,255,255,.5)] object-scale-down min-w-12 min-h-12 rounded' />
                    </Link>

                ) : (
                    <Link href="/" target='_blank' className="text-lg">
                        <Image alt="logo" src={logo2} width={50} height={50} className='drop-shadow-[0_0px_1px_rgba(255,255,255,.5)] object-scale-down min-w-12 min-h-12 rounded' />
                    </Link>
                )}
            </div>

            {sideBarOpen && (
                <div className="text-xs uppercase tracking-widest text-gray-300 mb-4">Menu</div>
            )}

            {menu.map((data, i) => (
                <NavItem
                    key={`sidebar-${i}`}
                    icon={data.icon}
                    label={data.label}
                    href={data.href}
                    dropdown={data.dropdown}
                />
            ))}
        </aside>
    )

}

export default Sidebar

type NavItemType = {
    icon?: ReactNode,
    label?: string,
    href?: string,
    dropdown?: {
        label: string,
        href: string
    }[]
}

const NavItem: FC<NavItemType> = ({icon, label, href = "", dropdown}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarAtom);

    const router = useRouter()
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const isActive = pathname === href;
    const { width = 0 } = useWindowSize()


    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const handleNavigate = (link: string) => {
        if (width < 640 && isSidebarOpen === true) {
            setIsSidebarOpen(false)
        }
        router.push(link)
    }

    const { refs, floatingStyles, context } = useFloating({
        open: isTooltipOpen,
        onOpenChange: setIsTooltipOpen,
        placement: "right-start",
    })

    const hover = useHover(context, {
        mouseOnly: true,
        handleClose: safePolygon({
            requireIntent: false,
            buffer: 0.5,
        }),
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
    ]);

    useEffect(() => {
        if (isDropdownOpen === true) {
            setIsDropdownOpen(false);
        }
    }, [isSidebarOpen])

    return (
        <div>
            {dropdown ? (
                <Fragment>
                    <div ref={refs.setReference} {...getReferenceProps()} className='cursor-pointer'>
                        <div
                            onClick={toggleDropdown}
                            className={clsx(
                                'flex items-center justify-between gap-3 transition duration-300 px-4 h-10 rounded-lg text-sm tracking-wide',
                                dropdown.some(d => pathname === d.href) ? "bg-gray-700/70 text-white font-medium" : "text-gray-300 hover:text-white",
                                isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
                            )}
                        >
                            <div className='flex gap-3 items-center'>
                                {icon && <div>{icon}</div>}
                                {isSidebarOpen && (<div>{label}</div>)}
                            </div>

                            {isSidebarOpen && (
                                <div><RiArrowDownSLine className={clsx("transform transition duration-300", { "rotate-180": isDropdownOpen })} /></div>
                            )}
                        </div>

                        {isDropdownOpen && (
                            <div className="ml-6 rounded-lg w-48">
                                {dropdown.map((d, index) => {
                                    const isActiveDropdown = pathname === d.href;
                                    return (
                                        <Link
                                            href={d.href}
                                            key={index}
                                            onClick={() => handleNavigate(href)}
                                            className={clsx(
                                                'flex items-center gap-3 pl-6 h-10 text-sm tracking-wide cursor-pointer transition duration-300 transform',
                                                isActiveDropdown ? 'text-white' : 'text-gray-300 hover:text-white hover:translate-x-1'
                                            )}
                                        > 
                                            <div>{d.label}</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>


                    {isTooltipOpen && (
                        <div
                            {...getFloatingProps()}
                            ref={refs.setFloating}
                            style={floatingStyles}
                            className={clsx(
                                'bg-white rounded-lg min-w-48 ml-5 shadow-manage cursor-pointer',
                                isSidebarOpen ? "hidden lg:hidden" : "hidden lg:block"
                            )}
                        >
                            <div className="rounded-lg text-sm p-0.5 shadow-sm">
                                <div className="bg-gray-800  px-4 py-2 h-10 flex text-white items-center rounded-lg">
                                    {label}
                                </div>

                                {dropdown.map((d, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={d.href || "#"}
                                            className={clsx(
                                                'flex items-center gap-3 h-10 px-2 text-sm tracking-wide cursor-pointer transition duration-300 transform text-gray-800 hover:text-black hover:translate-x-1'
                                            )}
                                        >
                                            <div>{d.label}</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <div ref={refs.setReference} {...getReferenceProps()}>
                        <div onClick={() => handleNavigate(href)} className={clsx(
                            'flex items-center gap-3 transition duration-300 px-4 py-3 cursor-pointer rounded-lg text-sm tracking-wide whitespace-nowrap transform',
                            isActive ? "bg-blue1 text-white font-medium" : "text-gray-300 hover:text-white"
                        )}>
                            {icon && <div>{icon}</div>}
                            <div className={clsx(
                                { "hidden": !isSidebarOpen },
                                { "block": isSidebarOpen }
                            )}>{label}</div>
                        </div>
                    </div>
                    {isTooltipOpen && (
                        <div
                            onClick={() => handleNavigate(href)}
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                            className={clsx(
                                'min-w-48 ml-5 shadow-manage cursor-pointer',
                                isSidebarOpen ? "hidden lg:hidden" : "hidden lg:block"
                            )}
                        >
                            <div className="group bg-gray-800 shadow-sm text-gray-200 hover:text-white px-4 h-10 flex items-center justify-between rounded-lg text-sm">
                                <div>{label}</div>
                                <RiArrowRightSLine className='w-5 h-5  transfform -translate-x-1 group-hover:translate-x-0 transition duration-300' />
                            </div>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    )

}


const SkeletonSidebar = () => {
    return (

        <div className="hidden absolute left-0 top-0 z-50 md:flex h-screen flex-col lg:static lg:translate-x-0 bg-blue2 p-5 lg:w-64 ld:translate-x-0 w-20 -translate-x-full items-start">
            <div className="skeleton-container bg-blue3 rounded-lg h-4 w-52 hidden lg:block"></div>
            <div className="mt-12 text-left hidden lg:block">
                <div className="skeleton-container bg-blue3 rounded-lg h-3 w-14"></div>
            </div>
            <div className="mt-6 hidden lg:block">
                <div className="skeleton-container bg-blue3 rounded-lg h-3 w-36 mb-5 ml-4"></div>
                <div className="skeleton-container bg-blue3 rounded-lg h-3 w-40 mb-5 ml-4"></div>
                <div className="skeleton-container bg-blue3 rounded-lg h-3 w-32 mb-5 ml-4"></div>
                <div className="skeleton-container bg-blue3 rounded-lg h-3 w-48 mb-5 ml-4"></div>
                <div className="skeleton-container bg-blue3 rounded-lg h-3 w-20 mb-5 ml-4"></div>
            </div>
        </div>
    )
}

const adminMenu: NavItemType[] = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: <RiDashboardLine className="h-5 w-5" />
    },
    {
        label: 'Perusahaan',
        href: '/admin/perusahaan',
        icon: <RiBuilding2Line className="h-5 w-5" />
    },
    {
        label: 'Pengguna (Pencari Kerja)',
        href: '/admin/pencari-kerja',
        icon: <RiUser2Line className="h-5 w-5" />
    },
    {
        label: 'Posting Lowongan',
        icon: <RiBriefcaseLine className="h-5 w-5" />,
        dropdown: [
            {
                label: 'List Lowongan',
                href: '/admin/list-lowongan'
            },
            {
                label: 'Rekap',
                href: '/admin/rekap-lowongan'
            }
        ]
    },
    {
        label: 'Data Data',
        icon: <RiFileListLine className="h-5 w-5" />,
        dropdown: [
            {
                label: 'Tipe Industri',
                href: '/admin/data/tipe-industri'
            },
            {
                label: 'Bidang Kerja',
                href: '/admin/data/bidang-kerja'
            },
            {
                label: 'Sub Bidang Kerja',
                href: '/admin/data/sub-bidang-kerja'
            }
        ]
    },
    {
        label: 'Laporan User',
        icon: <RiFlagLine className="h-5 w-5" />,
        dropdown: [
            {
                label: 'Laporan Posting Lowongan',
                href: '/admin/laporan/postingan'
            },
            {
                label: 'Laporan Perusahaan',
                href: '/admin/laporan/perusahaan'
            }
        ]
    }
]

const companyMenu: NavItemType[] = [
    {
        label: 'Dashboard',
        href: '/member',
        icon: <RiDashboardLine className="h-5 w-5" />
    },
    {
        label: 'Profile',
        href: '/member/profile',
        icon: <RiUserLine className="h-5 w-5" />
    },
    {
        label: 'Pasang Lowongan',
        href: '/member/pasang-lowongan',
        icon: <RiBriefcaseLine className="h-5 w-5" />
    },
    {
        label: 'Notifikasi',
        href: '/member/notifikasi',
        icon: <RiNotification4Line className="h-5 w-5" />
    }
]
