import clsx from "clsx"

export const jsonParse = (data: string) => {
    return data ? JSON.parse(data) : []
}

export const urlApi = () => {
    return 'http://localhost:8000/api'
}

export const urlImg = () => {
    return 'http://localhost:8000/image'
}

export const customStylesTable = () => ({
    headCells: {
        style: {
            backgroundColor: '#e5e5e5', // gray-800
            color: '#00000',
            fontWeight: 'bold',
            fontSize: '16px',
        },
    },
    rows: {
        style: {
            fontSize: '14px',
        },
    },
})

export const selectCustomClass: any = {
    control: () => "!outline-none !border-gray-300 !shadow-sm dark:!border-gray-700 dark:focus:outline-none dark:bg-gray-800 dark:!text-white",
    menu: () => "dark:!bg-gray-800 dark:!text-gray-200 bg-blue-500",
    option: ({ isFocused }:any) => clsx(isFocused && "!bg-gray-300 dark:!text-white dark:!bg-gray-700 dark:hover:!bg-gray-700"),
    group: () => "bg-orange-800",
    menuList: () => "bg-white dark:!bg-gray-800",
    singleValue: () => "dark:!text-white",
    menuPortal: () => "!bg-emerald-400",
    multiValue: () => "!bg-gray-100 dark:!bg-gray-700 dark:text-white",
    multiValueLabel: () => "!bg-gray-100 dark:!bg-gray-700 dark:text-white",
}

