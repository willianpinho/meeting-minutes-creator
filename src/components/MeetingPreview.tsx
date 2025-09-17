import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

import type { MeetingMinutes } from '../types/meeting';

interface MeetingPreviewProps {
  meeting: MeetingMinutes;
}

export const MeetingPreview: React.FC<MeetingPreviewProps> = ({ meeting }) => {
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');
  const formatTime = (time: string) => time || 'Não informado';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'in-progress':
        return 'Em Andamento';
      default:
        return 'Pendente';
    }
  };

  return (
    <div id="meeting-preview" className="max-w-4xl mx-auto p-6 bg-white">
      {/* Cabeçalho */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ATA DE REUNIÃO</h1>
        <h2 className="text-xl text-gray-600">{meeting.title}</h2>
      </div>

      {/* Informações Gerais */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Informações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span><strong>Data:</strong> {formatDate(meeting.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span><strong>Horário de Início:</strong> {formatTime(meeting.startTime)}</span>
            </div>
            {meeting.endTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><strong>Horário de Término:</strong> {formatTime(meeting.endTime)}</span>
              </div>
            )}
            {meeting.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span><strong>Local:</strong> {meeting.location}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Participantes */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {meeting.participants.map((participant) => (
              <li key={participant.id} className="flex items-center">
                <span className="font-medium">{participant.name}</span>
                {participant.role && <span className="ml-2 text-muted-foreground">- {participant.role}</span>}
                {participant.email && <span className="ml-2 text-sm text-muted-foreground">({participant.email})</span>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Pauta */}
      {meeting.agenda.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pauta</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-decimal list-inside space-y-1">
              {meeting.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Discussões */}
      {meeting.discussions.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Discussões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meeting.discussions.map((discussion) => (
                <div key={discussion.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                  <h4 className="font-semibold mb-2">{discussion.topic}</h4>
                  <p className="mb-2">{discussion.description}</p>
                  {discussion.notes && (
                    <p className="text-sm text-muted-foreground italic">
                      <strong>Observações:</strong> {discussion.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Decisões */}
      {meeting.decisions.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Decisões Tomadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meeting.decisions.map((decision) => (
                <div key={decision.id} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  <h4 className="font-semibold mb-2">{decision.topic}</h4>
                  <p className="mb-2"><strong>Decisão:</strong> {decision.decision}</p>
                  {decision.rationale && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Justificativa:</strong> {decision.rationale}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ações e Tarefas */}
      {meeting.actionItems.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ações e Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="text-left p-3 font-semibold">Descrição</th>
                    <th className="text-left p-3 font-semibold">Responsável</th>
                    <th className="text-left p-3 font-semibold">Prazo</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {meeting.actionItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.description}</td>
                      <td className="p-3">{item.responsible}</td>
                      <td className="p-3">{formatDate(item.dueDate)}</td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={getStatusColor(item.status)}
                        >
                          {getStatusText(item.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Observações Gerais */}
      {meeting.generalNotes && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Observações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <p className="whitespace-pre-wrap">{meeting.generalNotes}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rodapé */}
      <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <p>Ata gerada em {formatDate(new Date())} às {format(new Date(), 'HH:mm')}</p>
        <p>Sistema de Criação de Atas de Reunião</p>
      </div>
    </div>
  );
};