import { FC } from "react"

interface inputAuth {
    type: string,
    name: string,
    placeholder: string,
    value: string | number,
    onChange: (e: any) => void
}

export const InputAuth: FC<inputAuth> = ({
    type, name, placeholder, value, onChange
}) => {
    return (
        <input
            className="w-full px-8 py-4 font-primary rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    )
}
