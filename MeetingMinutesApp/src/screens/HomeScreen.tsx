import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  FAB,
  IconButton,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMeetings } from '../hooks/useMeetings';
import { MeetingMinutes } from '../types/meeting';
import { formatDate, formatTime } from '../utils/dateUtils';

type RootStackParamList = {
  Home: undefined;
  CreateMeeting: undefined;
  EditMeeting: { meetingId: string };
  ViewMeeting: { meetingId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { meetings, loading, error, deleteMeeting, refreshMeetings } = useMeetings();

  useFocusEffect(
    React.useCallback(() => {
      refreshMeetings();
    }, [refreshMeetings])
  );

  const handleDeleteMeeting = (id: string, title: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a ata "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMeeting(id);
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível excluir a ata');
            }
          },
        },
      ]
    );
  };

  const renderMeetingItem = ({ item }: { item: MeetingMinutes }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('ViewMeeting', { meetingId: item.id })}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardInfo}>
            <Title style={styles.cardTitle}>{item.title}</Title>
            <Paragraph style={styles.cardDate}>
              {formatDate(item.date)} às {formatTime(item.startTime)}
            </Paragraph>
            {item.location && (
              <Paragraph style={styles.cardLocation}>📍 {item.location}</Paragraph>
            )}
            <Paragraph style={styles.cardParticipants}>
              👥 {item.participants.length} participante(s)
            </Paragraph>
          </View>
          <View style={styles.cardActions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => navigation.navigate('EditMeeting', { meetingId: item.id })}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => handleDeleteMeeting(item.id, item.title)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        Nenhuma ata de reunião encontrada
      </Text>
      <Text style={styles.emptyStateSubtext}>
        Toque no botão + para criar sua primeira ata
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Atas de Reunião" />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Carregando atas...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Atas de Reunião" />
        <Appbar.Action
          icon="refresh"
          onPress={refreshMeetings}
        />
      </Appbar.Header>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={meetings}
        renderItem={renderMeetingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshMeetings} />
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateMeeting')}
        label="Nova Ata"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  cardParticipants: {
    fontSize: 12,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    margin: 16,
    borderRadius: 4,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
});

export default HomeScreen;