'use client'
import Button, { ButtonSubmit } from "@/components/admin/form/button"
import { Input, ValidationText } from "@/components/admin/form/input"
import { SelectSingle } from "@/components/member/form/select-option"
import { StepperFormProfile } from "@/components/member/form/stepper"
import Breadcrumbs from "@/components/pages/navigation/breadcrumbs/breadcrumbs"
import { OptionSosmed, OptionType } from "@/utils/option"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { RiAddCircleLine, RiArrowLeftCircleLine, RiCheckLine, RiDeleteBin6Line, RiPencilLine, RiResetLeftLine, RiSaveLine } from "react-icons/ri"
import { useLocalStorage } from "usehooks-ts"
import '@/style/quill.css'
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic"
import TextEditor from "@/components/admin/form/text-area"
import { Notif } from "@/utils/notification"
import { jsonParse, jsonString } from "@/utils/global"
import callApi from "@/utils/callapi"
import { InputFileGallery } from "@/components/admin/form/input-file"
// import { CompanyProfileType } from "@/interface/company"
// import { InputFileGallery } from "@/components/admin/form/input-file"

const ReactQuill = dynamic(
    () => {
        return import('react-quill-new');
    },
    { ssr: false }
);

interface formDetail {
    motto: string,
    link_web: string,
    link_maps: string
}

interface formSosmed {
    platform: OptionType,
    link: string
}

const FormProfile2 = () => {

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
    const [status, setStatus] = useState<number>(0)
    // const [data, setData] = useState<CompanyProfileType>()
    const [loading, setLoading] = useState<boolean>(false)
    const [isMount, setIsMount] = useState<boolean>(false)
    const [validation, setValidation] = useState<any>([])
    const [form, setForm, removeForm] = useLocalStorage<formDetail>('form_detail', {
        motto: '',
        link_maps: '',
        link_web: ''
    })
    const [sosmed, setSosmed, removeSosmed] = useLocalStorage<formSosmed[]>('sosmed_company', [{
        platform: { label: '', value: '' }, link: ''
    }])
    const [corporateCulture, setCorporateCulture, removeCorporateCulture] = useLocalStorage<string>('corporate_culture', '')

    const optionSosmed = OptionSosmed()

    const fetchData = async () => {
        try {
            const response = await callApi.get('/company/profile')
            const data_res = response.data.data
            const link = data_res?.link ? jsonParse(data_res.link) : false
            const listSosmed = data_res?.social_media ? jsonParse(data_res.social_media) : false
            setForm({
                link_web: link.link_web || '',
                link_maps: link.link_maps || '',
                motto: data_res?.motto || ''
            })
            const initialSosmed: formSosmed[] = []
            listSosmed.map((item: any) => {
                const temp: formSosmed = {
                    platform: {
                        label: item.platform,
                        value: item.platform
                    },
                    link: item.link
                }

                initialSosmed.push(temp)
            })
            setSosmed(initialSosmed)
            setStatus(data_res?.status_profile)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        fetchData()
        setIsMount(true)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        });
    }

    const changePlatform = (selected: OptionType, i: number) => {
        const valsosmed = [...sosmed]
        valsosmed[i].platform = selected
        setSosmed(valsosmed)
    }

    const changeLink = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const valsosmed = [...sosmed]
        valsosmed[i].link = e.target.value
        setSosmed(valsosmed)
    }

    const addFormSosmed = () => {
        setSosmed([
            ...sosmed,
            {
                platform: {
                    label: '',
                    value: ''
                },
                link: ''
            }
        ])
    }

    const removeFormSosmed = (i: number) => {
        const delete_form = sosmed.filter((_, idx) => idx !== i);
        setSosmed(delete_form);
    }

    const resetForm = () => {
        removeForm()
        removeSosmed()
        removeCorporateCulture()
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formVal = new FormData


        sosmed.forEach((val) => {
            if (val.platform.value) {
                if (val.link == '') {
                    setLoading(false)
                    return Notif(`link sosmed ${val.platform.value} harus diisi terlebih dahulu`, 'info', 3000)
                }
            }
        })
        const dataSosmed = sosmed.map(valSosmed => ({
            platform: valSosmed.platform.value,
            link: valSosmed.link
        }));
        const sosmed_json = jsonString(dataSosmed)

        const dataLink = {
            link_web: form.link_web,
            link_maps: form.link_maps
        }
        const link = jsonString(dataLink)

        formVal.append('motto', form.motto)
        formVal.append('link', link)
        formVal.append('social_media', sosmed_json || '')
        formVal.append('corporate_culture', corporateCulture)
        formVal.append('step', '2')
        await callApi.post('/company/profile/update', formVal)
            .then((response) => {
                setLoading(false)
                if (response.data.status) {
                    resetForm()
                    Notif(response.data.message, 'success', 2000)
                    setTimeout(() => {
                        router.push('/member/profile')
                    }, 2100)
                } else {
                    if (response.data.type == "validation_error") {
                        return setValidation(response.data.message)
                    }
                    return Notif(response.data.message, 'error', 2000)
                }
            }).catch((error) => {
                setLoading(false)
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
                        step1="bg-primary"
                        step2={status == 1 ? 'bg-primary' : 'bg-gray-200'}
                        textcolor1={'text-white'}
                        textcolor2={status == 1 ? 'text-white' : 'text-gray-800'}
                        keterangan1={<RiCheckLine className="h-5 w-5" />}
                        keterangan2={status == 1 ? <RiCheckLine className="h-5 w-5" /> : 2}
                    />
                </div>
                <div className="mt-16 text-xl">Form Detail Profile</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input label="Motto Perusahaan" type="text" name="motto" value={form.motto} mandatory={false} onChange={(e: any) => handleChange(e)} placeholder="" disabled={false} />
                        {validation.motto && <ValidationText text={validation.motto} />}
                    </div>
                    <div>
                        <Input label="Link Website" type="text" name="link_web" value={form.link_web} mandatory={false} onChange={(e: any) => handleChange(e)} placeholder="" disabled={false} />
                        {validation.link_web && <ValidationText text={validation.link_web} />}
                    </div>
                    <div>
                        <Input label="Link Peta (Maps)" type="text" name="link_maps" value={form.link_maps} mandatory={false} onChange={(e: any) => handleChange(e)} placeholder="" disabled={false} />
                        {validation.link_maps && <ValidationText text={validation.link_maps} />}
                    </div>
                    <div>
                        {sosmed.map((input: formSosmed, i: number) => (
                            <div key={i} className="grid grid-cols-2 gap-5">
                                <div className="mt-5">
                                    <SelectSingle label="Platform Sosmed" mandatory={false} option={optionSosmed} onChange={(selected) => changePlatform(selected, i)} value={input.platform} placholder="pilih sosmed" />
                                </div>
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="col-span-5">
                                        <Input label="Link Sosmed" type="text" name="motto" value={input.link} mandatory={false} onChange={(e: any) => changeLink(e, i)} placeholder="" disabled={false} />
                                    </div>
                                    {i > 0 && (
                                        <div className="mt-12">
                                            <Button
                                                variant="danger"
                                                onClick={() => removeFormSosmed(i)}
                                                icon={<RiDeleteBin6Line />}
                                                size="icon"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button variant="success" className="mt-5" icon={<RiAddCircleLine />} size="sm" onClick={addFormSosmed}>Tambah Sosmed</Button>
                        </div>
                    </div>
                    <div className="">
                        {/* <InputFileGallery /> */}
                    </div>
                    <div>
                        <TextEditor label="Kultur Perusahaan" mandatory={false} onChange={setCorporateCulture} value={corporateCulture} />
                    </div>
                    <hr className="mt-3 text-gray-300" />
                    <div className="mt-5 flex gap-3">
                        <Button href="/member/profile/form" variant="warning" icon={<RiArrowLeftCircleLine />}>Sebelumnya</Button>
                        <ButtonSubmit icon={<RiSaveLine className="mr-1" />} loading={loading} type="submit">Simpan</ButtonSubmit>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default FormProfile2