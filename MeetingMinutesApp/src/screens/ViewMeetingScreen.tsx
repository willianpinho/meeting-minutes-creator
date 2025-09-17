import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Text,
  Chip,
  Divider,
} from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMeetings } from '../hooks/useMeetings';
import { formatDate, formatTime } from '../utils/dateUtils';

type RootStackParamList = {
  Home: undefined;
  ViewMeeting: { meetingId: string };
  EditMeeting: { meetingId: string };
};

type ViewMeetingRouteProp = RouteProp<RootStackParamList, 'ViewMeeting'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ViewMeetingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ViewMeetingRouteProp>();
  const { meetingId } = route.params;
  const { getMeeting, deleteMeeting } = useMeetings();

  const meeting = getMeeting(meetingId);

  const handleEdit = () => {
    navigation.navigate('EditMeeting', { meetingId });
  };

  const handleDelete = () => {
    if (!meeting) return;

    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a ata "${meeting.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMeeting(meetingId);
              navigation.goBack();
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível excluir a ata');
            }
          },
        },
      ]
    );
  };

  if (!meeting) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Ata não encontrada" />
        </Appbar.Header>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ata de reunião não encontrada</Text>
        </View>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      default:
        return '#f44336';
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
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Visualizar Ata" />
        <Appbar.Action icon="pencil" onPress={handleEdit} />
        <Appbar.Action icon="delete" onPress={handleDelete} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Informações Básicas */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.meetingTitle}>{meeting.title}</Title>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📅 Data:</Text>
              <Text style={styles.infoValue}>{formatDate(meeting.date)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🕐 Horário:</Text>
              <Text style={styles.infoValue}>
                {formatTime(meeting.startTime)}
                {meeting.endTime && ` - ${formatTime(meeting.endTime)}`}
              </Text>
            </View>
            {meeting.location && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📍 Local:</Text>
                <Text style={styles.infoValue}>{meeting.location}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Participantes */}
        {meeting.participants.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>👥 Participantes</Title>
              {meeting.participants.map((participant) => (
                <View key={participant.id} style={styles.participantItem}>
                  <Text style={styles.participantName}>{participant.name}</Text>
                  {participant.role && (
                    <Text style={styles.participantRole}>{participant.role}</Text>
                  )}
                  {participant.email && (
                    <Text style={styles.participantEmail}>{participant.email}</Text>
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Agenda */}
        {meeting.agenda.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>📋 Agenda</Title>
              {meeting.agenda.map((item, index) => (
                <View key={index} style={styles.agendaItem}>
                  <Text style={styles.agendaNumber}>{index + 1}.</Text>
                  <Text style={styles.agendaText}>{item}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Discussões */}
        {meeting.discussions.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>💬 Discussões</Title>
              {meeting.discussions.map((discussion) => (
                <View key={discussion.id} style={styles.discussionItem}>
                  <Text style={styles.discussionTopic}>{discussion.topic}</Text>
                  <Text style={styles.discussionDescription}>{discussion.description}</Text>
                  {discussion.notes && (
                    <Text style={styles.discussionNotes}>Observações: {discussion.notes}</Text>
                  )}
                  <Divider style={styles.itemDivider} />
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Decisões */}
        {meeting.decisions.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>✅ Decisões</Title>
              {meeting.decisions.map((decision) => (
                <View key={decision.id} style={styles.decisionItem}>
                  <Text style={styles.decisionTopic}>{decision.topic}</Text>
                  <Text style={styles.decisionText}>{decision.decision}</Text>
                  {decision.rationale && (
                    <Text style={styles.decisionRationale}>Justificativa: {decision.rationale}</Text>
                  )}
                  <Divider style={styles.itemDivider} />
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Ações */}
        {meeting.actionItems.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>🎯 Ações</Title>
              {meeting.actionItems.map((action) => (
                <View key={action.id} style={styles.actionItem}>
                  <View style={styles.actionHeader}>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                    <Chip
                      style={[styles.statusChip, { backgroundColor: getStatusColor(action.status) }]}
                      textStyle={styles.statusChipText}
                    >
                      {getStatusText(action.status)}
                    </Chip>
                  </View>
                  <Text style={styles.actionResponsible}>👤 {action.responsible}</Text>
                  <Text style={styles.actionDueDate}>📅 {formatDate(action.dueDate)}</Text>
                  <Divider style={styles.itemDivider} />
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* Observações Gerais */}
        {meeting.generalNotes && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>📝 Observações Gerais</Title>
              <Text style={styles.generalNotes}>{meeting.generalNotes}</Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  meetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 80,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  participantItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  participantRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  participantEmail: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  agendaItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  agendaNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#666',
  },
  agendaText: {
    fontSize: 14,
    flex: 1,
    color: '#333',
  },
  discussionItem: {
    marginBottom: 16,
  },
  discussionTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  discussionDescription: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  discussionNotes: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  decisionItem: {
    marginBottom: 16,
  },
  decisionTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  decisionText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  decisionRationale: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  actionItem: {
    marginBottom: 16,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
    color: '#333',
  },
  actionResponsible: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  actionDueDate: {
    fontSize: 12,
    color: '#666',
  },
  statusChip: {
    height: 24,
  },
  statusChipText: {
    fontSize: 10,
    color: 'white',
  },
  generalNotes: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  itemDivider: {
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ViewMeetingScreen;