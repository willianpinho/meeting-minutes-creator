import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

import type { MeetingMinutes, Participant, Discussion, Decision, ActionItem } from '../types/meeting';
import { meetingFormSchema } from '@meeting-minutes/shared';

interface MeetingFormProps {
  meeting?: MeetingMinutes;
  onSave: (meeting: MeetingMinutes) => void;
  onCancel: () => void;
}

export const MeetingForm: React.FC<MeetingFormProps> = ({ meeting, onSave, onCancel }) => {
  const [participants, setParticipants] = useState<Participant[]>(meeting?.participants || []);
  const [agenda, setAgenda] = useState<string[]>(meeting?.agenda || []);
  const [discussions, setDiscussions] = useState<Discussion[]>(meeting?.discussions || []);
  const [decisions, setDecisions] = useState<Decision[]>(meeting?.decisions || []);
  const [actionItems, setActionItems] = useState<ActionItem[]>(meeting?.actionItems || []);

  const [newParticipant, setNewParticipant] = useState({ name: '', email: '', role: '' });
  const [newAgendaItem, setNewAgendaItem] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      title: meeting?.title || '',
      date: meeting?.date ? format(meeting.date, 'yyyy-MM-dd') : '',
      startTime: meeting?.startTime || '',
      endTime: meeting?.endTime || '',
      location: meeting?.location || '',
      generalNotes: meeting?.generalNotes || '',
    },
  });

  const addParticipant = () => {
    if (newParticipant.name.trim()) {
      const participant: Participant = {
        id: uuidv4(),
        name: newParticipant.name.trim(),
        email: newParticipant.email.trim() || undefined,
        role: newParticipant.role.trim() || undefined,
      };
      setParticipants([...participants, participant]);
      setNewParticipant({ name: '', email: '', role: '' });
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const addAgendaItem = () => {
    if (newAgendaItem.trim()) {
      setAgenda([...agenda, newAgendaItem.trim()]);
      setNewAgendaItem('');
    }
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const addDiscussion = () => {
    const discussion: Discussion = {
      id: uuidv4(),
      topic: '',
      description: '',
      notes: '',
    };
    setDiscussions([...discussions, discussion]);
  };

  const updateDiscussion = (id: string, field: keyof Discussion, value: string) => {
    setDiscussions(discussions.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const removeDiscussion = (id: string) => {
    setDiscussions(discussions.filter(d => d.id !== id));
  };

  const addDecision = () => {
    const decision: Decision = {
      id: uuidv4(),
      topic: '',
      decision: '',
      rationale: '',
    };
    setDecisions([...decisions, decision]);
  };

  const updateDecision = (id: string, field: keyof Decision, value: string) => {
    setDecisions(decisions.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const removeDecision = (id: string) => {
    setDecisions(decisions.filter(d => d.id !== id));
  };

  const addActionItem = () => {
    const actionItem: ActionItem = {
      id: uuidv4(),
      description: '',
      responsible: '',
      dueDate: new Date(),
      status: 'pending',
    };
    setActionItems([...actionItems, actionItem]);
  };

  const updateActionItem = (id: string, field: keyof ActionItem, value: any) => {
    setActionItems(actionItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeActionItem = (id: string) => {
    setActionItems(actionItems.filter(item => item.id !== id));
  };

  const onSubmit = (data: any) => {
    const meetingData: MeetingMinutes = {
      id: meeting?.id || uuidv4(),
      title: data.title,
      date: new Date(data.date),
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      participants,
      agenda,
      discussions,
      decisions,
      actionItems,
      generalNotes: data.generalNotes,
      createdAt: meeting?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(meetingData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Reunião</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Ex: Reunião de Planejamento Mensal"
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="startTime">Horário de Início</Label>
              <Input
                id="startTime"
                type="time"
                {...register('startTime')}
              />
              {errors.startTime && (
                <p className="text-sm text-destructive mt-1">{errors.startTime.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endTime">Horário de Término</Label>
              <Input
                id="endTime"
                type="time"
                {...register('endTime')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Local</Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="Ex: Sala de Reuniões A, Video conferência, etc."
            />
          </div>
        </CardContent>
      </Card>

      {/* Participantes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Participantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input
              placeholder="Nome"
              value={newParticipant.name}
              onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
            />
            <Input
              placeholder="Email (opcional)"
              value={newParticipant.email}
              onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
            />
            <Input
              placeholder="Cargo/Função (opcional)"
              value={newParticipant.role}
              onChange={(e) => setNewParticipant({ ...newParticipant, role: e.target.value })}
            />
            <Button type="button" onClick={addParticipant}>
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {participants.map((participant) => (
              <Badge key={participant.id} variant="secondary" className="flex items-center gap-1">
                {participant.name}
                {participant.role && <span className="text-xs">({participant.role})</span>}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeParticipant(participant.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pauta */}
      <Card>
        <CardHeader>
          <CardTitle>Pauta da Reunião</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Item da pauta"
              value={newAgendaItem}
              onChange={(e) => setNewAgendaItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAgendaItem()}
            />
            <Button type="button" onClick={addAgendaItem}>
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          <ul className="space-y-2">
            {agenda.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                <span>{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAgendaItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Discussões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Discussões
            <Button type="button" onClick={addDiscussion} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Discussão
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="border p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <Input
                  placeholder="Tópico da discussão"
                  value={discussion.topic}
                  onChange={(e) => updateDiscussion(discussion.id, 'topic', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDiscussion(discussion.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Descrição da discussão"
                value={discussion.description}
                onChange={(e) => updateDiscussion(discussion.id, 'description', e.target.value)}
              />
              <Textarea
                placeholder="Observações adicionais (opcional)"
                value={discussion.notes}
                onChange={(e) => updateDiscussion(discussion.id, 'notes', e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Decisões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Decisões Tomadas
            <Button type="button" onClick={addDecision} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Decisão
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {decisions.map((decision) => (
            <div key={decision.id} className="border p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <Input
                  placeholder="Tópico da decisão"
                  value={decision.topic}
                  onChange={(e) => updateDecision(decision.id, 'topic', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDecision(decision.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Decisão tomada"
                value={decision.decision}
                onChange={(e) => updateDecision(decision.id, 'decision', e.target.value)}
              />
              <Textarea
                placeholder="Justificativa/Rationale (opcional)"
                value={decision.rationale}
                onChange={(e) => updateDecision(decision.id, 'rationale', e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ações/Tarefas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Ações e Tarefas
            <Button type="button" onClick={addActionItem} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Ação
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <Textarea
                  placeholder="Descrição da ação/tarefa"
                  value={item.description}
                  onChange={(e) => updateActionItem(item.id, 'description', e.target.value)}
                  className="flex-1 mr-2"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeActionItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Responsável"
                  value={item.responsible}
                  onChange={(e) => updateActionItem(item.id, 'responsible', e.target.value)}
                />
                <Input
                  type="date"
                  value={format(item.dueDate, 'yyyy-MM-dd')}
                  onChange={(e) => updateActionItem(item.id, 'dueDate', new Date(e.target.value))}
                />
                <Select
                  value={item.status}
                  onValueChange={(value: 'pending' | 'in-progress' | 'completed') =>
                    updateActionItem(item.id, 'status', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="in-progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Observações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Observações Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            {...register('generalNotes')}
            placeholder="Observações, comentários ou informações adicionais sobre a reunião..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Ações do Formulário */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {meeting ? 'Atualizar Ata' : 'Salvar Ata'}
        </Button>
      </div>
    </form>
  );
};