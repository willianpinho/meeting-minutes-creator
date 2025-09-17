import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'dd/MM/yyyy') : '';
  } catch {
    return '';
  }
};

export const formatDateTime = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'dd/MM/yyyy HH:mm') : '';
  } catch {
    return '';
  }
};

export const formatTime = (time: string): string => {
  try {
    // Assume time is in HH:mm format
    return time;
  } catch {
    return '';
  }
};

export const parseDate = (dateString: string): Date => {
  const parsed = parseISO(dateString);
  return isValid(parsed) ? parsed : new Date();
};

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getCurrentTime = (): string => {
  return format(new Date(), 'HH:mm');
};