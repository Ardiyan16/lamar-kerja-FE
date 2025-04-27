'use client'

import Image from "next/image"
import logo from "@/assets/images/logo.png"
import { InputAuth } from "@/components/pages/form/input"
import Link from "next/link"
import { ButtonAuth } from "@/components/pages/form/button"
import { useState } from "react"
import { IsLoggedIn } from "@/hooks/is-login"

const ForgotPasswordPage = () => {
    IsLoggedIn()
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


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
                            Lupa Password
                        </h1>
                        <div className="w-full flex-1 mt-8">

                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Isi email untuk konfirmasi ubah password
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">

                                <div>
                                    <InputAuth type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                                </div>

                                <div>
                                    <ButtonAuth type="submit" loading={loading}> Konfirmasi</ButtonAuth>
                                </div>

                                
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
    </div>
    )

}

export default ForgotPasswordPage