import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import AppointmentForm from "../components/Appointment/AppointmentForm";

function AppointmentPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Book Appointment" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            24/7 Scheduling Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Book Your Appointment</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select your preferred specialist doctor, date, and time slot for a seamless hospital consultation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}

export default AppointmentPage;
