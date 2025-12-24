import toast from "react-hot-toast";



const success = (message: string) => {
    toast.success(message, {
        duration: 4000, });
}

const Error = (message: string) => {
    toast.error(message, {
        duration: 4000, });
}

const info = (message: string) => {
    toast(message, {
        duration: 4000, });
}

export { success , Error , info };