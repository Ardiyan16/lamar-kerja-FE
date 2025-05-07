
import { toast } from "react-toastify"
import Swal from "sweetalert2"

export const Notif = (message: string, type: "success" | "error" | "warning" | "info", autoclose: number) => {
    if (type === 'success') {
        return toast.success(message, {
            position: "top-right",
            autoClose: autoclose
        })
    } else if (type === 'error') {
        return toast.error(message, {
            position: "top-right",
            autoClose: autoclose,
            closeOnClick: false
        })
    } else if (type === 'warning') {
        return toast.warn(message, {
            position: "top-right",
            autoClose: autoclose
        })
    } else if (type === 'info') {
        return toast.info(message, {
            position: "top-right",
            autoClose: autoclose
        })
    }
}

export const NotifLogout = (message: string | '', status: 'question') => {
    return Swal.fire({
        title: 'Apa anda yakin?',
        text: message,
        icon: status,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#898989',
        confirmButtonText: 'Keluar'
    })
}

export const ConfirmDelete = (message: string | '', status: 'question') => {
    return Swal.fire({
        title: 'Apa anda yakin?',
        text: message,
        icon: status,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#898989',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal'
    })
}
