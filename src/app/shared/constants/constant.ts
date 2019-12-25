export const API_URL = {
  Platform: 'SDATS/configuration/platform',
  Application: 'SDATS/application/candidates'
};

export enum ApplicationStatus {
  'Open' = 1,
  'Interested' = 2,
  'Not interested' = 3,
  'Interview Scheduled' = 4,
  'Selected' = 5,
  'Rejected' = 6
}
