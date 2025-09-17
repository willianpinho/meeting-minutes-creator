import { format, parse } from 'date-fns';
import type { MeetingMinutes, ActionItem } from '../types/meeting';

export const formatMeetingDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy');
};

export const formatMeetingTime = (time: string): string => {
  try {
    const parsed = parse(time, 'HH:mm', new Date());
    return format(parsed, 'HH:mm');
  } catch {
    return time;
  }
};

export const generateMeetingId = (): string => {
  return `meeting_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const generateParticipantId = (): string => {
  return `participant_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const generateActionItemId = (): string => {
  return `action_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const generateDiscussionId = (): string => {
  return `discussion_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const generateDecisionId = (): string => {
  return `decision_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const getActionItemsByStatus = (
  actionItems: ActionItem[],
  status: ActionItem['status']
): ActionItem[] => {
  return actionItems.filter(item => item.status === status);
};

export const getPendingActionItems = (actionItems: ActionItem[]): ActionItem[] => {
  return getActionItemsByStatus(actionItems, 'pending');
};

export const getCompletedActionItems = (actionItems: ActionItem[]): ActionItem[] => {
  return getActionItemsByStatus(actionItems, 'completed');
};

export const getInProgressActionItems = (actionItems: ActionItem[]): ActionItem[] => {
  return getActionItemsByStatus(actionItems, 'in-progress');
};

export const sortMeetingsByDate = (meetings: MeetingMinutes[]): MeetingMinutes[] => {
  return [...meetings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getMeetingDuration = (startTime: string, endTime?: string): string => {
  if (!endTime) return 'Em andamento';

  try {
    const start = parse(startTime, 'HH:mm', new Date());
    const end = parse(endTime, 'HH:mm', new Date());
    const diffInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutos`;
    }

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    if (minutes === 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    }

    return `${hours}h ${minutes}min`;
  } catch {
    return 'Duração inválida';
  }
};