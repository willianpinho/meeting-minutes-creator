import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import uuid from 'react-native-uuid';
import { useMeetings } from '../hooks/useMeetings';
import { MeetingMinutes, MeetingFormData } from '../types/meeting';
import { meetingFormSchema } from '../utils/validationSchemas';
import { getCurrentDate, getCurrentTime } from '../utils/dateUtils';

type RootStackParamList = {
  Home: undefined;
  CreateMeeting: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CreateMeetingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { saveMeeting } = useMeetings();
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema) as any,
    defaultValues: {
      title: '',
      date: getCurrentDate(),
      startTime: getCurrentTime(),
      endTime: undefined,
      location: undefined,
      participants: [],
      agenda: [],
      discussions: [],
      decisions: [],
      actionItems: [],
      generalNotes: undefined,
    },
  });

  const onSubmit = async (data: MeetingFormData) => {
    try {
      setSaving(true);

      const meeting: MeetingMinutes = {
        id: uuid.v4() as string,
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await saveMeeting(meeting);
      Alert.alert(
        'Sucesso',
        'Ata de reunião criada com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a ata de reunião');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar',
      'Tem certeza que deseja cancelar? Todas as informações serão perdidas.',
      [
        { text: 'Continuar Editando', style: 'cancel' },
        { text: 'Cancelar', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleCancel} />
        <Appbar.Content title="Nova Ata de Reunião" />
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
            Salvar Ata
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
});

export default CreateMeetingScreen;