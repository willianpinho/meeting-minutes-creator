import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Appbar,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMeetings } from '../hooks/useMeetings';
import { MeetingMinutes, MeetingFormData } from '../types/meeting';
import { meetingFormSchema } from '../utils/validationSchemas';
import { formatDate, formatTime } from '../utils/dateUtils';

type RootStackParamList = {
  Home: undefined;
  EditMeeting: { meetingId: string };
};

type EditMeetingRouteProp = RouteProp<RootStackParamList, 'EditMeeting'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EditMeetingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditMeetingRouteProp>();
  const { meetingId } = route.params;
  const { getMeeting, saveMeeting } = useMeetings();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const meeting = getMeeting(meetingId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema) as any,
  });

  useEffect(() => {
    if (meeting) {
      // Populate form with existing meeting data
      reset({
        title: meeting.title,
        date: formatDate(meeting.date).split('/').reverse().join('-'), // Convert DD/MM/YYYY to YYYY-MM-DD
        startTime: meeting.startTime,
        endTime: meeting.endTime || '',
        location: meeting.location || '',
        participants: meeting.participants,
        agenda: meeting.agenda,
        discussions: meeting.discussions,
        decisions: meeting.decisions,
        actionItems: meeting.actionItems,
        generalNotes: meeting.generalNotes || '',
      });
      setLoading(false);
    } else {
      Alert.alert('Erro', 'Ata não encontrada', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  }, [meeting, reset, navigation]);

  const onSubmit = async (data: MeetingFormData) => {
    if (!meeting) return;

    try {
      setSaving(true);

      const updatedMeeting: MeetingMinutes = {
        ...meeting,
        title: data.title,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        participants: data.participants,
        agenda: data.agenda,
        discussions: data.discussions,
        decisions: data.decisions,
        actionItems: data.actionItems,
        generalNotes: data.generalNotes,
        updatedAt: new Date(),
      };

      await saveMeeting(updatedMeeting);
      Alert.alert(
        'Sucesso',
        'Ata de reunião atualizada com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a ata de reunião');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar',
      'Tem certeza que deseja cancelar? Todas as alterações serão perdidas.',
      [
        { text: 'Continuar Editando', style: 'cancel' },
        { text: 'Cancelar', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Carregando..." />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Carregando ata...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleCancel} />
        <Appbar.Content title="Editar Ata de Reunião" />
        <Appbar.Action
          icon="check"
          onPress={handleSubmit(onSubmit)}
          disabled={saving}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                label="Título da Reunião *"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.title}
                mode="outlined"
              />
            )}
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}

          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                label="Data *"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.date}
                mode="outlined"
                placeholder="YYYY-MM-DD"
              />
            )}
          />
          {errors.date && (
            <Text style={styles.errorText}>{errors.date.message}</Text>
          )}

          <View style={styles.row}>
            <Controller
              name="startTime"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.halfWidth]}
                  label="Início *"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.startTime}
                  mode="outlined"
                  placeholder="HH:mm"
                />
              )}
            />

            <Controller
              name="endTime"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.halfWidth]}
                  label="Fim"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  mode="outlined"
                  placeholder="HH:mm"
                />
              )}
            />
          </View>

          <Controller
            name="location"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                label="Local"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                mode="outlined"
              />
            )}
          />

          <Controller
            name="generalNotes"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                label="Observações Gerais"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                mode="outlined"
                multiline
                numberOfLines={4}
              />
            )}
          />
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.button}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            loading={saving}
            disabled={saving}
          >
            Salvar Alterações
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
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
});

export default EditMeetingScreen;