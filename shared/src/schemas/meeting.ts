import { z } from 'zod';

export const participantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  role: z.string().optional(),
});

export const actionItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  dueDate: z.date(),
  status: z.enum(['pending', 'in-progress', 'completed']),
});

export const discussionSchema = z.object({
  id: z.string(),
  topic: z.string().min(1, 'Tópico é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  notes: z.string().optional(),
});

export const decisionSchema = z.object({
  id: z.string(),
  topic: z.string().min(1, 'Tópico é obrigatório'),
  decision: z.string().min(1, 'Decisão é obrigatória'),
  rationale: z.string().optional(),
});

export const meetingFormSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  startTime: z.string().min(1, 'Horário de início é obrigatório'),
  endTime: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  participants: z.array(participantSchema).default([]),
  agenda: z.array(z.string()).default([]),
  discussions: z.array(discussionSchema).default([]),
  decisions: z.array(decisionSchema).default([]),
  actionItems: z.array(actionItemSchema).default([]),
  generalNotes: z.string().optional().or(z.literal('')),
});

export const meetingMinutesSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  participants: z.array(participantSchema),
  agenda: z.array(z.string()),
  discussions: z.array(discussionSchema),
  decisions: z.array(decisionSchema),
  actionItems: z.array(actionItemSchema),
  generalNotes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Export inferred types with different names to avoid conflicts
export type ParticipantSchema = z.infer<typeof participantSchema>;
export type ActionItemSchema = z.infer<typeof actionItemSchema>;
export type DiscussionSchema = z.infer<typeof discussionSchema>;
export type DecisionSchema = z.infer<typeof decisionSchema>;
export type MeetingFormDataSchema = z.infer<typeof meetingFormSchema>;
export type MeetingMinutesSchema = z.infer<typeof meetingMinutesSchema>;