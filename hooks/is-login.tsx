'use client'

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
            return router.push('/masuk/informasi');
        }
    }, [])
    
}

