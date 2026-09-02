export const generatePatientId = (count) => {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(5, '0');
  return `PAT-${year}-${num}`;
};

export const generateEmpId = (role, count) => {
  let prefix = 'EMP';
  switch (role?.toUpperCase()) {
    case 'ADMIN': prefix = 'EMP-ADM'; break;
    case 'DOCTOR': prefix = 'EMP-DOC'; break;
    case 'RECEPTIONIST': prefix = 'EMP-REC'; break;
    case 'PHARMACIST': prefix = 'EMP-PHAR'; break;
    case 'LABORATORY': prefix = 'EMP-LAB'; break;
    default: prefix = 'EMP-STF'; break;
  }
  const num = String(count + 1).padStart(3, '0');
  return `${prefix}-${num}`;
};

export const generateAppointmentId = (count) => {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(5, '0');
  return `APT-${year}-${num}`;
};

export const generatePrescriptionId = (count) => {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(5, '0');
  return `RX-${year}-${num}`;
};

export const generateSampleId = (count) => {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(5, '0');
  return `LAB-SMP-${year}-${num}`;
};

export const generateInvoiceNumber = (count) => {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(5, '0');
  return `INV-${year}-${num}`;
};
