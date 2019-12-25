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
