import DoctorCard from "./DoctorCard";
import EmptyState from "../Loading/EmptyState";

function DoctorList({ doctorsList = [] }) {
  if (doctorsList.length === 0) {
    return <EmptyState title="No Doctors Available" message="Try selecting another department or clearing filters." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {doctorsList.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

export default DoctorList;
