function LoadingSpinner({ message = "Loading healthcare data..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-200 rounded-full animate-ping"></div>
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-semibold text-slate-600 animate-pulse">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
