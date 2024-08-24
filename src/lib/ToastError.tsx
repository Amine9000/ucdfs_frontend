import toast from "react-hot-toast";

export function ToastError(errorMessage: string) {
  toast.error(errorMessage, {
    position: "top-center",
    duration: 5000,
  });
}
