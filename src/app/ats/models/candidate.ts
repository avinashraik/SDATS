import { SkillModel } from '../components/add-candidate/add-candidate.component';

export interface Candidate {
    id?: string;
    name?: string;
    exp?: number;
    platform?: string;
    gender?: string;
    contactMode?: string;
    email?: string;
    contactNo?: string;
    source?: string;
    recruiter?: string;
    skills?: string[];
    status?: string;
    description?: string;
    CreatedDate?: Date;
    CvUrl?: string;
}
export interface schedule {
    id?: string;
    scheduleDate?: string;
    scheduleTime?: string;
    candidateId?: string;
    interviewerId?: string;
    candName?:string;
    InterviewerName?:string;
}
