import { Link } from "react-router-dom";

function NotFoundPage({ message = "The page you are looking for might have been removed or does not exist." }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-100 shadow-xl text-center max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto text-3xl font-black border border-rose-100">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
