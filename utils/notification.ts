import { toast } from "react-toastify"
import Swal from "sweetalert2"

export const Notification = (message: string, type: string, autoclose: number) => {
    if (type === 'success') {
        return toast.success(message, {
            position: "top-right",
            autoClose: autoclose
        })
    } else if (type === 'error') {
        return toast.error(message, {
            position: "top-right",
            autoClose: autoclose
        })
    } else if (type === 'warning') {
        return toast.warning(message, {
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
