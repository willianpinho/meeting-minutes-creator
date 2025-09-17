import { useState, useEffect, useCallback } from 'react';
import { MeetingMinutes } from '../types/meeting';
import { storageService } from '../services/storage';

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<MeetingMinutes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeetings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedMeetings = await storageService.getMeetings();
      setMeetings(loadedMeetings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load meetings');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveMeeting = useCallback(async (meeting: MeetingMinutes) => {
    try {
      setError(null);
      await storageService.saveMeeting(meeting);
      await loadMeetings(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save meeting');
      throw err;
    }
  }, [loadMeetings]);

  const deleteMeeting = useCallback(async (id: string) => {
    try {
      setError(null);
      await storageService.deleteMeeting(id);
      await loadMeetings(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete meeting');
      throw err;
    }
  }, [loadMeetings]);

  const getMeeting = useCallback((id: string): MeetingMinutes | undefined => {
    return meetings.find(meeting => meeting.id === id);
  }, [meetings]);

  const clearAllMeetings = useCallback(async () => {
    try {
      setError(null);
      await storageService.clearAllMeetings();
      setMeetings([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear meetings');
      throw err;
    }
  }, []);

  useEffect(() => {
    loadMeetings();
  }, [loadMeetings]);

  return {
    meetings,
    loading,
    error,
    saveMeeting,
    deleteMeeting,
    getMeeting,
    clearAllMeetings,
    refreshMeetings: loadMeetings,
  };
};