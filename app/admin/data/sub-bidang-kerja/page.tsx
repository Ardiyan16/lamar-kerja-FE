'use client'

import Modal from "@/components/admin/card/modal"
import Button, { ButtonSubmit } from "@/components/admin/form/button"
import { Input, ValidationText } from "@/components/admin/form/input"
import Breadcrumbs from "@/components/pages/navigation/breadcrumbs/breadcrumbs"
import { fieldWorkTypes, subFieldWorkTypes } from "@/interface/default"
import callApi from "@/utils/callapi"
import { customStylesTable } from "@/utils/global"
import { OptionType } from "@/utils/option"
import { useEffect, useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { HiOutlinePlusCircle } from "react-icons/hi2"
import Select, { SingleValue } from 'react-select';
import { RiCloseLine, RiDeleteBin6Line, RiEditBoxLine, RiSaveLine } from "react-icons/ri"
import { ConfirmDelete, Notif } from "@/utils/notification"


const SubBidangKerjaPage = () => {

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
            label: "sub bidang kerja",
            value: "sub bidang kerja"
        },
    ]

    const column: TableColumn<subFieldWorkTypes>[] = [
        {
            'name': 'No',
            cell: (row, rowIndex) => rowIndex + 1,
            'sortable': false
        },
        {
            'name': 'Nama Bidang',
            cell: (row) => row.field_name,
            'sortable': false
        },
        {
            'name': 'Nama Sub Bidang',
            cell: (row) => row.name_sub_field,
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
    const [showModal, setShowModal] = useState<boolean>(false)
    const [data, setData] = useState<subFieldWorkTypes[]>([])
    const [filter, setFilter] = useState<subFieldWorkTypes[]>([])
    const [option, setOption] = useState<OptionType[]>([])
    const [validation, setValidation] = useState<any>([])
    const [id, setId] = useState<number | string>('')
    const [selectField, setSelectField] = useState<SingleValue<OptionType>>(null)
    const [subFieldName, setSubFieldName] = useState<string>('')

    const urlApi = '/admin/sub-field-work'

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

    const fetchFieldWork = async () => {
        try {
            const response = await callApi.get('/admin/field-work')
            const data = response.data.data
            const initOpt: OptionType[] = []
            data.map((item: fieldWorkTypes) => {
                const temp: OptionType = {
                    label: item.field_name,
                    value: item.id
                }
                initOpt.push(temp)
            })
            setOption(initOpt)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
        fetchFieldWork()
    }, [])

    const onChange = (selected: OptionType | null) => {
        setSelectField(selected)
    }

    const showAdd = () => {
        setId('')
        setSelectField(null)
        setSubFieldName('')
        setShowModal(true)
    }

    const showEdit = (data: subFieldWorkTypes) => {
        setId(data.id)
        setSelectField({
            value: data.field_work_id, label: data.field_name
        })
        setSubFieldName(data.name_sub_field)
        setShowModal(true)
    }

    const resetSearch = () => {
        setSearch('')
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        await callApi.post(urlApi + "/save", {
            id: id,
            field_work_id: selectField?.value,
            name_sub_field: subFieldName
        }).then((response) => {
            setLoading(false)
            if (response.data.status) {
                Notif(response.data.message, 'success', 2000)
                setSelectField(null)
                setSubFieldName('')
                setShowModal(false)
                fetchData()
                setValidation([])
            } else {
                if (response.data.type == "validation_error") {
                    return setValidation(response.data.message)
                }
                Notif(response.data.message, 'error', 2000)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleDelete = (data: subFieldWorkTypes) => {
        let message = `Data sub bidang kerja ${data.name_sub_field} akan dihapus dan tidak dapat dikembalikan!`
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
                <div className="text-xl md:text-2xl font-bold">Sub Bidang Kerja</div>
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
                        noDataComponent="Data belum tersedia"
                    />
                </div>
            </div>
            <Modal
                open={showModal}
                closeFn={() => setShowModal(false)}
                titleContent="Form Bidang Kerja"
                size="lg"
            >
                <form onSubmit={handleSubmit} className="mt-5 mb-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">Pilih Bidang Kerja <span className="text-red-600">*</span></label>
                        <Select
                            options={option}
                            value={selectField}
                            onChange={onChange}
                            className="basic-single"
                            placeholder="Pilih Bidang Kerja"
                            isClearable
                        />
                        {validation.field_work_id && <ValidationText text={validation.field_work_id} />}
                    </div>
                    <div>
                        <input type="hidden" name="id" value={id} />
                        <Input label="Nama Sub Bidang Kerja" type="text" value={subFieldName} mandatory={true} name="name_sub_field" onChange={(e) => setSubFieldName(e.target.value)} placeholder="" disabled={false} />
                        {validation.name_sub_field && <ValidationText text={validation.name_sub_field} />}
                    </div>
                    <hr className="mt-5 text-gray-300" />
                    <div className="mt-5">
                        <ButtonSubmit icon={<RiSaveLine />} loading={loading} type="submit">Simpan</ButtonSubmit>
                    </div>
                </form>
            </Modal>
        </div>
    )

}

export default SubBidangKerjaPage

