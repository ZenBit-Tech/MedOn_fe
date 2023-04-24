export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  forgetPassword: '/forget-password',
  dashboard: '/dashboard',
  appointments: '/appointments',
  profile: '/profile',
  resetPassword: '/reset-password/:token',
  patientList: '/patient-list',
  help: '/help',
  exit: '/logout',
  resendConfirmation: '/re-confirm-account',
  updatePassword: '/update-password',
  patients: '/patients',
  addPatient: '/patients/add-new',
};

export const localDoctorRoutes = [routes.addPatient];
