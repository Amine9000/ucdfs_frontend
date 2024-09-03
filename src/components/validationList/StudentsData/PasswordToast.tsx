import { Copy } from "lucide-react";
import toast, { Toast } from "react-hot-toast";

export function PasswordToast({ t, password }: { t: Toast; password: string }) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1 flex flex-col gap-3">
            <span className="text-gray-900 first-letter:uppercase">
              password
            </span>
            <div className="flex justify-between gap-2">
              <div className="rounded py-2 px-3 border border-gray-200 text-sm text-gray-600 flex-1">
                {password}
              </div>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(password);
                  toast.success("copied", {
                    duration: 200,
                  });
                  toast.dismiss(t.id);
                }}
                className="bg-slate-50 text-slate-700 rounded px-3  flex items-center justify-center hover:bg-slate-100 duration-300 transition-all cursor-pointer"
              >
                <Copy size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
