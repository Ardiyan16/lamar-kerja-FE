import clsx from "clsx"
import { StylesConfig } from "react-select"
import { OptionType } from "./option"


export const jsonParse = (data: string) => {
    return data ? JSON.parse(data) : []
}

export const jsonString = (data: any) => {
    return data ? JSON.stringify(data) : ''
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

export const isValidURL = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

export const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
        ...provided,
        minHeight: '45px',
        height: '45px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '45px',
        padding: '0 6px',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '45px',
    }),
};

export const selectCustomClass: any = {
    control: () => "!outline-none !border-gray-300 !shadow-sm dark:!border-gray-700 dark:focus:outline-none dark:bg-gray-800 dark:!text-white",
    menu: () => "dark:!bg-gray-800 dark:!text-gray-200 bg-blue-500",
    option: ({ isFocused }: any) => clsx(isFocused && "!bg-gray-300 dark:!text-white dark:!bg-gray-700 dark:hover:!bg-gray-700"),
    group: () => "bg-orange-800",
    menuList: () => "bg-white dark:!bg-gray-800",
    singleValue: () => "dark:!text-white",
    menuPortal: () => "!bg-emerald-400",
    multiValue: () => "!bg-gray-100 dark:!bg-gray-700 dark:text-white",
    multiValueLabel: () => "!bg-gray-100 dark:!bg-gray-700 dark:text-white",
}

