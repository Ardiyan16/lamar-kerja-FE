
export interface OptionSelect {
    value: string | number | null,
    label: string | number | null
}

export const OptionJmlPegawai = () => {
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

export const OptionStudy = () => {
    const option = [
        { value: "SD",  label: "SD" },
        { value: "SMP",  label: "SMP" },
        { value: "SMA/SMK",  label: "SMA/SMK" },
    ]
}

export const optionReasonReportPostings = () => {
    
}
