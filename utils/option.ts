
export interface OptionType {
    value: string | number,
    label: string
}

export interface OptionNumberType {
    value: number | string,
    label: string
}

export const OptionTotalEmployee = () => {
    const option = [
        { value: "1 - 10 karyawan",  label: "1 - 10 karyawan" },
        { value: "11 - 50 karyawan",  label: "11 - 50 karyawan" },
        { value: "51 - 200 karyawan",  label: "51 - 200 karyawan" },
        { value: "201 - 1000 karyawan",  label: "201 - 1000 karyawan" },
        { value: "1001 - 5000 karyawan",  label: "1001 - 5000 karyawan" },
        { value: "5001 - 10000 karyawan",  label: "5001 - 10000 karyawan" },
        { value: "lebih dari 10000 karyawan",  label: "lebih dari 10000 karyawan" },
    ]

    return option
}

export const OptionGender = () => {
    const option = [
        { value: "Laki-laki",  label: "Laki-laki" },
        { value: "Perempuan",  label: "Perempuan" },
    ]

    return option
}

export const OptionLink = () => {
    const option = [
        { value: "Website",  label: "website" },
        { value: "Maps",  label: "maps" },
    ]
    return option
}

export const OptionSosmed = () => {
    const option = [
        { value: "instagram",  label: "instagram" },
        { value: "tiktok",  label: "tiktok" },
        { value: "x",  label: "x" },
        { value: "facebook",  label: "facebook" },
        { value: "youtube",  label: "youtube" },
        { value: "linkedin",  label: "linkedin" },
        { value: "telegram",  label: "telegram" },
    ]
    return option
}

export const OptionStudy = () => {
    const option = [
        { value: "SD",  label: "SD" },
        { value: "SMP",  label: "SMP" },
        { value: "SMA/SMK",  label: "SMA/SMK" },
        { value: "D1", label: "D1" },
        { value: "D2", label: "D2" },
        { value: "D3", label: "D4" },
        { value: "S1/D4", label: "S1/D4" },
        { value: "S2", label: "S2" },
        { value: "S3", label: "S3" },
    ]

    return option
}

export const optionReasonReportPostings = () => {
    
}
