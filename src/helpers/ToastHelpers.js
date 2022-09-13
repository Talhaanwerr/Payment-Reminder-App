import { toast } from "react-toastify";


export const ToastSuccess = (msg) => {
    toast.success(`${msg}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: false,
        theme: "colored"
      })
}

export const ToastError = (msg) => {
    toast.error(`${msg}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: false,
        theme: "colored"
      })
}