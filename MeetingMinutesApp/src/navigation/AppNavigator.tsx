import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreateMeetingScreen from '../screens/CreateMeetingScreen';
import EditMeetingScreen from '../screens/EditMeetingScreen';
import ViewMeetingScreen from '../screens/ViewMeetingScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateMeeting: undefined;
  EditMeeting: { meetingId: string };
  ViewMeeting: { meetingId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // We're using Appbar from react-native-paper
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateMeeting" component={CreateMeetingScreen} />
        <Stack.Screen
          name="EditMeeting"
          component={EditMeetingScreen}
        />
        <Stack.Screen name="ViewMeeting" component={ViewMeetingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;