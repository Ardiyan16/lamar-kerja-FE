'use client'

import Link from "next/link"
import { RiArrowLeftCircleLine } from "react-icons/ri"

const SuccessConfirmPasswordPage = () => {

    return (
        <div className="py-10 px-40">
            <div className="mt-[150px] p-5 bg-white rounded-md shadow-manage text-center">
                <div className="text-2xl">Anda berhasil mengirim konfirmasi lupa password, silahkan cek email untuk konfirmasi mengubah password! <br /><span className="text-red-800 text-base">(catatan: Jika pesan tidak mucul di kotak masuk silahkan cek pesan di spam)</span></div>
                <div className="mt-10">
                    <Link
                        href="/lupa-password"
                        className="!bg-primary pr-5 pl-4 py-2 border border-admPrimary !text-white backdrop-blur-sm rounded-md lg:text-lg justify-center gap-2 items-center inline-flex"
                    ><RiArrowLeftCircleLine /> Kembali</Link>
                </div>
            </div>
        </div>
    )

}

export default SuccessConfirmPasswordPage
