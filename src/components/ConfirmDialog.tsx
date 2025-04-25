import { Warning } from "./icons/Warning";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "تأیید عملیات",
  message = "آیا مطمئن هستید؟",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl w-full max-w-sm text-center space-y-6 border border-blue-100/50 transform transition-all duration-300 scale-100 animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Warning />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}
