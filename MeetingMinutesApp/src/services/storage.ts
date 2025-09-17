import AsyncStorage from '@react-native-async-storage/async-storage';
import { MeetingMinutes } from '../types/meeting';

const STORAGE_KEY = 'meeting-minutes';

export const storageService = {
  async getMeetings(): Promise<MeetingMinutes[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const meetings = JSON.parse(stored);
      // Parse dates from JSON strings
      return meetings.map((meeting: any) => ({
        ...meeting,
        date: new Date(meeting.date),
        createdAt: new Date(meeting.createdAt),
        updatedAt: new Date(meeting.updatedAt),
        actionItems: meeting.actionItems.map((item: any) => ({
          ...item,
          dueDate: new Date(item.dueDate),
        })),
      }));
    } catch (error) {
      console.error('Error loading meetings:', error);
      return [];
    }
  },

  async saveMeetings(meetings: MeetingMinutes[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch (error) {
      console.error('Error saving meetings:', error);
      throw new Error('Failed to save meetings');
    }
  },

  async saveMeeting(meeting: MeetingMinutes): Promise<void> {
    try {
      const meetings = await this.getMeetings();
      const existingIndex = meetings.findIndex(m => m.id === meeting.id);

      if (existingIndex >= 0) {
        meetings[existingIndex] = meeting;
      } else {
        meetings.push(meeting);
      }

      await this.saveMeetings(meetings);
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw new Error('Failed to save meeting');
    }
  },

  async deleteMeeting(id: string): Promise<void> {
    try {
      const meetings = await this.getMeetings();
      const filtered = meetings.filter(m => m.id !== id);
      await this.saveMeetings(filtered);
    } catch (error) {
      console.error('Error deleting meeting:', error);
      throw new Error('Failed to delete meeting');
    }
  },

  async clearAllMeetings(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing meetings:', error);
      throw new Error('Failed to clear meetings');
    }
  },
};