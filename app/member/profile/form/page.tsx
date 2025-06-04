'use client'

import Button, { ButtonSubmit } from "@/components/admin/form/button"
import { Input, ValidationText } from "@/components/admin/form/input"
import { SelectSingle } from "@/components/member/form/select-option"
import { StepperFormProfile } from "@/components/member/form/stepper"
import Breadcrumbs from "@/components/pages/navigation/breadcrumbs/breadcrumbs"
import { CompanyProfileType } from "@/interface/company"
import { typeIndustry } from "@/interface/default"
import callApi from "@/utils/callapi"
import { urlApi } from "@/utils/global"
import { OptionTotalEmployee, OptionType } from "@/utils/option"
import axios from "axios"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { RiArrowLeftCircleLine, RiCheckLine, RiPencilLine, RiResetLeftLine, RiSaveLine } from "react-icons/ri"
import { useLocalStorage } from "usehooks-ts"
import '@/style/quill.css'
import 'react-quill-new/dist/quill.snow.css';
import { Notif } from "@/utils/notification"
import { useRouter } from "next/navigation"
import TextEditor from "@/components/admin/form/text-area"


const ReactQuill = dynamic(
    () => {
        return import('react-quill-new');
    },
    { ssr: false }
);

interface formStep1 {
    name: string,
    address: string,
    telp_number: string,
}

const FormProfile = () => {

    const breadcrumbs = [
        {
            label: "member",
            value: "member"
        },
        {
            label: "profile",
            value: "profile"
        },
        {
            label: "form profile",
            value: "form profile"
        },
    ]

    const router = useRouter()
    const [isMount, setIsMount] = useState(false)
    const [data, setData] = useState<CompanyProfileType>()
    const [status, setStatus] = useState<number>(0)
    const [validation, setValidation] = useState<any>([])
    const [form, setForm, removeForm] = useLocalStorage<formStep1>('formstep1profile', {
        name: '',
        address: '',
        telp_number: '',
    })
    const [province, setProvince, removeProvince] = useLocalStorage<OptionType>('profile_province', {
        label: '', value: ''
    })
    const [regency, setRegency, removeRegency] = useLocalStorage<OptionType>('profile_regency', {
        label: '', value: ''
    })
    const [district, setDistrict, removeDistrict] = useLocalStorage<OptionType>('profile_district', {
        label: '', value: ''
    })
    const [typeIndustry, setTypeIndustry, removeTypeIndustry] = useLocalStorage<OptionType>('profile_typeindustri', {
        label: '', value: ''
    })
    const [totalEmployee, setTotalEmployee, removeTotalEmployee] = useLocalStorage<OptionType>('total_employee', {
        label: '', value: ''
    })
    const [about, setAbout, removeAbout] = useLocalStorage<string>('about_company', '')
    const [optionProvince, setOptionProvince] = useState<OptionType[]>([])
    const [optionRegency, setOptionRegency] = useState<OptionType[]>([])
    const [optionDistrict, setOptionDistrict] = useState<OptionType[]>([])
    const [optionTypeIndustri, setOptionTypeIndustri] = useState<OptionType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const optionEmployee = OptionTotalEmployee()
    const apiUrl = urlApi()

    const fetchData = async () => {
        try {

            const response = await callApi.get('/company/profile')
            const data_res = response.data.data
            const dataForm: formStep1 = {
                name: data_res?.name || '',
                address: data_res?.address || '',
                telp_number: data_res?.telp_number || '',
            }
            setProvince({
                label: data_res?.name_province, value: data_res?.province
            })
            setRegency({
                label: data_res?.name_regency, value: data_res?.regency
            })
            setDistrict({
                label: data_res?.name_district, value: data_res?.district
            })
            setTypeIndustry({
                label: data_res?.name_industry, value: data_res?.type_industry
            })
            setTotalEmployee({
                label: data_res?.total_employee, value: data_res?.total_employee
            })
            setStatus(data_res?.status_profile)
            setForm(dataForm)
            setData(data_res)
            setAbout(data_res?.about_us)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
        setIsMount(true)
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        });
    }

    const changeProvince = (selected: OptionType) => {
        setProvince(selected)
        setRegency({
            label: '', value: ''
        })
        setDistrict({
            label: '', value: ''
        })
        fetchRegency(selected.value)
    }

    const changeRegency = (selected: OptionType) => {
        setRegency(selected)
        setDistrict({
            label: '', value: ''
        })
        fetchDistrict(selected.value)
    }

    const changeDistrict = (selected: OptionType) => {
        setDistrict(selected)
    }

    const changeTypeIndustry = (selected: OptionType) => {
        setTypeIndustry(selected)
    }

    const changeTotalEmployee = (selected: OptionType) => {
        setTotalEmployee(selected)
    }

    const fetchProvince = async () => {
        try {
            const response = await axios.get(apiUrl + "/select/province")
            const data = response.data.data
            const initialProv: OptionType[] = []
            data.map((item: any, i: number) => {
                const temp: OptionType = {
                    label: item.name,
                    value: item.id
                }

                initialProv.push(temp)
            })
            setOptionProvince(initialProv)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchRegency = async (id: number | string) => {
        try {
            const response = await axios.get(apiUrl + "/select/regency/" + id)
            const data = response.data.data
            const initialReg: OptionType[] = []
            data.map((item: any, i: number) => {
                const temp: OptionType = {
                    label: item.name,
                    value: item.id
                }

                initialReg.push(temp)
            })
            setOptionRegency(initialReg)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDistrict = async (id: number | string) => {
        try {
            const response = await axios.get(apiUrl + "/select/district/" + id)
            const data = response.data.data
            const initialDist: OptionType[] = []
            data.map((item: any, i: number) => {
                const temp: OptionType = {
                    label: item.name,
                    value: item.id
                }

                initialDist.push(temp)
            })
            setOptionDistrict(initialDist)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchTypeIndustry = async () => {
        try {
            const response = await callApi.get('/company/type-industry')
            const data = response.data.data
            const initialType: OptionType[] = []
            data?.map((item: typeIndustry, i: number) => {
                const temp: OptionType = {
                    label: item.name_industry,
                    value: item.id
                }

                initialType.push(temp)
            })
            setOptionTypeIndustri(initialType)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProvince()
        fetchTypeIndustry()
    }, [])

    const resetForm = () => {
        removeAbout()
        removeAbout()
        removeDistrict()
        removeProvince()
        removeRegency()
        removeTotalEmployee()
        removeTypeIndustry()
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const formVal = new FormData
        formVal.append('name', form.name)
        formVal.append('address', form.address)
        formVal.append('province', province.value.toString())
        formVal.append('regency', regency.value.toString())
        formVal.append('district', district.value.toString())
        formVal.append('telp_number', form.telp_number)
        formVal.append('type_industry', typeIndustry.value.toString())
        formVal.append('total_employee', totalEmployee.value.toString())
        formVal.append('about_us', about)
        formVal.append('step', '1')
        await callApi.post('/company/profile/update', formVal)
            .then((response) => {
                setLoading(false)
                if (response.data.status) {
                    resetForm()
                    router.push('/member/profile/form/detail')
                } else {
                    if (response.data.type == "validation_error") {
                        return setValidation(response.data.message)
                    }
                    return Notif(response.data.message, 'error', 2000)
                }
            }).catch((error) => {
                console.error(error)
            })
    }

    if (!isMount) {
        return null;
    }

    return (
        <div className="p-4 md:p-10">
            <div className="flex flex-wrap gap-x-4 gap-y-2 w-full items-center justify-between">
                <div className="text-xl md:text-2xl font-bold">Form Profile</div>
                <div className="flex items-center">
                    <Breadcrumbs data={breadcrumbs} />
                </div>
            </div>
            <div className="flex justify-end mt-5 gap-3">
                <Button href="/member/profile" variant="primary" icon={<RiArrowLeftCircleLine className="w-5 h-5" />}>Kembali</Button>
                <Button type="button" onClick={resetForm} variant="warning" icon={<RiResetLeftLine className="w-5 h-5" />}>Reset Form</Button>
            </div>
            <div className="mt-5 mb-5 p-5 bg-white rounded-md shadow-manage">
                <div className="text-xl font-semibold flex"><RiPencilLine className="mr-2" /> Form Perumahan</div>
                <p className="mt-2">form dengan tanda(<span className="text-red-500">*</span>) wajib diisi</p>
                <div className="mt-10 w-full">
                    <StepperFormProfile
                        step1={status === 1 ? 'bg-primary' : 'bg-gray-200'}
                        step2={status === 1 ? 'bg-primary' : 'bg-gray-200'}
                        textcolor1={status === 1 ? 'text-white' : 'text-gray-800'}
                        textcolor2={status === 1 ? 'text-white' : 'text-gray-800'}
                        keterangan1={status === 1 ? <RiCheckLine className="h-5 w-5" /> : 1}
                        keterangan2={status === 1 ? <RiCheckLine className="h-5 w-5" /> : 2}
                    />
                </div>
                <div className="mt-16 text-xl">Form Informasi</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input label="Nama Perusahaan" type="text" name="name" value={form.name} mandatory={true} onChange={(e: any) => handleChange(e)} placeholder="" disabled={false} />
                        {validation.name && <ValidationText text={validation.name} />}
                    </div>
                    <div>
                        <Input label="Alamat" type="text" name="address" value={form.address} mandatory={true} onChange={(e: any) => handleChange(e)} placeholder="" disabled={false} />
                        {validation.address && <ValidationText text={validation.address} />}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        <div>
                            <SelectSingle label="Provinsi" mandatory={true} option={optionProvince} onChange={changeProvince} value={province} placholder="pilih provinsi" />
                            {validation.province && <ValidationText text={validation.province} />}
                        </div>
                        {province?.value &&
                            <div>
                                <SelectSingle label="Kabupaten / Kota" mandatory={true} option={optionRegency} onChange={changeRegency} value={regency} placholder="pilih kabupaten/kota" />
                                {validation.regency && <ValidationText text={validation.regency} />}
                            </div>
                        }
                        {regency?.value &&
                            <div>
                                <SelectSingle label="Kecamatan" mandatory={true} option={optionDistrict} onChange={changeDistrict} value={district} placholder="pilih kecamatan" />
                                {validation.district && <ValidationText text={validation.district} />}
                            </div>
                        }
                    </div>
                    <div>
                        <Input label="No Telepon" type="number" name="telp_number" value={form.telp_number} mandatory={true} onChange={(e: any) => handleChange(e)} placeholder="" disabled={false} />
                        {validation.telp_number && <ValidationText text={validation.telp_number} />}
                    </div>
                    <div className="mt-5">
                        <SelectSingle label="Tipe Industri" mandatory={true} option={optionTypeIndustri} onChange={changeTypeIndustry} value={typeIndustry} placholder="pilih tipe industri" />
                        {validation.type_industry && <ValidationText text={validation.type_industry} />}
                    </div>
                    <div className="mt-5">
                        <SelectSingle label="Jumlah Pegawai" mandatory={true} option={optionEmployee} onChange={changeTotalEmployee} value={totalEmployee} placholder="pilih jumlah pegawai" />
                        {validation.total_employee && <ValidationText text={validation.total_employee} />}
                    </div>
                    <div>
                        <TextEditor label="Tentang Perusahaan" mandatory={false} onChange={setAbout} value={about} />
                    </div>
                    <hr className="mt-3 text-gray-300" />
                    <div className="mt-5">
                        <ButtonSubmit icon={<RiSaveLine className="mr-1" />} loading={loading} type="submit">Simpan & Selanjutnya</ButtonSubmit>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default FormProfile
