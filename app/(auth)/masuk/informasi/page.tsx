'use client'

import Link from "next/link"
import { RiArrowRightUpLine } from "react-icons/ri"

const InformationLoginPage = () => {

    return (
        <div className="py-10 px-40">
        <div className="mt-[150px] p-5 bg-white rounded-md shadow-manage text-center">
            <div className="text-2xl">Anda sudah masuk! lanjutkan menjelajari informasi lowongan kerja</div>
            <div className="mt-10">
                <Link
                    href="/"
                    className="!bg-primary pr-5 pl-4 py-2 border border-admPrimary !text-white backdrop-blur-sm rounded-md lg:text-lg justify-center gap-2 items-center inline-flex"
                ><RiArrowRightUpLine className="animate-bounce" /> Jelajahi</Link>
            </div>
        </div>
    </div>
    )

}

export default InformationLoginPage
