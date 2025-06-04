'use client'
import { avatarProfile } from "@/atom/avatar"
import Button, { ButtonSubmit } from "@/components/admin/form/button"
import Breadcrumbs from "@/components/pages/navigation/breadcrumbs/breadcrumbs"
import { CompanyUserTypeJoin } from "@/interface/company"
import callApi from "@/utils/callapi"
import { jsonParse, urlImg } from "@/utils/global"
import { useSetAtom } from "jotai"
import { FC, useEffect, useState } from "react"
import { RiBuildingLine, RiEditBoxLine, RiGlobalLine, RiMapPin2Line, RiMapPinLine, RiUpload2Line, RiUploadCloud2Line, RiVerifiedBadgeLine } from "react-icons/ri"
import DefaultLogo from '@/public/images/default_company.png'
import Image from "next/image"
import { HiOutlineUserGroup } from "react-icons/hi2"
import Link from "next/link"
import { iconSosmed } from "@/components/icon"
import { socialMediaTypes } from "@/interface/default"
import Modal from "@/components/admin/card/modal"
import { InputFile } from "@/components/admin/form/input-file"
import { Notif } from "@/utils/notification"
import { ValidationText } from "@/components/admin/form/input"

const ProfilePageMember = () => {

    const breadcrumbs = [
        {
            label: "member",
            value: "member"
        },
        {
            label: "profile",
            value: "profile"
        },
    ]

    const [data, setData] = useState<CompanyUserTypeJoin>()


    const fetchData = async () => {
        try {
            const response = await callApi.get('/company/profile')
            setData(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="p-4 md:p-10">
            <div className="flex flex-wrap gap-x-4 gap-y-2 w-full items-center justify-between">
                <div className="text-xl md:text-2xl font-bold">Profile</div>
                <div className="flex items-center">
                    <Breadcrumbs data={breadcrumbs} />
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <Button href="/member/profile/form" variant="primary" icon={<RiEditBoxLine className="w-5 h-5" />}>Edit Profile</Button>
            </div>
            <HeaderProfile data={data} fetchData={fetchData} />
            <div className="mt-5">
                <AboutCompany about={data?.about_us} />
            </div>
            <div className="mt-5">
                <ContactCompany data={data} />
            </div>
            <div className="mt-5">
                <CultureCompany corporate_culture={data?.corporate_culture} />
            </div>
            <div className="mt-5">
                <GalleryCompany />
            </div>
        </div>
    )

}

interface headerType {
    data?: CompanyUserTypeJoin
    fetchData: () => void
}

interface contactType {
    data?: CompanyUserTypeJoin
}

interface aboutType {
    about: string | null | undefined
}

interface cultureType {
    corporate_culture: string | null | undefined
}

const HeaderProfile: FC<headerType> = ({ data, fetchData }) => {

    const setAvatar = useSetAtom(avatarProfile)
    const imgUrl = urlImg()
    const [logo, setLogo] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingImg, setLoadingImg] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [validation, setValidation] = useState<any>([])

    const onChange = (e: any) => {
        setLoadingImg(true)
        const file = e.target.files[0];
        const typeFile = file['type'];
        const validType = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
        if (!validType.includes(typeFile)) {
            Notif('File hanya untuk berformat jpg, jpeg, png, dan webp', "info", 2500)
        }
        setTimeout(() => {
            setLoadingImg(false)
            setLogo(file)
        }, 2000)
    }

    const removeLogo = () => {
        setLogo(null)
    }


    const handleUpload = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formVal = new FormData
        formVal.append('logo_profile', logo ? logo : '')
        await callApi.post('/company/profile/upload-profile', formVal)
            .then((response) => {
                setLoading(false)
                if (response.data.status) {
                    setLogo(null)
                    setShowModal(false)
                    setValidation([])
                    fetchData()
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

    const deleteLogo = () => {

    }

    const logoUrl = data?.logo_profile ? imgUrl + "/logo_company/" + data?.logo_profile : DefaultLogo
    useEffect(() => {
        setAvatar(typeof logoUrl !== 'string' ? logoUrl.src : logoUrl)
    }, [logoUrl])
    return (
        <div className="mt-5 p-3 md:p-5 bg-white rounded-lg shadow-manage">
            <div className="flex gap-5">
                <div className="max-w-32 md:max-w-40 lg:max-w-64">
                    <div className="md:max-h-60 lg:max-h-80">
                        <Image src={logoUrl} alt="" width={0} height={0} sizes="100%" className='rounded-lg object-scale-down w-full' />
                    </div>
                    <div className="mt-5 bottom-0">
                        <Button type="button" className="py-2" onClick={() => setShowModal(true)} variant="primary" size="sm" icon={<RiUploadCloud2Line />}>Unggah Logo</Button>
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-center gap-2 text-xl md:text-2xl md:justify-start font-medium'>
                        <span >
                            {data?.name}
                        </span>
                        {data?.is_premium == 1 &&
                            <RiVerifiedBadgeLine className="w-4 h-4 lg:w-8 lg:h-8 text-blue-500" />
                        }
                    </div>
                    <div className="text-base mt-5" dangerouslySetInnerHTML={{ __html: data?.motto || '' }}></div>
                    <div className="grid grid-cols-2">
                        <div>
                            <div className="text-base flex gap-2 mt-5">
                                <RiBuildingLine className="mt-1" /> <span>{data?.name_industry}</span>
                            </div>
                            <div className="text-base flex gap-2 mt-5">
                                <RiMapPin2Line className="mt-1" /> <span>{data?.name_district}, {data?.name_regency}, {data?.name_province}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-base flex gap-2 mt-5">
                                <HiOutlineUserGroup className="mt-1" /> <span>{data?.total_employee}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={showModal}
                closeFn={() => setShowModal(false)}
                titleContent="Upload Logo Perusahaan"
                size="md"
            >
                <form onSubmit={handleUpload} className="mt-5 mb-5">
                    <div>
                        <InputFile name="logo_profile" label="Upload Profile" file={logo ? logo.name : ''} edit={data?.logo_profile || ''} imgPrev={logo ? URL.createObjectURL(logo) : ''} type_file="image/*" onChange={(e) => onChange(e)} onClick={() => removeLogo()} onClickDel={deleteLogo} loading={loadingImg} type="logo_company" />
                        {validation.logo_profile && <ValidationText text={validation.logo_profile} />}
                    </div>
                    <hr className="mt-5 text-gray-300" />
                    <div className="mt-5">
                        <ButtonSubmit icon={<RiUpload2Line />} loading={loading} type="submit">Upload</ButtonSubmit>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

const AboutCompany: FC<aboutType> = ({
    about
}) => {
    return (
        <div className="mt-5 p-3 md:p-5 bg-white rounded-lg shadow-manage">
            <h5 className="text-xl font-bold">Tentang Perusahaan</h5>
            <hr className="mt-3 text-gray-300" />
            <div className="text-base mt-5" dangerouslySetInnerHTML={{ __html: about || '' }}></div>
        </div>
    )
}

const ContactCompany: FC<contactType> = ({ data }) => {
    const link = data?.link ? jsonParse(data.link) : {}
    const socmed = data?.social_media ? jsonParse(data.social_media) : []
    return (
        <div className="mt-5 p-3 md:p-5 bg-white rounded-lg shadow-manage">
            <h5 className="text-xl font-bold">Kontak Perusahaan</h5>
            <hr className="mt-3 text-gray-300" />
            <div className="mt-5">
                <p className="text-base font-bold">Alamat</p>
                <p className="text-base mt-2">{data?.address}</p>
                <Link href={link?.link_maps || ''} target="_blank" className="text-base flex gap-1 mt-2 text-primary1"><RiMapPinLine className="mt-1" /> Peta Lokasi</Link>
            </div>
            <div className="mt-5">
                <p className="text-base font-bold">Website</p>
                <Link href={link?.link_web || ''} target="_blank" className="text-base flex gap-1 mt-2 text-primary1"><RiGlobalLine className="mt-1" /> Website</Link>
            </div>
            <div className="mt-5">
                <p className="text-base font-bold">Sosial Media</p>
                <div className="flex gap-5 mt-3">
                    {socmed && socmed.map((item: socialMediaTypes, i: number) => (
                        <div className="flex gap-1" key={i}>
                            <div className="text-gray-500">{iconSosmed(item.platform)}</div>
                            <Link href={item.link} className="text-primary1">{item.platform}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

const CultureCompany: FC<cultureType> = ({ corporate_culture }) => {

    return (
        <div className="mt-5 p-3 md:p-5 bg-white rounded-lg shadow-manage">
            <h5 className="text-xl font-bold">Kultur Perusahaan</h5>
            <hr className="mt-3 text-gray-300" />
            {corporate_culture ? (
                <div className="text-base mt-5" dangerouslySetInnerHTML={{ __html: corporate_culture || '' }}></div>
            ) : (
                <div className="text-base mt-5">Perusahaan belum menambahkan kultur</div>
            )}
        </div>
    )

}

const GalleryCompany = () => {
    return (
        <div className="mt-5 p-3 md:p-5 bg-white rounded-lg shadow-manage">
            <h5 className="text-xl font-bold">Galeri Perusahaan</h5>
            <hr className="mt-3 text-gray-300" />
        </div>
    )
}

export default ProfilePageMember