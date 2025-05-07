'use client'

import Image from "next/image"
import { FC, useState } from "react"
import logo from "@/public/images/logo.png"
import { InputAuth } from "@/components/pages/form/input"
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { ButtonAuth } from "@/components/pages/form/button"
import axios from "axios"
import { urlApi } from "@/utils/global"
import { useRouter } from "next/navigation"
import { ToastContainer } from "react-toastify"
import { Notif } from "@/utils/notification"
import { IsLoggedIn } from "@/hooks/is-login"
import Link from "next/link"


interface isPage {
    onClick: () => void
}

interface isPageLogin {
    onClick: () => void,
    onClickPass: () => void
}

interface formRegister {
    name: string,
    telp_number: number | string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}

const LoginRegisterCompanyPage = () => {
    IsLoggedIn()
    const [selectPage, setSelectPage] = useState<string>('login')

    return (
        <div>
            {selectPage == 'login' ? (<IsLoginPage onClick={() => setSelectPage('register')} onClickPass={() => setSelectPage('forgot')} />) : selectPage == 'register' ? (<IsRegisterPage onClick={() => setSelectPage('login')} />) : (<IsForgotPage onClick={() => setSelectPage('login')} />)}
            <ToastContainer />
        </div>
    )

}

const IsLoginPage: FC<isPageLogin> = ({ onClick, onClickPass }) => {
    const apiUrl = urlApi()
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [validation, setValidation] = useState<any>([])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        if (email == '' || password == '') {
            setLoading(false)
            return Notif('Email dan Password wajib diisi', 'info', 3000)
        }

        let type = 3
        if(email == "admin@gmail.com") {
            type = 1
        }

        await axios.post(apiUrl + "/login", {
            email: email,
            password: password,
            type: type
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
                    if (data.type === 3) {
                        router.push('/member')
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
        <div>
            <section className="bg-zinc-200">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <Image className="w-60 mr-2" src={logo} height={40} width={175} alt="logo" />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-white">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Masuk ke akun anda
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-5">
                                <div>
                                    <InputAuth name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {validation.email && <small className="text-red-500">{validation.email}</small>}
                                </div>
                                <div>
                                    <div className="mt-5 relative">
                                        <InputAuth name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                                        </div>
                                    </div>
                                    {validation.password && <small className="text-red-500">{validation.password}</small>}
                                </div>
                                <div className="flex items-center justify-end">
                                    <button type="button" onClick={onClickPass} className="text-sm font-medium text-primary hover:text-primary1 hover:underline">Forgot password?</button>
                                </div>
                                <ButtonAuth type="submit" loading={loading}>Masuk</ButtonAuth>
                                <p className="text-sm font-light text-gray-700">
                                    Apakah belum memiliki akun? <button onClick={onClick} className="font-medium text-primary hover:underline hover:text-primary1">Daftar Disini</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



const IsRegisterPage: FC<isPage> = ({ onClick }) => {
    const apiUrl = urlApi()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConf, setShowPasswordConf] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [form, setForm] = useState<formRegister>({
        name: '',
        username: '',
        telp_number: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [validation, setValidation] = useState<any>([])

    const onChange = (e: any) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const formVal = new FormData
        formVal.append('name', form.name)
        formVal.append('username', form.username)
        formVal.append('telp_number', form.telp_number.toString())
        formVal.append('email', form.email)
        formVal.append('password', form.password)
        formVal.append('password_confirmation', form.password_confirmation)
        await axios.post(apiUrl + '/register-company', formVal).then((response) => {
            setLoading(false)
            if(response.data.status) {
                Notif(response.data.message, 'success', 2500)
                setTimeout(() => {
                    router.push('/berhasil-daftar?type=perusahaan')
                }, 2500)
            } else {
                if(response.data.type === "validation_error") {
                    return setValidation(response.data.message)
                }

                return Notif(response.data.message, 'error', 2500)
            }
        })
    }

    return (
        <div>
            <section className="bg-zinc-200">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <Image className="w-60 mr-2" src={logo} height={40} width={175} alt="logo" />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-white">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Daftar akun
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-5">
                                <div>
                                    <InputAuth name="name" type="text" placeholder="Nama Perusahaan" value={form.name} onChange={(e) => onChange(e)} />
                                    {validation.name && <small className="text-red-500">{validation.name}</small>}
                                </div>
                                <div>
                                    <InputAuth name="username" type="text" placeholder="Nama User (Penanggung Jawab)" value={form.username} onChange={(e) => onChange(e)} />
                                    {validation.username && <small className="text-red-500">{validation.username}</small>}
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <span className="px-8 py-4 border border-r-0 border-gray-200 bg-gray-100 rounded-l-md text-gray-700 text-sm">
                                            +62
                                        </span>
                                        <InputAuth name="telp_number" type="number" placeholder="No Telepon/Hp/Whatsapp" value={form.telp_number} onChange={(e) => onChange(e)} />
                                    </div>
                                    {validation.telp_number && <small className="text-red-500">{validation.telp_number}</small>}
                                </div>
                                <div>
                                    <InputAuth name="email" type="email" placeholder="Email" value={form.email} onChange={(e) => onChange(e)} />
                                    {validation.email && <small className="text-red-500">{validation.email}</small>}
                                </div>
                                <div>
                                    <div className="mt-5 relative">
                                        <InputAuth name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => onChange(e)} />
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
                                        <InputAuth name="password_confirmation" type={showPasswordConf ? 'text' : 'password'} placeholder="Konfirmasi Password" value={form.password_confirmation} onChange={(e) => onChange(e)} />
                                        <div
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                            onClick={() => setShowPasswordConf(!showPasswordConf)}
                                        >
                                            {showPasswordConf ? <RiEyeLine /> : <RiEyeOffLine />}
                                        </div>
                                    </div>
                                    {validation.password_confirmation && <small className="text-red-500">{validation.password_confirmation}</small>}
                                </div>
                                <ButtonAuth type="submit" loading={loading}>Daftar</ButtonAuth>
                                <p className="text-sm font-light text-gray-700">
                                    Apakah sudah memiliki akun? <button onClick={onClick} className="font-medium text-primary hover:underline hover:text-primary1">Masuk Disini</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}

const IsForgotPage: FC<isPage> = ({ onClick }) => {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div>
            <section className="bg-zinc-200">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <Image className="w-60 mr-2" src={logo} height={40} width={175} alt="logo" />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-white">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Lupa Password
                            </h1>
                            <form className="space-y-4 md:space-y-6 mt-5" action="#">
                                <div>
                                    <InputAuth name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <ButtonAuth type="submit" loading={loading}>Konfirmasi</ButtonAuth>
                                <p className="text-sm font-light text-gray-700">
                                    Kembali ke halaman login ? <button onClick={onClick} className="font-medium text-primary hover:underline hover:text-primary1">Masuk Disini</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}

export default LoginRegisterCompanyPage
