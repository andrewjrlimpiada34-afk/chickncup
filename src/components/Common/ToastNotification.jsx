import { useToast } from "../../contexts/ToastContext";

export default function ToastNotification() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => dismissToast(toast.id)}
          type="button"
        >
          <span>{toast.message}</span>
        </button>
      ))}
    </div>
  );
}
