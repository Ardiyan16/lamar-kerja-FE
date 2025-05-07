'use client'

import Modal from "@/components/admin/card/modal"
import Button, { ButtonSubmit } from "@/components/admin/form/button"
import { Input, ValidationText } from "@/components/admin/form/input"
import Breadcrumbs from "@/components/pages/navigation/breadcrumbs/breadcrumbs"
import { fieldWorkTypes } from "@/interface/default"
import callApi from "@/utils/callapi"
import { customStylesTable } from "@/utils/global"
import { ConfirmDelete, Notif } from "@/utils/notification"
import { useEffect, useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { HiOutlinePlusCircle } from "react-icons/hi2"
import { RiCloseLine, RiDeleteBin6Line, RiEditBoxLine, RiSaveLine } from "react-icons/ri"

const BidangKerjaPage = () => {

    const breadcrumbs = [
        {
            label: "admin",
            value: "admin"
        },
        {
            label: "data",
            value: "data"
        },
        {
            label: "bidang kerja",
            value: "bidang kerja"
        },
    ]

    const column: TableColumn<fieldWorkTypes>[] = [
        {
            'name': 'No',
            cell: (row, rowIndex) => rowIndex + 1,
            'sortable': false
        },
        {
            'name': 'Nama Industri',
            cell: (row) => row.field_name,
            'sortable': false
        },
        {
            'name': 'Aksi',
            cell: (row, index) => (
                <div key={index} className="w-full flex gap-2">
                    <Button variant="primary" onClick={() => showEdit(row)} size="xs" title="Edit" type="button" icon={<RiEditBoxLine />}></Button>
                    <Button variant="danger" onClick={() => handleDelete(row)} size="xs" title="Hapus" type="button" icon={<RiDeleteBin6Line />}></Button>
                </div>
            )
        }
    ]

    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<fieldWorkTypes[]>([])
    const [filter, setFilter] = useState<fieldWorkTypes[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [fieldName, setFieldName] = useState<string>('')
    const [id, setId] = useState<number | string>('')
    const [validation, setValidation] = useState<any>([])
    const urlApi = '/admin/field-work'

    const fetchData = async () => {
        try {
            const response = await callApi.get(urlApi)
            const data = response.data.data 
            setData(data)
            setFilter(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const result = data.filter((item) => {
            return item.field_name.toLowerCase().match(search.toLowerCase());
        });
        setFilter(result);
    }, [search])

    const showAdd = () => {
        setId('')
        setFieldName('')
        setShowModal(true)
    }

    const showEdit = (data: fieldWorkTypes) => {
        setId(data.id)
        setFieldName(data.field_name)
        setShowModal(true)
    }

    const resetSearch = () => {
        setSearch('')
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        await callApi.post(urlApi + '/save', {
            id: id,
            field_name: fieldName
        }).then((response) => {
            setLoading(false)
            if(response.data.status) {
                Notif(response.data.message, 'success', 2000)
                setFieldName('')
                setShowModal(false)
                fetchData()
                setValidation([])
            } else {
                if(response.data.type == 'validation_error') {
                    return setValidation(response.data.message)
                }
                return Notif(response.data.message, 'error', 2000)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleDelete = (data: fieldWorkTypes) => {
        let message = `Data bidang kerja ${data.field_name} akan dihapus dan tidak dapat dikembalikan!`
        ConfirmDelete(message, 'question').then((result) => {
            if(result.isConfirmed) {
                callApi.get(urlApi + '/delete/' + data.id).then((response) => {
                    if(response.data.status) {
                        Notif(response.data.message, 'success', 2000)
                        fetchData()
                    } else {
                        Notif(response.data.message, 'error', 2000)
                    }
                })
            }
        })
    }

    return (
        <div className="p-4 md:p-10">
            <div className="flex flex-wrap gap-x-4 gap-y-2 w-full items-center justify-between">
                <div className="text-xl md:text-2xl font-bold">Bidang Kerja</div>
                <div className="flex items-center">
                    <Breadcrumbs data={breadcrumbs} />
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <Button type="button" variant="primary" onClick={showAdd} icon={<HiOutlinePlusCircle className="w-5 h-5" />}>Tambah Data</Button>
            </div>
            <div className="mt-5 p-5 bg-white rounded-md shadow-manage">
                <div className="w-full flex gap-5 justify-end">
                    <div className="flex w-[300px] items-center bg-zinc-50 border border-zinc-300 rounded-md p-2">
                        <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-[290px] rounded-lg text-sm bg-transparent focus:outline-none" placeholder="Cari" />
                        {search &&
                            <label onClick={resetSearch} className='pl-2 pr-2'>
                                <RiCloseLine className="w-5 h-5" />
                            </label>
                        }
                    </div>
                </div>
                <div className="mt-10">
                    <DataTable
                        columns={column}
                        data={filter}
                        fixedHeader
                        pagination
                        striped
                        customStyles={customStylesTable()}
                    />
                </div>
            </div>
            <Modal 
                open={showModal}
                closeFn={() => setShowModal(false)}
                titleContent = "Form Bidang Kerja"
                size="lg"
            >
                <form onSubmit={handleSubmit} className="mt-5 mb-5">
                    <div>
                        <input type="hidden" name="id" value={id} />
                        <Input label="Nama Bidang Kerja" type="text" value={fieldName} mandatory={true} name="field_name" onChange={(e) => setFieldName(e.target.value)} placeholder="" disabled={false}  />
                        {validation.field_name && <ValidationText text={validation.field_name} />}
                    </div>
                    <hr className="mt-5 text-gray-300"/>
                    <div className="mt-5">
                        <ButtonSubmit icon={<RiSaveLine />} loading={loading} type="submit">Simpan</ButtonSubmit>
                    </div>
                </form>
            </Modal>
        </div>
    )

}

export default BidangKerjaPage
