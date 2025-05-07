'use client'
import { UseLoggedInMember } from "@/hooks/is-login"

export const CheckAuthMember = () => {
    UseLoggedInMember()
    return (
        <div></div>
    )
}
