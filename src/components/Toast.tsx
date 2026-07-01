interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-[#222] px-4 py-2.5 text-sm font-black text-white shadow-[0_20px_70px_rgba(45,24,18,.22)] transition-transform ${
        message ? "translate-y-0" : "translate-y-[120px]"
      }`}
    >
      {message}
    </div>
  );
}
