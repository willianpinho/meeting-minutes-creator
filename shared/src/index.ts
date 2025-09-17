// Main exports
export * from './types';
export * from './utils';
export * from './components/MaterialIcons';
export * from './components/MaterialButton';

// Re-export schemas with explicit naming to avoid conflicts
export {
  participantSchema,
  actionItemSchema,
  discussionSchema,
  decisionSchema,
  meetingFormSchema,
  meetingMinutesSchema,
  type ParticipantSchema,
  type ActionItemSchema,
  type DiscussionSchema,
  type DecisionSchema,
  type MeetingFormDataSchema,
  type MeetingMinutesSchema
} from './schemas/meeting';