'use client'
import Image from "next/image"
import logo from "@/assets/images/logo.png"
import { InputAuth } from "@/components/pages/form/input"
import Link from "next/link"
import { ButtonAuth } from "@/components/pages/form/button"
import { useState } from "react"
import { IsLoggedIn } from "@/hooks/is-login"
import { useRouter } from "next/navigation"
import { ToastContainer } from "react-toastify"
import { Notif } from "@/utils/notification"
import axios from "axios"
import { urlApi } from "@/utils/global"

const ForgotPasswordPage = () => {
    IsLoggedIn()
    const router = useRouter();
    const apiUrl = urlApi()
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [validation, setValidation] = useState<any>([])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        if(email == '') {
            setLoading(false)
            return Notif('Email harus diisi', 'info', 2000)
        }
        await axios.post(apiUrl + '/forgot-password', {
            email: email
        }).then((response) => {
            setLoading(false)
            if(response.data.status) {
                Notif(response.data.message, 'success', 2500)
                setTimeout(() => {
                    router.push('/lupa-password/berhasil-konfirmasi')
                }, 2500)
            } else {
                if(response.data.type == 'validation_error') {
                    return setValidation(response.data.message)
                }
                return Notif(response.data.message, 'error', 3000)
            }
        })
    }

    return (
        <div className="font-primary">
            <div className="min-h-screen bg-secondary text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <Image alt="logo" src={logo} width={175} height={40} className='drop-shadow-[0_0px_1px_rgba(255,255,255,.5)] object-scale-down min-w-12 min-h-12 rounded mx-auto' />
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl text-primary font-extrabold">
                                Lupa Kata Sandi
                            </h1>
                            <div className="w-full flex-1 mt-8">

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Isi email untuk konfirmasi ubah kata sandi
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <InputAuth type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {validation.email && <small className="text-red-500">{validation.email}</small>}
                                        </div>

                                        <div>
                                            <ButtonAuth type="submit" loading={loading}> Konfirmasi</ButtonAuth>
                                        </div>
                                    </form>


                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Anda ingin masuk ? &nbsp;
                                        <Link href="/masuk" className="border-b border-gray-500 border-dotted text-primary">
                                            Masuk disini
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white-100 text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg')` }}>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

export default ForgotPasswordPage