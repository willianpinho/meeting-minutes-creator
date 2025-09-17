import type { MeetingMinutes } from '../types/meeting';

const STORAGE_KEY = 'meeting-minutes';

export const localStorage = {
  getMeetings(): MeetingMinutes[] {
    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const meetings = JSON.parse(data);
      // Convert date strings back to Date objects
      return meetings.map((meeting: any) => ({
        ...meeting,
        date: new Date(meeting.date),
        createdAt: new Date(meeting.createdAt),
        updatedAt: new Date(meeting.updatedAt),
        actionItems: meeting.actionItems.map((item: any) => ({
          ...item,
          dueDate: new Date(item.dueDate)
        }))
      }));
    } catch (error) {
      console.error('Error loading meetings from localStorage:', error);
      return [];
    }
  },

  saveMeeting(meeting: MeetingMinutes): void {
    try {
      const meetings = this.getMeetings();
      const existingIndex = meetings.findIndex(m => m.id === meeting.id);

      if (existingIndex >= 0) {
        meetings[existingIndex] = meeting;
      } else {
        meetings.push(meeting);
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch (error) {
      console.error('Error saving meeting to localStorage:', error);
      throw new Error('Failed to save meeting');
    }
  },

  deleteMeeting(id: string): void {
    try {
      const meetings = this.getMeetings();
      const filtered = meetings.filter(m => m.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting meeting from localStorage:', error);
      throw new Error('Failed to delete meeting');
    }
  },

  getMeeting(id: string): MeetingMinutes | null {
    const meetings = this.getMeetings();
    return meetings.find(m => m.id === id) || null;
  }
};