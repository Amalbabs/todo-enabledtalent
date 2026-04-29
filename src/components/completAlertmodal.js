export default function CompleteAlertModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Task?</h3>
        <p className="text-gray-600 mb-6">Are you sure you have completed this task?</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-[#1a6334] text-white font-semibold rounded-xl hover:bg-[#144d28] transition-all shadow-md"
          >
            Yes, Complete
          </button>
        </div>
      </div>
    </div>
  );
}
