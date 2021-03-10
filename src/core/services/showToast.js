import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showErrorToast = (text) => {
  toast.error(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3500,
  });
};

export const showSuccessToast = (text) => {
  toast.success(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3500,
  });
};

export default ToastContainer;
