import Link from "next/link"
import { FC, ReactNode } from "react"

interface stepperProfile {
    step1: string,
    step2: string,
    textcolor1: string,
    textcolor2: string
    keterangan1: number | ReactNode,
    keterangan2: number | ReactNode,
}

export const StepperFormProfile: FC<stepperProfile> = ({
    step1, step2, textcolor1, textcolor2, keterangan1, keterangan2
}) => {

    return (
        <ul className="relative flex flex-row gap-x-2 mx-auto">
        <li className="shrink basis-0 flex-1 group">
            <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                {step1 === 'bg-primary' &&
                    <Link href={`/member/profile/form`} >
                        <span className={`size-10 flex justify-center items-center shrink-0 ${step1} font-medium ${textcolor1} rounded-full`}>
                            {keterangan1}
                        </span>
                    </Link>
                }
                {step1 === 'bg-gray-200' &&
                    <span className={`size-10 flex justify-center items-center shrink-0 ${step1} font-medium ${textcolor1} rounded-full`}>
                        {keterangan1}
                    </span>
                }
                <div className={`ms-2 w-full h-px flex-1 ${step1} group-last:hidden`}></div>
            </div>
            <div className="mt-3">
                <span className={`block text-sm font-medium text-gray-800`}>
                    Informasi
                </span>
            </div>
        </li>
        <li className="shrink basis-0 flex-1 group">
            <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                {step2 === 'bg-primary' &&
                    <Link href={`/member/profile/form/detail`}>
                        <span className={`size-10 flex justify-center items-center shrink-0 ${step2} font-medium ${textcolor2} rounded-full`}>
                            {keterangan2}
                        </span>
                    </Link>
                }
                {step2 === 'bg-gray-200' &&
                    <span className={`size-10 flex justify-center items-center shrink-0 ${step2} font-medium ${textcolor2} rounded-full`}>
                        {keterangan2}
                    </span>
                }
                <div className={`ms-2 w-full h-px flex-1 ${step2} group-last:hidden`}></div>
            </div>
            <div className="mt-3">
                <span className={`block text-sm font-medium text-gray-800`}>
                    Kelengkapan
                </span>
            </div>
        </li>
    </ul>
    )

}

