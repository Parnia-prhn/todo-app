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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm text-center space-y-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{message}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}
