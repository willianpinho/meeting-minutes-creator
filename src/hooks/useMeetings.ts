import { useState, useEffect } from 'react';
import type { MeetingMinutes } from '../types/meeting';
import { localStorage } from '../utils/localStorage';

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<MeetingMinutes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = () => {
    setLoading(true);
    try {
      const savedMeetings = localStorage.getMeetings();
      setMeetings(savedMeetings);
    } catch (error) {
      console.error('Error loading meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMeeting = (meeting: MeetingMinutes) => {
    try {
      localStorage.saveMeeting(meeting);
      loadMeetings(); // Reload to get fresh data
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw error;
    }
  };

  const deleteMeeting = (id: string) => {
    try {
      localStorage.deleteMeeting(id);
      loadMeetings(); // Reload to get fresh data
    } catch (error) {
      console.error('Error deleting meeting:', error);
      throw error;
    }
  };

  const getMeeting = (id: string): MeetingMinutes | null => {
    return localStorage.getMeeting(id);
  };

  return {
    meetings,
    loading,
    saveMeeting,
    deleteMeeting,
    getMeeting,
    refresh: loadMeetings
  };
};