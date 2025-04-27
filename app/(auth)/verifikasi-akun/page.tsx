'use client'

import { Spinner } from "@/components/pages/form/button"
import { urlApi } from "@/utils/global"
import { Notification } from "@/utils/notification"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { RiCheckboxCircleLine } from "react-icons/ri"
import { ToastContainer } from "react-toastify"

const VerificationPage = () => {

    const router = useRouter()
    const params = useSearchParams()
    const email = params.get('email')
    const token = params.get('token')
    const apiUrl = urlApi()
    const [loading, setLoading] = useState<boolean>(false)

    const verification = async () => {
        if(!email && !token) {
            return Notification('Email dan token tidak ditemukan', 'error', 2500)
        }

        setLoading(true)

        await axios.post(apiUrl + "/verification-account", {
            email: email,
            token: token
        }).then((response) => {
            setLoading(false)
            if(response.data.status) {
                Notification(response.data.message, 'success', 2500)
                return setTimeout(() => {
                    router.push('/masuk')
                }, 2500)
            } else {
                Notification(response.data.message, 'error', 2500)
            }
        })
    }

    return (
        <div className="py-10 px-40">
            <div className="mt-[150px] p-5 bg-white rounded-md shadow-manage text-center">
                <div className="text-2xl">Hai, {email} Silahkan verifikasi akun anda dengan klik tombol verifikasi dibawah ini !</div>
                <div className="mt-10">
                    <button
                        className="bg-primary pr-5 pl-4 py-2 border border-admPrimary !text-white backdrop-blur-sm rounded-md lg:text-lg justify-center gap-2 items-center inline-flex disabled:bg-primary2" onClick={verification} disabled={loading}
                    >{!loading ? <RiCheckboxCircleLine />: ''}{loading ? <Spinner /> : 'Verifikasi Akun'}</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

export default VerificationPage
