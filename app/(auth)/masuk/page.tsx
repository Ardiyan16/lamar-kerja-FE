'use client'

import logo from "@/assets/images/logo.png"
import Image from "next/image"
import Link from "next/link"
import { InputAuth } from "@/components/pages/form/input"
import { useState } from "react"
import { ButtonAuth } from "@/components/pages/form/button"
import { useRouter } from "next/navigation"
import { urlApi } from "@/utils/global"
import axios from "axios"
import { IsLoggedIn } from "@/hooks/is-login"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { Notif } from "@/utils/notification"


const LoginPage = () => {
    IsLoggedIn()
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [validation, setValidation] = useState<any>([])
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const apiUrl = urlApi()

    const loginGoogle = async () => {

        await axios.get(apiUrl + "/login-google").then((response) => {
            
        })

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        if (email == '' || password == '') {
            setLoading(false)
            return Notif('Email dan Password wajib diisi', 'info', 3000)
        }

        await axios.post(apiUrl + "/login", {
            email: email,
            password: password,
            type: 2
        }).then((response) => {
            setLoading(false)
            if (response.data.status) {
                let data = response.data.data
                localStorage.setItem('a', data.token)
                localStorage.setItem('b', data.user_id)
                localStorage.setItem('c', data.code)
                localStorage.setItem('d', data.exp_token)
                localStorage.setItem('e', data.type)
                Notif(response.data.message, 'success', 2500)
                setTimeout(() => {
                    if (data.type === 2) {
                        router.push('/')
                    } else if (data.type === 1) {
                        router.push('/admin')
                    }
                }, 3000)
            } else {
                if (response.data.type == 'validation_error') {
                    return setValidation(response.data.message)
                }
                return Notif(response.data.message, 'error', 3500)
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
                                Masuk
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button onClick={loginGoogle} type="button"
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-zinc-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline cursor-pointer">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path
                                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                    fill="#4285f4" />
                                                <path
                                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                    fill="#34a853" />
                                                <path
                                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                    fill="#fbbc04" />
                                                <path
                                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                    fill="#ea4335" />
                                            </svg>
                                        </div>
                                        <span className="ml-4">
                                            Masuk Dengan Google
                                        </span>
                                    </button>
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Masuk menggunakan email
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <InputAuth type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {validation.email && <small className="text-red-500">{validation.email}</small>}
                                        </div>
                                        <div className="mt-5">
                                            <div className="relative">
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

                                        <div className="text-right mt-3">
                                            <Link href="/lupa-password" className="text-primary text-sm hover:underline">Lupa Password</Link>
                                        </div>

                                        <div>
                                            <ButtonAuth type="submit" loading={loading}> Masuk</ButtonAuth>
                                        </div>


                                        <p className="mt-6 text-xs text-gray-600 text-center">
                                            Anda belum memiliki akun ? &nbsp;
                                            <Link href="/daftar" className="border-b border-gray-500 border-dotted text-primary">
                                                Daftar disini
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white-100 text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('https://img.freepik.com/free-vector/job-hunt-concept-illustration_114360-436.jpg')` }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginPage
