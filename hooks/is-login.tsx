'use client'

import callApi from "@/utils/callapi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const IsLoggedIn = () => {
    const router = useRouter()

    useEffect(() => {
        const a = localStorage.getItem('a')
        const b = localStorage.getItem('b')
        const c = localStorage.getItem('c')
        const d = localStorage.getItem('d')
        const e = localStorage.getItem('e')

        if(a && b && c && d && e) {
            if(e === '2') {
                return router.push('/masuk/informasi')
            } else if (e === '3') {
                return router.push('/member')
            } else {
                return router.push('/admin')
            }
        }

    }, [])
    
}

export const UseLoggedInMember = () => {
    const router = useRouter()

    useEffect(() => {

        const a = localStorage.getItem('a')
        const b = localStorage.getItem('b')
        const c = localStorage.getItem('c')
        const d = localStorage.getItem('d')
        const e = localStorage.getItem('e')
        if(!a && !b && !c && !d && !e) {
            return router.push('/masuk-perusahaan')
        }

        const fetchData = async () => {
            try {
                const response = await callApi.get('/admin/check-auth')
                
                if(response.data.status == false) {
                    localStorage.removeItem('a')
                    localStorage.removeItem('b')
                    localStorage.removeItem('c')
                    localStorage.removeItem('d')
                    localStorage.removeItem('e')
                    return router.push('/masuk-perusahaan')
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])
}

