import { toast } from "react-toastify";

toast.configure({
  limit: 3,
  style: {
    fontSize: "15px",
  },
});

export const showInfoToast = (msg: string) => {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccessToast = (msg: string) => {
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorToast = (msg: string) => {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
