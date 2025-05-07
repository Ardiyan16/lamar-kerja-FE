'use client'
import { sidebarAtom } from "@/atom/sidebar"
import { useAtomValue, useSetAtom } from "jotai"
import { FC, useEffect, useRef, useState } from "react"
import { RiArrowDownSLine, RiLogoutBoxRLine, RiMenu2Fill, RiUser3Line } from "react-icons/ri"
import DefaultProfile from "@/public/images/user.png"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { useOnClickOutside } from "usehooks-ts"
import Link from "next/link"
import clsx from "clsx"
import { NotifLogout } from "@/utils/notification"
import { useRouter } from "next/navigation"
import { UsersType } from "@/interface/user"
import { avatarProfile } from "@/atom/avatar"
import callApi from "@/utils/callapi"
import { CompanyUserTypeJoin } from "@/interface/company"
import { urlImg } from "@/utils/global"

interface dropdownProfile {
    onClose: () => void,
    excludeRefs: any,
    nama: string | undefined,
    type: number | string | undefined | null,
    onLogout: () => void
}

const NavbarManage = () => {
    const setSidebarOpen = useSetAtom(sidebarAtom)
    return (
        <header className="sticky top-0 z-40 flex w-full bg-white dark:text-gray-200 shadow-sm dark:shadow-none min-h-16 max-h-16 items-center justify-between px-4">
            <div className='hover:bg-primary2 p-3 rounded-lg cursor-pointer' onClick={() => setSidebarOpen(prev => !prev)}>
                <RiMenu2Fill className="text-gray-900" />
            </div>
            <Avatar />
        </header>
    )
}

const Avatar = () => {
    const router = useRouter()
    const imgUrl = urlImg()
    const [profileOpen, setProfileOpen] = useState(false);
    const toggleRefs = useRef(null);
    const [data, setData] = useState<CompanyUserTypeJoin>()
    const avatarAtom = useAtomValue(avatarProfile)
    const [type, setType] = useState<string | null>('')

    useEffect(() => {
        const type = localStorage.getItem('e')
        setType(type)
        if (type === '3') {
            fetchData()
        }
    }, [])

    const fetchData = async () => {
        try {
            const reponse = await callApi.get('/company')
            const data = reponse.data.data
            if (reponse.data.status) {
                setData(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    let logoUrl = data?.logo_profile ? imgUrl + "/logo_company/" + data.logo_profile : DefaultProfile
    logoUrl = avatarAtom !== "" ? avatarAtom : logoUrl

    let nameProfile = data?.name
    if (nameProfile) {
        nameProfile = nameProfile?.length > 15 ? nameProfile?.slice(0, 15) + "..." : nameProfile
    }

    nameProfile = nameProfile ? nameProfile : 'Admin'

    const logout = () => {
        NotifLogout('silahkan klik button keluar untuk meninggalkan halaman', 'question').then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('a')
                localStorage.removeItem('b')
                localStorage.removeItem('c')
                localStorage.removeItem('d')
                localStorage.removeItem('e')
                router.push('/masuk-perusahaan')
            }
        })
    }

    return (
        <div className="relative">
            <div
                ref={toggleRefs}
                className="flex items-center justify-between gap-2  cursor-pointer"
                onClick={() => setProfileOpen((prev) => !prev)}
            >
                <Image className="rounded-full w-8 h-8" width={0} height={0} sizes='100%' src={logoUrl} alt="Avatar" />
                <div className="mr-2 hidden sm:block">
                    <div className="text-gray-900">{type !== "1" ? nameProfile : 'Admin'}</div>
                    {/* <div className="text-sm text-gray-600">{memberKategori}</div> */}
                </div>
                <RiArrowDownSLine className={clsx("w-4 h-4 transition duration-500 transform-gpu text-gray-900", profileOpen && "rotate-180")} />
                <AnimatePresence>
                    {profileOpen && <DropdownProfile onClose={() => setProfileOpen(false)} excludeRefs={toggleRefs} nama="PT Testing" type={type} onLogout={() => logout()} />}
                </AnimatePresence>
            </div>
        </div>
    )
}

const DropdownProfile: FC<dropdownProfile> = ({
    onClose, excludeRefs, nama, type, onLogout
}) => {

    const profileRef = useRef<HTMLDivElement>(null!);
    useOnClickOutside(profileRef, (event) => {
        if (excludeRefs.current && !excludeRefs.current.contains(event.target as Node)) {
            onClose()
        }
    })

    return (
        <motion.div
            ref={profileRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-15 right-0 bg-white rounded w-64 sm:w-56 shadow-lg"
        >
            <div className="p-1">
                <div className='block sm:hidden px-4 py-2 my-2'>
                    <div>{nama}</div>
                    <div className='text-xs text-gray-600'>{type == 2 ? 'Calon Pegawai' : 'Perusahaan'}</div>
                </div>
                {type === 3 &&
                    <Link href="/member/profile"><div className="flex items-center justify-start gap-4 hover:bg-gray-200 text-gray-900 cursor-pointer px-4 py-2 rounded">
                        <RiUser3Line className="w-5 h-5" />
                        <span>Profile</span>
                    </div></Link>
                }
            </div>
            <div className="border-t border-t-gray-400 p-1">
                <div onClick={() => onLogout()} className="flex items-center justify-start gap-4 hover:bg-gray-200 text-gray-900 cursor-pointer px-4 py-2 rounded">
                    <RiLogoutBoxRLine className="w-5 h-5" />
                    <span>Logout</span>
                </div>
            </div>

        </motion.div>
    )

}


export default NavbarManage
