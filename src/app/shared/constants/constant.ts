export const API_URL = {
  Platform : 'SDATS/configuration/platform',
  Interviewer: 'SDATS/configuration/interviewer',
  Skill: 'SDATS/configuration/skill',
  ContactMode: 'SDATS/configuration/contactMode',
  Source: 'SDATS/configuration/source',
  Recruiter: 'SDATS/configuration/recruiter',
  Application: 'SDATS/application/candidates',
  Schedule: 'SDATS/application/interviewschedules'
};

export enum ApplicationStatus {
  'Open' = 1,
  'Interested' = 2,
  'Not interested' = 3,
  'Interview Scheduled' = 4,
  'Selected' = 5,
  'Rejected' = 6
}
