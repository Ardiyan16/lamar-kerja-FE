'use client'

import Link from "next/link"
import { RiLoginCircleLine } from "react-icons/ri"

const SuccessRegisterPage = () => {

    return (
        <div className="py-10 px-40">
        <div className="mt-[150px] p-5 bg-white rounded-md shadow-manage text-center">
            <div className="text-2xl">Anda berhasil verifikasi silahkan cek email anda untuk link verifikasi akun! <span className="text-red-800">(catatan: Jika pesan tidak mucul di kotak masuk silahkan cek pesan di spam)</span></div>
            <div className="mt-10">
                <Link
                    href="/masuk"
                    className="!bg-primary pr-5 pl-4 py-2 border border-admPrimary !text-white backdrop-blur-sm rounded-md lg:text-lg justify-center gap-2 items-center inline-flex"
                ><RiLoginCircleLine /> Masuk</Link>
            </div>
        </div>
    </div>
    )

}

export default SuccessRegisterPage
