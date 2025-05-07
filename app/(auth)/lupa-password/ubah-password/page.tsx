'use client'
import { ButtonAuth } from "@/components/pages/form/button"
import { InputAuth } from "@/components/pages/form/input"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/images/logo.png"
import { ToastContainer } from "react-toastify"
import { useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { useRouter, useSearchParams } from "next/navigation"
import { Notif } from "@/utils/notification"
import axios from "axios"
import { urlApi } from "@/utils/global"


const ResetPasswordPage = () => {
    const router = useRouter()
    const params = useSearchParams()
    const email = params.get('email')
    const token = params.get('token')
    const apiUrl = urlApi()
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [validation, setValidation] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConf, setShowPasswordConf] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        if (!email && !token) {
            return Notif('Email dan token tidak ditemukan', 'error', 2500)
        }

        const formVal = new FormData
        formVal.append('email', email ?? '')
        formVal.append('token', token ?? '')
        formVal.append('password', password)
        formVal.append('password_confirmation', passwordConfirmation)
        await axios.post(apiUrl + '/reset-password', formVal)
            .then((response) => {
                setLoading(false)
                if (response.data.status) {
                    Notif(response.data.message, 'success', 2500)
                    setTimeout(() => {
                        router.push('/masuk')
                    }, 2500)
                } else {
                    if (response.data.type == 'validation_error') {
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
                                Ubah Kata Sandi
                            </h1>
                            <div className="w-full flex-1 mt-8">

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Isi form password untuk ubah kata sandi
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="mt-5 relative w-full">
                                                <InputAuth type={showPassword ? 'text' : 'password'} name="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <div
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                                                </div>
                                            </div>
                                            {validation.password && <small className="text-red-500">{validation.password}</small>}
                                        </div>
                                        <div>
                                            <div className="mt-5 relative">
                                                <InputAuth type={showPasswordConf ? 'text' : 'password'} name="password_confirmation" placeholder="Konfirmasi Kata Sandi" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                                <div
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                                    onClick={() => setShowPasswordConf(!showPasswordConf)}
                                                >
                                                    {showPasswordConf ? <RiEyeLine /> : <RiEyeOffLine />}
                                                </div>
                                            </div>
                                            {validation.password_confirmation && <small className="text-red-500">{validation.password_confirmation}</small>}
                                        </div>

                                        <div>
                                            <ButtonAuth type="submit" loading={loading}> Ubah Password</ButtonAuth>
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

export default ResetPasswordPage
