import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, Users, FileText, Trash2, Edit, Download } from 'lucide-react';

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

import type { MeetingMinutes } from '../types/meeting';

interface MeetingListProps {
  meetings: MeetingMinutes[];
  onEdit: (meeting: MeetingMinutes) => void;
  onDelete: (id: string) => void;
  onExport: (meeting: MeetingMinutes) => void;
}

export const MeetingList: React.FC<MeetingListProps> = ({
  meetings,
  onEdit,
  onDelete,
  onExport,
}) => {
  if (meetings.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          Nenhuma ata encontrada
        </h3>
        <p className="text-muted-foreground">
          Comece criando sua primeira ata de reunião
        </p>
      </div>
    );
  }

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
    <div className="grid gap-6">
      {meetings
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{meeting.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(meeting.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {meeting.startTime}
                      {meeting.endTime && ` - ${meeting.endTime}`}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {meeting.participants.length} participante{meeting.participants.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onExport(meeting)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(meeting)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(meeting.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Participantes */}
                <div>
                  <h4 className="font-medium mb-2">Participantes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {meeting.participants.map((participant) => (
                      <Badge key={participant.id} variant="secondary">
                        {participant.name}
                        {participant.role && <span className="ml-1">({participant.role})</span>}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resumo de conteúdo */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold text-lg">{meeting.agenda.length}</div>
                    <div className="text-muted-foreground">Itens da Pauta</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold text-lg">{meeting.discussions.length}</div>
                    <div className="text-muted-foreground">Discussões</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold text-lg">{meeting.decisions.length}</div>
                    <div className="text-muted-foreground">Decisões</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold text-lg">{meeting.actionItems.length}</div>
                    <div className="text-muted-foreground">Ações</div>
                  </div>
                </div>

                {/* Ações pendentes */}
                {meeting.actionItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Status das Ações:</h4>
                    <div className="flex flex-wrap gap-2">
                      {meeting.actionItems.map((action) => (
                        <Badge
                          key={action.id}
                          variant="outline"
                          className={getStatusColor(action.status)}
                        >
                          {getStatusText(action.status)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local da reunião */}
                {meeting.location && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Local:</strong> {meeting.location}
                  </div>
                )}

                {/* Data de atualização */}
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Última atualização: {format(new Date(meeting.updatedAt), "dd/MM/yyyy 'às' HH:mm")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};