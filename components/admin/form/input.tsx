import { FC } from "react"

interface inputProps {
    label: string
    name: string,
    type: "text" | "number" | "email" | "hidden" | "date" | "time",
    value: string | number,
    mandatory: boolean,
    placeholder: string,
    disabled: boolean,
    onChange: (e: any) => void
}

interface validationProps {
    text: string
}

export const Input: FC<inputProps> = ({
    label,
    name,
    type = "text",
    value,
    mandatory = false,
    placeholder,
    disabled = false,
    onChange
}) => {
    return (
        <div className="max-w-full mt-5">
            <div className="flex flex-wrap justify-between items-center">
                <label htmlFor={name} className="block text-sm font-medium mb-2">{label} {mandatory && (<span className="text-red-600">*</span>)}</label>
            </div>
            <input type={type} id={name} value={value} name={name} onChange={onChange} className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none" placeholder={placeholder} disabled={disabled} />
        </div>
    )
}

export const ValidationText: FC<validationProps> = ({text}) => {

    return (
        <small className="text-red-500">{text}</small>
    )

}
