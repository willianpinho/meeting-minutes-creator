export interface Participant {
  id: string;
  name: string;
  email?: string;
  role?: string;
}

export interface ActionItem {
  id: string;
  description: string;
  responsible: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Discussion {
  id: string;
  topic: string;
  description: string;
  notes?: string;
}

export interface Decision {
  id: string;
  topic: string;
  decision: string;
  rationale?: string;
}

export interface MeetingMinutes {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  location?: string;
  participants: Participant[];
  agenda: string[];
  discussions: Discussion[];
  decisions: Decision[];
  actionItems: ActionItem[];
  generalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  participants: Participant[];
  agenda: string[];
  discussions: Discussion[];
  decisions: Decision[];
  actionItems: ActionItem[];
  generalNotes: string;
}

// Type guards
export const isValidStatus = (status: string): status is ActionItem['status'] => {
  return ['pending', 'in-progress', 'completed'].includes(status);
};

// Utility types
export type CreateMeetingData = Omit<MeetingMinutes, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMeetingData = Partial<Omit<MeetingMinutes, 'id' | 'createdAt' | 'updatedAt'>>;