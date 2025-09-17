/**
 * Meeting Minutes App
 * React Native app for creating and managing meeting minutes
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    ...(isDarkMode ? MD3DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? MD3DarkTheme.colors : DefaultTheme.colors),
      primary: '#6200ea',
      secondary: '#03dac6',
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.surface}
        />
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
