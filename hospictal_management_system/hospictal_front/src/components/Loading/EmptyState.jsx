function EmptyState({ title = "No Results Found", message = "No matching records found for your query." }) {
  return (
    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10 text-center max-w-md mx-auto my-8">
      <div className="w-14 h-14 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default EmptyState;
