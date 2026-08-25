function FloatingWhatsApp() {
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello Capital Public Seva Hospital! I would like to make an inquiry or book an appointment.");
    window.open(`https://wa.me/917787814476?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <span className="absolute bottom-16 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us on WhatsApp
      </span>
      
      {/* Pulse background effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping -z-10 scale-125"></span>
      
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.101-2.885-6.968C16.588 1.951 14.12 1.93 11.5 1.93 6.064 1.93 1.64 6.35 1.637 11.794c-.001 1.716.463 3.393 1.342 4.915l-.982 3.582 3.658-.96c1.479.807 3.09 1.233 4.609 1.222zM18.06 14.85c-.328-.164-1.942-.958-2.242-1.069-.3-.109-.519-.164-.738.164-.219.328-.847 1.069-1.039 1.288-.192.219-.384.246-.712.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.825-2.274-.192-.329-.02-.507.144-.671.147-.148.328-.383.493-.574.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.574-.082-.164-.738-1.778-1.012-2.434-.267-.641-.561-.553-.768-.564-.199-.01-.428-.012-.657-.012-.229 0-.602.086-.917.429-.315.343-1.202 1.176-1.202 2.871 0 1.696 1.233 3.332 1.403 3.56.17.228 2.427 3.705 5.877 5.197.82.355 1.46.567 1.96.726.824.262 1.575.225 2.167.137.66-.099 1.942-.794 2.216-1.56.274-.767.274-1.423.192-1.56-.082-.137-.3-.219-.628-.383z" />
        </svg>
      </button>
    </div>
  );
}

export default FloatingWhatsApp;
