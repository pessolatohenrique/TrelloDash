import { toast } from 'react-toastify';

/**
 * realiza a criação de um toaster
 * @param { String } text texto a ser exibido pelo Toast
 * @return void
 */
export function createToast(text) {
    toast(text, {
        position: "top-right",
        bodyClassName: "toast-body",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
        // draggable: true,
    });
}

export function createErrorToast(text) {
    toast.error(text, {
        position: "top-right",
        bodyClassName: "toast-body-white",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
        // draggable: true,
    });
}