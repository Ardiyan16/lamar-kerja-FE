'use client'
import CardInfoDashboard from "@/components/admin/card/card-info"
import Breadcrumbs from "@/components/pages/navigation/breadcrumbs/breadcrumbs"
import { DashboardAdminTypes } from "@/interface/default"
import callApi from "@/utils/callapi"
import { useEffect, useState } from "react"
import { RiBriefcaseLine, RiBuilding4Line, RiUser2Line } from "react-icons/ri"

const AdminDashboard = () => {

    const breadcrumbs = [
        {
            label: "admin",
            value: "admin"
        },
        {
            label: "dashboard",
            value: "dashboard"
        }
    ]

    const [data, setData] = useState<DashboardAdminTypes>()
    // const [moun]

    const fetchData = async () => {
        try {
            const response = await callApi.get('/admin/get-dashboard')
            const data = response.data.data 
            setData(data)
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
                <div className="text-xl md:text-2xl font-bold">Dashboard Admin</div>
                <div className="flex items-center">
                    <Breadcrumbs data={breadcrumbs} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-4">
                <CardInfoDashboard title="Total Pengguna" total={data?.count_user || ''} icon={<RiUser2Line className="h-12 w-12 text-white" />} />
                <CardInfoDashboard title="Total Perusahaan" total={data?.count_company || ''} icon={<RiBuilding4Line className="h-12 w-12 text-white" />} />
                <CardInfoDashboard title="Total Posting Loker Aktif" total={data?.count_post_job_active || '0'} icon={<RiBriefcaseLine className="h-12 w-12 text-white" />} />
                <CardInfoDashboard title="Total Posting Loker Keseluruhan" total={data?.count_post_job_all || '0'} icon={<RiBriefcaseLine className="h-12 w-12 text-white" />} />
            </div>
        </div>
    )

}

export default AdminDashboard
