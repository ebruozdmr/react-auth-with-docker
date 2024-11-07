import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};

export const toastError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};
